using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Dapper;
using ThermalHolidays.Api.Domain.Models;

namespace ThermalHolidays.Api.Infrastructure.Repositories
{
    public interface IHotelRepository
    {
        Task<Hotel> GetHotelBySlugAsync(string slug);
        Task<IEnumerable<Hotel>> GetCuratedHotelsAsync();
    }

    public interface ISupplierMappingRepository
    {
        Task<IEnumerable<SupplierPropertyMap>> GetSupplierMappingsAsync(Guid hotelId);
        Task<Guid?> ResolveCanonicalRoomCategoryIdAsync(Guid hotelId, string supplierCode, string supplierRoomId);
    }

    public interface IRateCacheRepository
    {
        Task<RateCache> GetCachedRatesAsync(Guid hotelId, DateTime checkIn, DateTime checkOut, string occupancyHash);
        Task UpsertRateCacheAsync(RateCache rateCache);
    }

    public interface IBookingRepository
    {
        Task<Guid> CreateBookingTransactionAsync(Booking booking, string supplierCode, string supplierReference);
    }

    public interface IUserRepository
    {
        Task<User> GetUserByUsernameAsync(string username);
        Task<Guid> CreateUserAsync(User user);
    }

    public interface IAdminRepository
    {
        // Languages & CMS
        Task<IEnumerable<Language>> GetLanguagesAsync();
        Task SaveLanguageAsync(Language language);
        Task<IEnumerable<Hotel>> GetFeaturedHotelsAsync();
        Task SetFeaturedHotelsAsync(IEnumerable<Guid> hotelIds);

        // Destinations
        Task<IEnumerable<Destination>> GetDestinationsAsync();
        Task<Guid> SaveDestinationAsync(Destination destination);
        Task DeleteDestinationAsync(Guid id);
        Task UpdateDestinationOrderAsync(Guid id, int order, Guid? parentId);

        // Hotel Management
        Task<Hotel> GetHotelByIdAsync(Guid id);
        Task<Guid> SaveHotelAsync(Hotel hotel);
        Task SaveHotelContentAsync(HotelContent content);
        Task SyncHotelDestinationsAsync(Guid hotelId, IEnumerable<Guid> destinationIds);
        Task SaveHotelImageAsync(HotelImage image);
        Task DeleteHotelImageAsync(Guid imageId);

        // Room Management
        Task<IEnumerable<HotelRoom>> GetHotelRoomsAsync(Guid hotelId);
        Task<Guid> SaveHotelRoomAsync(HotelRoom room);
        Task DeleteHotelRoomAsync(Guid roomId);

        // Manual Inventory & Pricing
        Task UpsertInventoryAsync(RoomInventory inventory);
        Task UpsertPricingAsync(RoomPricing pricing);
        Task<HotelMarkup> GetHotelMarkupAsync(Guid hotelId);
        Task SaveHotelMarkupAsync(HotelMarkup markup);

        // Reporting
        Task<IEnumerable<PaymentReport>> GetPaymentReportAsync(DateTime start, DateTime end);
    }

    public class HotelRepository : IHotelRepository
    {
        private readonly IDbConnection _db;
        public HotelRepository(IDbConnection db) => _db = db;

        public async Task<Hotel> GetHotelBySlugAsync(string slug)
        {
            const string sql = @"
                SELECT h.*, c.* 
                FROM hotels h
                LEFT JOIN hotel_content c ON h.id = c.hotel_id
                WHERE h.slug = @slug";
            
            // Note: In production, use a more detailed mapping for nested objects
            var result = await _db.QueryAsync<Hotel, HotelContent, Hotel>(sql, (hotel, content) => {
                hotel.Content = content;
                return hotel;
            }, new { slug });
            
            return result.FirstOrDefault();
        }

        public async Task<IEnumerable<Hotel>> GetCuratedHotelsAsync()
        {
            const string sql = "SELECT * FROM hotels WHERE is_thermal_verified = true";
            return await _db.QueryAsync<Hotel>(sql);
        }
    }

    public class SupplierMappingRepository : ISupplierMappingRepository
    {
        private readonly IDbConnection _db;
        public SupplierMappingRepository(IDbConnection db) => _db = db;

        public async Task<IEnumerable<SupplierPropertyMap>> GetSupplierMappingsAsync(Guid hotelId)
        {
            const string sql = "SELECT * FROM supplier_property_map WHERE hotel_id = @hotelId AND is_active = true";
            return await _db.QueryAsync<SupplierPropertyMap>(sql, new { hotelId });
        }

        public async Task<Guid?> ResolveCanonicalRoomCategoryIdAsync(Guid hotelId, string supplierCode, string supplierRoomId)
        {
            const string sql = @"
                SELECT canonical_room_category_id 
                FROM room_category_map 
                WHERE hotel_id = @hotelId AND supplier_code = @supplierCode AND supplier_room_id = @supplierRoomId";
            return await _db.QueryFirstOrDefaultAsync<Guid?>(sql, new { hotelId, supplierCode, supplierRoomId });
        }
    }

    public class RateCacheRepository : IRateCacheRepository
    {
        private readonly IDbConnection _db;
        public RateCacheRepository(IDbConnection db) => _db = db;

        public async Task<RateCache> GetCachedRatesAsync(Guid hotelId, DateTime checkIn, DateTime checkOut, string occupancyHash)
        {
            const string sql = @"
                SELECT * FROM rate_cache 
                WHERE hotel_id = @hotelId AND check_in = @checkIn AND check_out = @checkOut 
                AND occupancy_hash = @occupancyHash AND expires_at > CURRENT_TIMESTAMP";
            return await _db.QueryFirstOrDefaultAsync<RateCache>(sql, new { hotelId, checkIn, checkOut, occupancyHash });
        }

        public async Task UpsertRateCacheAsync(RateCache rateCache)
        {
            const string sql = @"
                INSERT INTO rate_cache (hotel_id, check_in, check_out, occupancy_hash, currency, best_rates_json, supplier_code, expires_at)
                VALUES (@HotelId, @CheckIn, @CheckOut, @OccupancyHash, @Currency, @BestRatesJson, @SupplierCode, @ExpiresAt)
                ON CONFLICT (hotel_id, check_in, check_out, occupancy_hash) DO UPDATE 
                SET best_rates_json = EXCLUDED.best_rates_json, expires_at = EXCLUDED.expires_at";
            await _db.ExecuteAsync(sql, rateCache);
        }
    }

    public class BookingRepository : IBookingRepository
    {
        private readonly IDbConnection _db;
        public BookingRepository(IDbConnection db) => _db = db;

        public async Task<Guid> CreateBookingTransactionAsync(Booking booking, string supplierCode, string supplierReference)
        {
            using var transaction = _db.BeginTransaction();
            try
            {
                const string bookingSql = @"
                    INSERT INTO bookings (booking_reference, hotel_id, check_in, check_out, guest_details, total_price, currency, status)
                    VALUES (@BookingReference, @HotelId, @CheckIn, @CheckOut, @GuestDetails, @TotalPrice, @Currency, @Status)
                    RETURNING id";
                
                var bookingId = await _db.QuerySingleAsync<Guid>(bookingSql, booking, transaction);

                const string refSql = @"
                    INSERT INTO booking_supplier_refs (booking_id, supplier_code, supplier_booking_reference)
                    VALUES (@bookingId, @supplierCode, @supplierReference)";
                
                await _db.ExecuteAsync(refSql, new { bookingId, supplierCode, supplierReference }, transaction);

                transaction.Commit();
                return bookingId;
            }
            catch
            {
                transaction.Rollback();
                throw;
            }
        }
    }

    public class UserRepository : IUserRepository
    {
        private readonly IDbConnection _db;
        public UserRepository(IDbConnection db) => _db = db;

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            const string sql = "SELECT * FROM users WHERE username = @username";
            return await _db.QueryFirstOrDefaultAsync<User>(sql, new { username });
        }

        public async Task<Guid> CreateUserAsync(User user)
        {
            const string sql = @"
                INSERT INTO users (username, email, password_hash, full_name)
                VALUES (@Username, @Email, @PasswordHash, @FullName)
                RETURNING id";
            return await _db.QuerySingleAsync<Guid>(sql, user);
        }
    }

    public class AdminRepository : IAdminRepository
    {
        private readonly IDbConnection _db;
        public AdminRepository(IDbConnection db) => _db = db;

        public async Task<IEnumerable<Destination>> GetDestinationsAsync()
        {
            return await _db.QueryAsync<Destination>("SELECT * FROM destinations ORDER BY sort_order");
        }

        public async Task<Guid> SaveDestinationAsync(Destination destination)
        {
            const string sql = @"
                INSERT INTO destinations (id, name, country, description, image_url, slug, parent_id, sort_order)
                VALUES (COALESCE(@Id, gen_random_uuid()), @Name, @Country, @Description, @ImageUrl, @Slug, @ParentId, @SortOrder)
                ON CONFLICT (id) DO UPDATE SET 
                    name = EXCLUDED.name, 
                    country = EXCLUDED.country, 
                    description = EXCLUDED.description, 
                    image_url = EXCLUDED.image_url, 
                    slug = EXCLUDED.slug, 
                    parent_id = EXCLUDED.parent_id, 
                    sort_order = EXCLUDED.sort_order
                RETURNING id";
            return await _db.QuerySingleAsync<Guid>(sql, destination);
        }

        public async Task DeleteDestinationAsync(Guid id)
        {
            await _db.ExecuteAsync("DELETE FROM destinations WHERE id = @id", new { id });
        }

        public async Task UpdateDestinationOrderAsync(Guid id, int order, Guid? parentId)
        {
            await _db.ExecuteAsync("UPDATE destinations SET sort_order = @order, parent_id = @parentId WHERE id = @id", new { id, order, parentId });
        }

        public async Task<Hotel> GetHotelByIdAsync(Guid id)
        {
            const string hotelSql = "SELECT * FROM hotels WHERE id = @id";
            var hotel = await _db.QueryFirstOrDefaultAsync<Hotel>(hotelSql, new { id });
            if (hotel == null) return null;

            hotel.Content = await _db.QueryFirstOrDefaultAsync<HotelContent>("SELECT * FROM hotel_content WHERE hotel_id = @id", new { id });
            hotel.Images = (await _db.QueryAsync<HotelImage>("SELECT * FROM hotel_images WHERE hotel_id = @id ORDER BY sort_order", new { id })).ToList();
            hotel.Rooms = (await _db.QueryAsync<HotelRoom>("SELECT * FROM hotel_rooms WHERE hotel_id = @id", new { id })).ToList();
            hotel.DestinationIds = (await _db.QueryAsync<Guid>("SELECT destination_id FROM hotel_destinations WHERE hotel_id = @id", new { id })).ToList();

            return hotel;
        }

        public async Task<Guid> SaveHotelAsync(Hotel hotel)
        {
            const string sql = @"
                INSERT INTO hotels (id, name, slug, is_thermal_verified, location, thermal_temp, history, flow_rate, star_rating)
                VALUES (COALESCE(@Id, gen_random_uuid()), @Name, @Slug, @IsThermalVerified, @Location, @ThermalTemp, @History, @FlowRate, @StarRating)
                ON CONFLICT (id) DO UPDATE SET 
                    name = EXCLUDED.name, 
                    slug = EXCLUDED.slug, 
                    is_thermal_verified = EXCLUDED.is_thermal_verified,
                    location = EXCLUDED.location,
                    thermal_temp = EXCLUDED.thermal_temp,
                    history = EXCLUDED.history,
                    flow_rate = EXCLUDED.flow_rate,
                    star_rating = EXCLUDED.star_rating
                RETURNING id";
            return await _db.QuerySingleAsync<Guid>(sql, hotel);
        }

        public async Task SaveHotelContentAsync(HotelContent content)
        {
            const string sql = @"
                INSERT INTO hotel_content (hotel_id, language_code, tagline, description, experience_text, thermal_description, outdoor_pools, indoor_pools, spa_description, spa_services, medical_wellness, thermal_properties, policies, inclusions)
                VALUES (@HotelId, @LanguageCode, @Tagline, @Description, @ExperienceText, @ThermalDescription, @OutdoorPools, @IndoorPools, @SpaDescription, @SpaServices, @MedicalWellness, @ThermalProperties, @Policies, @Inclusions)
                ON CONFLICT (hotel_id, language_code) DO UPDATE SET 
                    tagline = EXCLUDED.tagline,
                    description = EXCLUDED.description,
                    experience_text = EXCLUDED.experience_text,
                    thermal_description = EXCLUDED.thermal_description,
                    outdoor_pools = EXCLUDED.outdoor_pools,
                    indoor_pools = EXCLUDED.indoor_pools,
                    spa_description = EXCLUDED.spa_description,
                    spa_services = EXCLUDED.spa_services,
                    medical_wellness = EXCLUDED.medical_wellness,
                    thermal_properties = EXCLUDED.thermal_properties,
                    policies = EXCLUDED.policies,
                    inclusions = EXCLUDED.inclusions";
            await _db.ExecuteAsync(sql, content);
        }

        public async Task SyncHotelDestinationsAsync(Guid hotelId, IEnumerable<Guid> destinationIds)
        {
            using var transaction = _db.BeginTransaction();
            try {
                await _db.ExecuteAsync("DELETE FROM hotel_destinations WHERE hotel_id = @hotelId", new { hotelId }, transaction);
                foreach(var destId in destinationIds) {
                    await _db.ExecuteAsync("INSERT INTO hotel_destinations (hotel_id, destination_id) VALUES (@hotelId, @destId)", new { hotelId, destId }, transaction);
                }
                transaction.Commit();
            } catch {
                transaction.Rollback();
                throw;
            }
        }

        public async Task SaveHotelImageAsync(HotelImage image)
        {
            const string sql = @"
                INSERT INTO hotel_images (id, hotel_id, url, alt_text, sort_order, is_hero, image_type)
                VALUES (COALESCE(@Id, gen_random_uuid()), @HotelId, @Url, @AltText, @SortOrder, @IsHero, @ImageType)
                ON CONFLICT (id) DO UPDATE SET 
                    url = EXCLUDED.url, 
                    alt_text = EXCLUDED.alt_text, 
                    sort_order = EXCLUDED.sort_order, 
                    is_hero = EXCLUDED.is_hero,
                    image_type = EXCLUDED.image_type";
            await _db.ExecuteAsync(sql, image);
        }

        public async Task DeleteHotelImageAsync(Guid imageId)
        {
            await _db.ExecuteAsync("DELETE FROM hotel_images WHERE id = @imageId", new { imageId });
        }

        public async Task<IEnumerable<HotelRoom>> GetHotelRoomsAsync(Guid hotelId)
        {
            return await _db.QueryAsync<HotelRoom>("SELECT * FROM hotel_rooms WHERE hotel_id = @hotelId", new { hotelId });
        }

        public async Task<Guid> SaveHotelRoomAsync(HotelRoom room)
        {
            const string sql = @"
                INSERT INTO hotel_rooms (id, hotel_id, canonical_category_id, name, description, max_occupancy, base_price_default, features)
                VALUES (COALESCE(@Id, gen_random_uuid()), @HotelId, @CanonicalCategoryId, @Name, @Description, @MaxOccupancy, @BasePriceDefault, @Features)
                ON CONFLICT (id) DO UPDATE SET 
                    name = EXCLUDED.name, 
                    description = EXCLUDED.description, 
                    max_occupancy = EXCLUDED.max_occupancy, 
                    base_price_default = EXCLUDED.base_price_default, 
                    features = EXCLUDED.features
                RETURNING id";
            return await _db.QuerySingleAsync<Guid>(sql, room);
        }

        public async Task DeleteHotelRoomAsync(Guid roomId)
        {
            await _db.ExecuteAsync("DELETE FROM hotel_rooms WHERE id = @roomId", new { roomId });
        }
        public async Task<IEnumerable<Language>> GetLanguagesAsync()
        {
            return await _db.QueryAsync<Language>("SELECT * FROM languages");
        }

        public async Task SaveLanguageAsync(Language language)
        {
            const string sql = @"
                INSERT INTO languages (code, name, is_default, is_active)
                VALUES (@Code, @Name, @IsDefault, @IsActive)
                ON CONFLICT (code) DO UPDATE SET name = EXCLUDED.name, is_active = EXCLUDED.is_active";
            await _db.ExecuteAsync(sql, language);
        }

        public async Task<IEnumerable<Hotel>> GetFeaturedHotelsAsync()
        {
            const string sql = @"
                SELECT h.* FROM hotels h
                JOIN featured_hotels f ON h.id = f.hotel_id
                ORDER BY f.sort_order";
            return await _db.QueryAsync<Hotel>(sql);
        }

        public async Task SetFeaturedHotelsAsync(IEnumerable<Guid> hotelIds)
        {
            using var transaction = _db.BeginTransaction();
            try {
                await _db.ExecuteAsync("DELETE FROM featured_hotels", null, transaction);
                int order = 0;
                foreach(var id in hotelIds) {
                    await _db.ExecuteAsync("INSERT INTO featured_hotels (hotel_id, sort_order) VALUES (@id, @order)", new { id, order }, transaction);
                    order++;
                }
                transaction.Commit();
            } catch {
                transaction.Rollback();
                throw;
            }
        }

        public async Task UpsertInventoryAsync(RoomInventory inventory)
        {
            const string sql = @"
                INSERT INTO room_inventory (hotel_id, hotel_room_id, inventory_date, available_count)
                VALUES (@HotelId, @HotelRoomId, @InventoryDate, @AvailableCount)
                ON CONFLICT (hotel_id, hotel_room_id, inventory_date) DO UPDATE SET available_count = EXCLUDED.available_count";
            await _db.ExecuteAsync(sql, inventory);
        }

        public async Task UpsertPricingAsync(RoomPricing pricing)
        {
            const string sql = @"
                INSERT INTO room_pricing (hotel_id, hotel_room_id, pricing_date, base_price, currency)
                VALUES (@HotelId, @HotelRoomId, @PricingDate, @BasePrice, @Currency)
                ON CONFLICT (hotel_id, hotel_room_id, pricing_date) DO UPDATE SET base_price = EXCLUDED.base_price";
            await _db.ExecuteAsync(sql, pricing);
        }

        public async Task<HotelMarkup> GetHotelMarkupAsync(Guid hotelId)
        {
            return await _db.QueryFirstOrDefaultAsync<HotelMarkup>("SELECT * FROM hotel_markup WHERE hotel_id = @hotelId", new { hotelId });
        }

        public async Task SaveHotelMarkupAsync(HotelMarkup markup)
        {
            const string sql = @"
                INSERT INTO hotel_markup (hotel_id, markup_percentage, commission_percentage)
                VALUES (@HotelId, @MarkupPercentage, @CommissionPercentage)
                ON CONFLICT (hotel_id) DO UPDATE SET markup_percentage = EXCLUDED.markup_percentage, commission_percentage = EXCLUDED.commission_percentage";
            await _db.ExecuteAsync(sql, markup);
        }

        public async Task<IEnumerable<PaymentReport>> GetPaymentReportAsync(DateTime start, DateTime end)
        {
            const string sql = @"
                SELECT p.*, b.booking_reference 
                FROM payments p
                JOIN bookings b ON p.booking_id = b.id
                WHERE p.created_at BETWEEN @start AND @end";
            return await _db.QueryAsync<PaymentReport>(sql, new { start, end });
        }
    }
}
