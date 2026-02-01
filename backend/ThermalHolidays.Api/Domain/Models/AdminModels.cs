using System;

namespace ThermalHolidays.Api.Domain.Models
{
    public class Language
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public bool IsDefault { get; set; }
        public bool IsActive { get; set; }
    }

    public class HotelMarkup
    {
        public Guid Id { get; set; }
        public Guid HotelId { get; set; }
        public decimal MarkupPercentage { get; set; }
        public decimal CommissionPercentage { get; set; }
    }

    public class RoomInventory
    {
        public Guid Id { get; set; }
        public Guid HotelId { get; set; }
        public Guid RoomCategoryId { get; set; }
        public DateTime InventoryDate { get; set; }
        public int AvailableCount { get; set; }
    }

    public class RoomPricing
    {
        public Guid Id { get; set; }
        public Guid HotelId { get; set; }
        public Guid RoomCategoryId { get; set; }
        public DateTime PricingDate { get; set; }
        public decimal BasePrice { get; set; }
        public string Currency { get; set; }
    }

    public class PaymentReport
    {
        public Guid Id { get; set; }
        public string BookingReference { get; set; }
        public decimal Amount { get; set; }
        public string Currency { get; set; }
        public string PaymentMethod { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class DestinationOrderUpdate
    {
        public Guid Id { get; set; }
        public int Order { get; set; }
        public Guid? ParentId { get; set; }
    }
}
