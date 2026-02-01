using System;
using System.Collections.Generic;

namespace ThermalHolidays.Api.Domain.Models
{
    public class Hotel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Slug { get; set; }
        public bool IsThermalVerified { get; set; }
        public string Location { get; set; }
        public string ThermalTemp { get; set; }
        public string History { get; set; }
        public string FlowRate { get; set; }
        public int StarRating { get; set; }
        public HotelContent Content { get; set; }
        public List<HotelImage> Images { get; set; } = new();
        public List<HotelRoom> Rooms { get; set; } = new();
        public List<Guid> DestinationIds { get; set; } = new();
    }

    public class HotelContent
    {
        public Guid Id { get; set; }
        public Guid HotelId { get; set; }
        public string LanguageCode { get; set; }
        public string Tagline { get; set; }
        public string Description { get; set; }
        public string ExperienceText { get; set; }
        public string ThermalDescription { get; set; }
        public string OutdoorPools { get; set; }
        public string IndoorPools { get; set; }
        public string SpaDescription { get; set; }
        public dynamic SpaServices { get; set; }
        public string MedicalWellness { get; set; }
        public dynamic ThermalProperties { get; set; }
        public dynamic Policies { get; set; }
        public dynamic Inclusions { get; set; }
    }

    public class HotelImage
    {
        public Guid Id { get; set; }
        public Guid HotelId { get; set; }
        public string Url { get; set; }
        public string AltText { get; set; }
        public int SortOrder { get; set; }
        public bool IsHero { get; set; }
        public string ImageType { get; set; } // HERO, POOL, SPA, ROOM, GALLERY
    }

    public class Destination
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Country { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public string Slug { get; set; }
        public Guid? ParentId { get; set; }
        public int SortOrder { get; set; }
        public List<Destination> Children { get; set; } = new();
    }

    public class HotelRoom
    {
        public Guid Id { get; set; }
        public Guid HotelId { get; set; }
        public Guid? CanonicalCategoryId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int MaxOccupancy { get; set; }
        public decimal? BasePriceDefault { get; set; }
        public dynamic Features { get; set; }
    }

    public class SupplierPropertyMap
    {
        public Guid Id { get; set; }
        public Guid HotelId { get; set; }
        public string SupplierCode { get; set; }
        public string SupplierPropertyId { get; set; }
        public int ConfidenceScore { get; set; }
        public DateTime? LastVerifiedAt { get; set; }
        public bool IsActive { get; set; }
    }

    public class RateCache
    {
        public Guid Id { get; set; }
        public Guid HotelId { get; set; }
        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }
        public string OccupancyHash { get; set; }
        public string Currency { get; set; }
        public dynamic BestRatesJson { get; set; }
        public string SupplierCode { get; set; }
        public DateTime ExpiresAt { get; set; }
    }

    public class Booking
    {
        public Guid Id { get; set; }
        public string BookingReference { get; set; }
        public Guid HotelId { get; set; }
        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }
        public dynamic GuestDetails { get; set; }
        public decimal TotalPrice { get; set; }
        public string Currency { get; set; }
        public string Status { get; set; }
    }
}
