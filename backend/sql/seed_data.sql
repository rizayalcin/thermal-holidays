-- Seed Data for ThermalHolidays

-- 1. Insert Hotels
INSERT INTO hotels (id, name, slug, is_thermal_verified) VALUES
('b3c7b5a0-d1e4-4c87-ae07-35f9d5f2643f', 'Blue Lagoon Retreat', 'blue-lagoon-retreat', true),
('a2b8c9d0-e1f2-4a3b-8c7d-9e0f1a2b3c4d', 'Therme Vals', 'therme-vals', true),
('c1d2e3f4-5678-4321-8765-432109876543', 'Gellert Thermal Bath', 'gellert-thermal-bath', true);

-- 2. Insert Hotel Content
INSERT INTO hotel_content (hotel_id, language_code, description, experience_text, who_is_it_for) VALUES
('b3c7b5a0-d1e4-4c87-ae07-35f9d5f2643f', 'en', 'A luxury sanctuary at the heart of Iceland''s volcanic landscape.', 'Bathe in mineral-rich geothermal waters surrounded by moss-covered lava fields.', 'Luxury seekers and wellness enthusiasts looking for otherworldly landscapes.'),
('a2b8c9d0-e1f2-4a3b-8c7d-9e0f1a2b3c4d', 'en', 'Peter Zumthor''s architectural masterpiece in the Swiss Alps.', 'A sensory journey through light, shadow, and quartzite stone.', 'Architecture aficionados and those seeking meditative silence.'),
('c1d2e3f4-5678-4321-8765-432109876543', 'en', 'The most famous Art Nouveau thermal bath in Budapest.', 'Soak in the history of the "City of Spas" under spectacular glass domes.', 'History buffs and travelers seeking traditional European bath culture.');

-- 3. Insert Hotel Images
INSERT INTO hotel_images (hotel_id, url, alt_text, sort_order, is_hero) VALUES
('b3c7b5a0-d1e4-4c87-ae07-35f9d5f2643f', 'https://images.unsplash.com/photo-1544005313-94ddf028fbdb', 'Blue Lagoon exterior', 1, true),
('a2b8c9d0-e1f2-4a3b-8c7d-9e0f1a2b3c4d', 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7', 'Therme Vals stone pools', 1, true),
('c1d2e3f4-5678-4321-8765-432109876543', 'https://images.unsplash.com/photo-1540555700478-4be289aef09a', 'Gellert bath interior', 1, true);

-- 4. Supplier Mappings (Mock)
INSERT INTO supplier_property_map (hotel_id, supplier_code, supplier_property_id, confidence_score) VALUES
('b3c7b5a0-d1e4-4c87-ae07-35f9d5f2643f', 'MOCK_SUPPLIER', 'BL_001', 100),
('a2b8c9d0-e1f2-4a3b-8c7d-9e0f1a2b3c4d', 'MOCK_SUPPLIER', 'TV_001', 100),
('c1d2e3f4-5678-4321-8765-432109876543', 'MOCK_SUPPLIER', 'GB_001', 100);
