using Microsoft.AspNetCore.Mvc;
using ThermalHolidays.Api.Domain.Models;
using ThermalHolidays.Api.Infrastructure.Repositories;

namespace ThermalHolidays.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HotelsController : ControllerBase
    {
        private readonly IHotelRepository _hotelRepository;

        public HotelsController(IHotelRepository hotelRepository)
        {
            _hotelRepository = hotelRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Hotel>>> GetHotels()
        {
            var hotels = await _hotelRepository.GetCuratedHotelsAsync();
            return Ok(hotels);
        }

        [HttpGet("{slug}")]
        public async Task<ActionResult<Hotel>> GetHotel(string slug)
        {
            var hotel = await _hotelRepository.GetHotelBySlugAsync(slug);
            if (hotel == null) return NotFound();
            return Ok(hotel);
        }
    }
}
