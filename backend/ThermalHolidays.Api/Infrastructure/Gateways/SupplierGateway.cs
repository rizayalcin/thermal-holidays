using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ThermalHolidays.Api.Infrastructure.Gateways
{
    public interface IHotelSupplierGateway
    {
        string SupplierCode { get; }
        Task<IEnumerable<SupplierRateResult>> SearchAvailabilityAsync(string supplierPropertyId, DateTime checkIn, DateTime checkOut, object occupancy);
        Task<SupplierRateResult> PriceCheckAsync(string supplierPropertyId, string supplierRoomId, string rateId);
        Task<SupplierBookingResult> CreateBookingAsync(SupplierBookingRequest request);
        Task<SupplierBookingResult> GetBookingDetailsAsync(string supplierBookingReference);
        Task<bool> CancelBookingAsync(string supplierBookingReference);
    }

    public class SupplierRateResult
    {
        public string SupplierRoomId { get; set; }
        public string SupplierRoomName { get; set; }
        public string RateId { get; set; }
        public decimal Price { get; set; }
        public string Currency { get; set; }
        public string CancellationPolicy { get; set; }
        public bool Success { get; set; }
        public Dictionary<string, object> RawData { get; set; }
    }

    public class SupplierBookingRequest
    {
        public string SupplierPropertyId { get; set; }
        public string SupplierRoomId { get; set; }
        public string RateId { get; set; }
        public object GuestDetails { get; set; }
    }

    public class SupplierBookingResult
    {
        public bool Success { get; set; }
        public string SupplierBookingReference { get; set; }
        public string Status { get; set; }
        public string ErrorMessage { get; set; }
    }

    // Example Mock Adapter
    public class MockSupplierAdapter : IHotelSupplierGateway
    {
        public string SupplierCode => "MOCK_SUPPLIER";

        public async Task<IEnumerable<SupplierRateResult>> SearchAvailabilityAsync(string supplierPropertyId, DateTime checkIn, DateTime checkOut, object occupancy)
        {
            await Task.Delay(500); // Simulate network latency
            return new List<SupplierRateResult>
            {
                new SupplierRateResult
                {
                    SupplierRoomId = "std_room_01",
                    SupplierRoomName = "Standard Thermal Suite",
                    RateId = "rate_123",
                    Price = 250.00m,
                    Currency = "EUR",
                    CancellationPolicy = "Free cancellation until 48h before arrival."
                }
            };
        }

        public async Task<SupplierRateResult> PriceCheckAsync(string supplierPropertyId, string supplierRoomId, string rateId)
        {
            return new SupplierRateResult { Price = 250.00m, Currency = "EUR", Success = true };
        }

        public async Task<SupplierBookingResult> CreateBookingAsync(SupplierBookingRequest request)
        {
            return new SupplierBookingResult { Success = true, SupplierBookingReference = "MOCK-REF-999", Status = "Confirmed" };
        }

        public async Task<SupplierBookingResult> GetBookingDetailsAsync(string supplierBookingReference)
        {
            return new SupplierBookingResult { Success = true, SupplierBookingReference = supplierBookingReference, Status = "Confirmed" };
        }

        public async Task<bool> CancelBookingAsync(string supplierBookingReference)
        {
            return true;
        }
    }
}
