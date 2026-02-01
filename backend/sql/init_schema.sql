-- ThermalHolidays Database Schema (PostgreSQL)

-- 1. Base Tables
CREATE TABLE IF NOT EXISTS hotels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    is_thermal_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS hotel_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hotel_id UUID NOT NULL REFERENCES hotels(id) ON DELETE CASCADE,
    language_code VARCHAR(10) NOT NULL,
    description TEXT,
    spa_highlights JSONB,
    experience_text TEXT,
    who_is_it_for TEXT,
    policies JSONB,
    inclusions JSONB,
    UNIQUE(hotel_id, language_code)
);

CREATE TABLE IF NOT EXISTS hotel_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hotel_id UUID NOT NULL REFERENCES hotels(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    alt_text TEXT,
    sort_order INT DEFAULT 0,
    is_hero BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS canonical_room_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    features JSONB
);

-- 2. Mapping & Supplier Tables
CREATE TABLE IF NOT EXISTS supplier_property_map (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hotel_id UUID NOT NULL REFERENCES hotels(id) ON DELETE CASCADE,
    supplier_code VARCHAR(50) NOT NULL,
    supplier_property_id TEXT NOT NULL,
    confidence_score INT DEFAULT 0,
    last_verified_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    UNIQUE(supplier_code, supplier_property_id)
);

CREATE TABLE IF NOT EXISTS room_category_map (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hotel_id UUID NOT NULL REFERENCES hotels(id) ON DELETE CASCADE,
    canonical_room_category_id UUID REFERENCES canonical_room_categories(id),
    supplier_code VARCHAR(50) NOT NULL,
    supplier_room_id TEXT NOT NULL,
    UNIQUE(hotel_id, supplier_code, supplier_room_id)
);

-- 3. Transactional & Caching
CREATE TABLE IF NOT EXISTS rate_cache (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hotel_id UUID NOT NULL REFERENCES hotels(id) ON DELETE CASCADE,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    occupancy_hash VARCHAR(100) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    best_rates_json JSONB,
    supplier_code VARCHAR(50),
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE UNIQUE INDEX idx_rate_cache_lookup ON rate_cache(hotel_id, check_in, check_out, occupancy_hash);

CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_reference VARCHAR(50) NOT NULL UNIQUE,
    hotel_id UUID NOT NULL REFERENCES hotels(id),
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    guest_details JSONB NOT NULL,
    total_price NUMERIC(15, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS booking_supplier_refs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    supplier_code VARCHAR(50) NOT NULL,
    supplier_booking_reference TEXT NOT NULL
);

-- 4. Audit & AI Enrichment
CREATE TABLE IF NOT EXISTS supplier_payloads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_type VARCHAR(50),
    supplier_code VARCHAR(50),
    raw_payload JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS agent_payloads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hotel_id UUID REFERENCES hotels(id),
    agent_name VARCHAR(50),
    enrichment_data JSONB,
    is_applied BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS enrichment_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hotel_id UUID REFERENCES hotels(id),
    action_type VARCHAR(50),
    previous_value JSONB,
    new_value JSONB,
    applied_by VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
