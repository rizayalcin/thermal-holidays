using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ThermalHolidays.Api.Domain.Models;
using ThermalHolidays.Api.Infrastructure.Repositories;

namespace ThermalHolidays.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin,Manager")]
    public class AdminController : ControllerBase
    {
        private readonly IAdminRepository _adminRepository;
        private readonly IHotelRepository _hotelRepository;

        public AdminController(IAdminRepository adminRepository, IHotelRepository hotelRepository)
        {
            _adminRepository = adminRepository;
            _hotelRepository = hotelRepository;
        }

        // Destinations
        [HttpGet("destinations")]
        public async Task<ActionResult<IEnumerable<Destination>>> GetDestinations() => Ok(await _adminRepository.GetDestinationsAsync());

        [HttpPost("destinations")]
        public async Task<ActionResult<Guid>> SaveDestination([FromBody] Destination destination) => Ok(await _adminRepository.SaveDestinationAsync(destination));

        [HttpDelete("destinations/{id}")]
        public async Task<IActionResult> DeleteDestination(Guid id)
        {
            await _adminRepository.DeleteDestinationAsync(id);
            return Ok();
        }

        [HttpPost("destinations/reorder")]
        public async Task<IActionResult> ReorderDestination([FromBody] DestinationOrderUpdate update)
        {
            await _adminRepository.UpdateDestinationOrderAsync(update.Id, update.Order, update.ParentId);
            return Ok();
        }

        // Hotels
        [HttpGet("hotels/{id}")]
        public async Task<ActionResult<Hotel>> GetHotel(Guid id) => Ok(await _adminRepository.GetHotelByIdAsync(id));

        [HttpPost("hotels")]
        public async Task<ActionResult<Guid>> SaveHotel([FromBody] Hotel hotel)
        {
            var id = await _adminRepository.SaveHotelAsync(hotel);
            
            if (hotel.Content != null)
            {
                hotel.Content.HotelId = id;
                await _adminRepository.SaveHotelContentAsync(hotel.Content);
            }

            if (hotel.DestinationIds != null)
            {
                await _adminRepository.SyncHotelDestinationsAsync(id, hotel.DestinationIds);
            }

            return Ok(id);
        }

        [HttpPost("hotels/images")]
        public async Task<IActionResult> SaveHotelImage([FromBody] HotelImage image)
        {
            await _adminRepository.SaveHotelImageAsync(image);
            return Ok();
        }

        [HttpDelete("hotels/images/{imageId}")]
        public async Task<IActionResult> DeleteHotelImage(Guid imageId)
        {
            await _adminRepository.DeleteHotelImageAsync(imageId);
            return Ok();
        }

        // Rooms
        [HttpGet("hotels/{hotelId}/rooms")]
        public async Task<ActionResult<IEnumerable<HotelRoom>>> GetHotelRooms(Guid hotelId) => Ok(await _adminRepository.GetHotelRoomsAsync(hotelId));

        [HttpPost("hotels/rooms")]
        public async Task<ActionResult<Guid>> SaveHotelRoom([FromBody] HotelRoom room) => Ok(await _adminRepository.SaveHotelRoomAsync(room));

        [HttpDelete("hotels/rooms/{roomId}")]
        public async Task<IActionResult> DeleteHotelRoom(Guid roomId)
        {
            await _adminRepository.DeleteHotelRoomAsync(roomId);
            return Ok();
        }

        // Languages
        [HttpGet("languages")]
        public async Task<ActionResult<IEnumerable<Language>>> GetLanguages() => Ok(await _adminRepository.GetLanguagesAsync());

        [HttpPost("languages")]
        public async Task<IActionResult> SaveLanguage([FromBody] Language language)
        {
            await _adminRepository.SaveLanguageAsync(language);
            return Ok();
        }

        // Featured Hotels
        [HttpGet("featured-hotels")]
        public async Task<ActionResult<IEnumerable<Hotel>>> GetFeaturedHotels() => Ok(await _adminRepository.GetFeaturedHotelsAsync());

        [HttpPost("featured-hotels")]
        public async Task<IActionResult> SetFeaturedHotels([FromBody] List<Guid> hotelIds)
        {
            await _adminRepository.SetFeaturedHotelsAsync(hotelIds);
            return Ok();
        }

        // Inventory & Pricing
        [HttpPost("inventory")]
        public async Task<IActionResult> UpdateInventory([FromBody] RoomInventory inventory)
        {
            await _adminRepository.UpsertInventoryAsync(inventory);
            return Ok();
        }

        [HttpPost("pricing")]
        public async Task<IActionResult> UpdatePricing([FromBody] RoomPricing pricing)
        {
            await _adminRepository.UpsertPricingAsync(pricing);
            return Ok();
        }

        // Markup
        [HttpGet("markup/{hotelId}")]
        public async Task<ActionResult<HotelMarkup>> GetMarkup(Guid hotelId) => Ok(await _adminRepository.GetHotelMarkupAsync(hotelId));

        [HttpPost("markup")]
        public async Task<IActionResult> SaveMarkup([FromBody] HotelMarkup markup)
        {
            await _adminRepository.SaveHotelMarkupAsync(markup);
            return Ok();
        }

        // Reports
        [HttpGet("reports/payments")]
        public async Task<ActionResult<IEnumerable<PaymentReport>>> GetPaymentReport([FromQuery] DateTime start, [FromQuery] DateTime end)
        {
            return Ok(await _adminRepository.GetPaymentReportAsync(start, end));
        }
    }
}
