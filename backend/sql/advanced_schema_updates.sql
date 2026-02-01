-- ThermalHolidays Advanced Schema Updates

-- 0. Base Destinations Table (Missing from initial)
CREATE TABLE IF NOT EXISTS destinations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    country TEXT,
    description TEXT,
    image_url TEXT,
    slug TEXT NOT NULL UNIQUE,
    parent_id UUID REFERENCES destinations(id),
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 1. many-to-many Hotel-Destination
CREATE TABLE IF NOT EXISTS hotel_destinations (
    hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
    destination_id UUID REFERENCES destinations(id) ON DELETE CASCADE,
    PRIMARY KEY (hotel_id, destination_id)
);

-- 3. Enhance Hotels with static metadata
ALTER TABLE IF EXISTS hotels ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE IF EXISTS hotels ADD COLUMN IF NOT EXISTS thermal_temp TEXT;
ALTER TABLE IF EXISTS hotels ADD COLUMN IF NOT EXISTS history TEXT;
ALTER TABLE IF EXISTS hotels ADD COLUMN IF NOT EXISTS flow_rate TEXT;
ALTER TABLE IF EXISTS hotels ADD COLUMN IF NOT EXISTS star_rating INT DEFAULT 5;

-- 4. Enhance Hotel Content with rich thermal details
ALTER TABLE IF EXISTS hotel_content ADD COLUMN IF NOT EXISTS tagline TEXT;
ALTER TABLE IF EXISTS hotel_content ADD COLUMN IF NOT EXISTS thermal_description TEXT;
ALTER TABLE IF EXISTS hotel_content ADD COLUMN IF NOT EXISTS outdoor_pools TEXT;
ALTER TABLE IF EXISTS hotel_content ADD COLUMN IF NOT EXISTS indoor_pools TEXT;
ALTER TABLE IF EXISTS hotel_content ADD COLUMN IF NOT EXISTS spa_description TEXT;
ALTER TABLE IF EXISTS hotel_content ADD COLUMN IF NOT EXISTS spa_services JSONB;
ALTER TABLE IF EXISTS hotel_content ADD COLUMN IF NOT EXISTS medical_wellness TEXT;
ALTER TABLE IF EXISTS hotel_content ADD COLUMN IF NOT EXISTS thermal_properties JSONB; -- For minerals, health benefits, etc.

-- 5. Hotel Rooms (Actual rooms per hotel, linked to canonical categories)
CREATE TABLE IF NOT EXISTS hotel_rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
    canonical_category_id UUID REFERENCES canonical_room_categories(id),
    name TEXT NOT NULL,
    description TEXT,
    max_occupancy INT DEFAULT 2,
    base_price_default NUMERIC(15, 2),
    features JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Update inventory and pricing to link to hotel_rooms instead of canonical categories if needed
-- For now we'll keep it flexible, but hotel_rooms is better for management.
ALTER TABLE IF EXISTS room_inventory ADD COLUMN IF NOT EXISTS hotel_room_id UUID REFERENCES hotel_rooms(id) ON DELETE CASCADE;
ALTER TABLE IF EXISTS room_pricing ADD COLUMN IF NOT EXISTS hotel_room_id UUID REFERENCES hotel_rooms(id) ON DELETE CASCADE;

-- 6. Image Types
ALTER TABLE IF EXISTS hotel_images ADD COLUMN IF NOT EXISTS image_type VARCHAR(20) DEFAULT 'GALLERY'; -- HERO, POOL, SPA, ROOM, GALLERY
