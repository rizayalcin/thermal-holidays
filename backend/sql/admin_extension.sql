-- ThermalHolidays Admin Panel Extension Schema

-- 1. Identity & RBAC
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    full_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE IF NOT EXISTS user_roles (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

-- Seed Initial Roles
INSERT INTO roles (name, description) VALUES 
('Admin', 'Full system access'),
('Manager', 'Management and reporting access'),
('Editor', 'Content and inventory editing access')
ON CONFLICT (name) DO NOTHING;

-- 2. Languages & CMS
CREATE TABLE IF NOT EXISTS languages (
    code VARCHAR(10) PRIMARY KEY,
    name TEXT NOT NULL,
    is_default BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true
);

INSERT INTO languages (code, name, is_default) VALUES 
('en', 'English', true),
('tr', 'Türkçe', false)
ON CONFLICT (code) DO NOTHING;

CREATE TABLE IF NOT EXISTS ui_translations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    language_code VARCHAR(10) REFERENCES languages(code) ON DELETE CASCADE,
    key_name TEXT NOT NULL,
    translation_text TEXT NOT NULL,
    UNIQUE(language_code, key_name)
);

CREATE TABLE IF NOT EXISTS featured_hotels (
    hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
    sort_order INT DEFAULT 0,
    PRIMARY KEY (hotel_id)
);

-- 3. Commerce & Inventory
CREATE TABLE IF NOT EXISTS hotel_markup (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
    markup_percentage NUMERIC(5, 2) DEFAULT 0,
    commission_percentage NUMERIC(5, 2) DEFAULT 0,
    UNIQUE(hotel_id)
);

CREATE TABLE IF NOT EXISTS room_inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
    room_category_id UUID REFERENCES canonical_room_categories(id) ON DELETE CASCADE,
    inventory_date DATE NOT NULL,
    available_count INT DEFAULT 0,
    UNIQUE(hotel_id, room_category_id, inventory_date)
);

CREATE TABLE IF NOT EXISTS room_pricing (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
    room_category_id UUID REFERENCES canonical_room_categories(id) ON DELETE CASCADE,
    pricing_date DATE NOT NULL,
    base_price NUMERIC(15, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    UNIQUE(hotel_id, room_category_id, pricing_date)
);

-- 4. Payment Management
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    amount NUMERIC(15, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    payment_method VARCHAR(50),
    transaction_id TEXT,
    status VARCHAR(20) DEFAULT 'success',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
