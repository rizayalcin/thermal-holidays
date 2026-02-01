using Microsoft.AspNetCore.Mvc;
using ThermalHolidays.Api.Domain.Models;
using ThermalHolidays.Api.Infrastructure.Repositories;

namespace ThermalHolidays.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingsController : ControllerBase
    {
        private readonly IBookingRepository _bookingRepository;

        public BookingsController(IBookingRepository bookingRepository)
        {
            _bookingRepository = bookingRepository;
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> CreateBooking([FromBody] Booking booking, [FromQuery] string supplierCode, [FromQuery] string supplierReference)
        {
            try 
            {
                var bookingId = await _bookingRepository.CreateBookingTransactionAsync(booking, supplierCode, supplierReference);
                return Ok(bookingId);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}
