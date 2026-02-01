-- ThermalHolidays Seed Data from Mock
-- Clearing existing data for a clean demo
TRUNCATE hotel_destinations, hotel_content, hotel_images, hotels, destinations CASCADE;

-- 1. Destinations (Hierarchical Demo)
-- Root: Europe
INSERT INTO destinations (id, name, country, description, slug, sort_order) 
VALUES ('77777777-7777-7777-7777-777777777777', 'Europe', 'Continental', 'The cradle of thermal wellness heritage.', 'europe', 1);

-- Countries (Child of Europe)
INSERT INTO destinations (id, name, country, description, slug, parent_id, sort_order) VALUES 
('11111111-1111-1111-1111-111111111111', 'Italy', 'Tuscany & Beyond', 'Ancient Roman bathing traditions meet modern wellness.', 'italy', '77777777-7777-7777-7777-777777777777', 1),
('22222222-2222-2222-2222-222222222222', 'Hungary', 'Budapest & Lake Hévíz', 'Europe''s thermal capital.', 'hungary', '77777777-7777-7777-7777-777777777777', 2),
('33333333-3333-3333-3333-333333333333', 'Iceland', 'The Golden Circle', 'Volcanic geothermal wonders.', 'iceland', '77777777-7777-7777-7777-777777777777', 3);

-- Roots outside Europe
INSERT INTO destinations (id, name, country, description, slug, sort_order) VALUES 
('44444444-4444-4444-4444-444444444444', 'Japan', 'Hakone & Beppu', 'The art of onsen bathing.', 'japan', 2);

-- 2. Hotels (Terme di Saturnia)
INSERT INTO hotels (id, name, slug, is_thermal_verified, location, thermal_temp, history, flow_rate, star_rating) VALUES 
('11111111-0000-0000-0000-111111111111', 'Terme di Saturnia', 'terme-di-saturnia', true, 'Tuscany, Italy', '37.5°C', '3000+', '800L', 5);

INSERT INTO hotel_destinations (hotel_id, destination_id) VALUES 
('11111111-0000-0000-0000-111111111111', '11111111-1111-1111-1111-111111111111'); -- Italy

INSERT INTO hotel_content (hotel_id, language_code, description, tagline, experience_text, spa_highlights, policies, inclusions) VALUES 
('11111111-0000-0000-0000-111111111111', 'en', 
'Where ancient waters meet timeless tranquility', 
'Thermal Wellness Resort',
'Nestled in the heart of the Tuscan countryside...',
'["Thermal mud wraps", "Hydromassage"]',
'[{"title": "Children", "content": "Welcome families..."}]',
'["Unlimited access to thermal pools", "Daily wellness classes"]'
);

-- 3. Hotels (Széchenyi Thermal Bath)
INSERT INTO hotels (id, name, slug, is_thermal_verified, location, thermal_temp, history, flow_rate, star_rating) VALUES 
('22222222-0000-0000-0000-222222222222', 'Széchenyi Thermal Bath', 'szechenyi-baths', true, 'Budapest, Hungary', '38°C', '100+', '6000L', 4);

INSERT INTO hotel_destinations (hotel_id, destination_id) VALUES 
('22222222-0000-0000-0000-222222222222', '22222222-2222-2222-2222-222222222222'); -- Hungary

INSERT INTO hotel_content (hotel_id, language_code, description, tagline, thermal_properties) VALUES 
('22222222-0000-0000-0000-222222222222', 'en',
'Europe''s largest medicinal bath complex',
'Grand Thermal Palace',
'{"waterType": "Calcium-Magnesium-Bicarbonate", "phLevel": "7.0", "minerals": [{"mineral": "Calcium", "amount": "180 mg/L"}]}'
);

-- 4. Rooms for Széchenyi
INSERT INTO hotel_rooms (id, hotel_id, name, description, max_occupancy, base_price_default) VALUES 
('22222222-1111-0000-0000-111111111111', '22222222-0000-0000-0000-222222222222', 'Thermal Suite', 'Direct access to private thermal facilities.', 2, 350.00),
('22222222-1111-0000-0000-222222222222', '22222222-0000-0000-0000-222222222222', 'Royal Apartment', 'Historic grandeur with modern luxury.', 4, 750.00);
