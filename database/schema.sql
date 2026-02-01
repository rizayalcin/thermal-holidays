-- ThermalHolidays Database Schema (PostgreSQL)

-- 1. Canonical Data (Our Source of Truth)
CREATE TABLE hotels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    is_thermal_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE hotel_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
    language_code VARCHAR(10) DEFAULT 'en',
    description TEXT,
    spa_highlights JSONB, -- mineral water, pool types, etc.
    experience_text TEXT, -- editorial 6-8 lines
    who_is_it_for TEXT,
    policies JSONB, -- child, pet, health
    inclusions JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE hotel_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    alt_text TEXT,
    sort_order INT DEFAULT 0,
    is_hero BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE canonical_room_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    features JSONB,
    sort_order INT DEFAULT 0
);

-- 2. Supplier Mapping Layer
CREATE TABLE supplier_property_map (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hotel_id UUID REFERENCES hotels(id),
    supplier_code VARCHAR(50) NOT NULL, -- e.g., 'paximum', 'bookingagora'
    supplier_property_id VARCHAR(100) NOT NULL,
    confidence_score INT DEFAULT 100,
    last_verified_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE,
    UNIQUE(hotel_id, supplier_code, supplier_property_id)
);

CREATE TABLE room_category_map (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hotel_id UUID REFERENCES hotels(id),
    supplier_code VARCHAR(50) NOT NULL,
    supplier_room_id VARCHAR(100) NOT NULL,
    canonical_room_category_id UUID REFERENCES canonical_room_categories(id),
    confidence_score INT DEFAULT 100,
    UNIQUE(hotel_id, supplier_code, supplier_room_id)
);

-- 3. Caching & Traceability
CREATE TABLE supplier_payloads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    supplier_code VARCHAR(50) NOT NULL,
    supplier_property_id VARCHAR(100) NOT NULL,
    payload_type VARCHAR(50) NOT NULL, -- 'availability', 'rates', 'booking', 'cancel'
    payload_json JSONB NOT NULL,
    checksum VARCHAR(64),
    received_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rate_cache (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hotel_id UUID REFERENCES hotels(id),
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    occupancy_hash VARCHAR(64) NOT NULL,
    currency VARCHAR(3) NOT NULL,
    best_rates_json JSONB NOT NULL,
    supplier_code VARCHAR(50) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- 4. Bookings
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_reference VARCHAR(50) UNIQUE NOT NULL,
    hotel_id UUID REFERENCES hotels(id),
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    guest_details JSONB NOT NULL,
    total_price DECIMAL(18, 2) NOT NULL,
    currency VARCHAR(3) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE booking_supplier_refs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES bookings(id),
    supplier_code VARCHAR(50) NOT NULL,
    supplier_booking_reference VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Substream AI Agents & Audit
CREATE TABLE agent_payloads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_name VARCHAR(100) NOT NULL,
    hotel_id UUID REFERENCES hotels(id),
    source_urls JSONB,
    raw_payload_json JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE enrichment_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hotel_id UUID REFERENCES hotels(id),
    field_name VARCHAR(100) NOT NULL,
    old_value TEXT,
    new_value TEXT,
    source VARCHAR(50) NOT NULL, -- 'agent', 'manual'
    approved_by UUID, -- REFERENCES admins(id)
    approved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
