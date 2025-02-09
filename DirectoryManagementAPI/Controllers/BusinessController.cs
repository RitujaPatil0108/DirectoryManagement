using Microsoft.AspNetCore.Mvc;
using DirectoryManagementAPI.Models;
using DirectoryManagementAPI.Services;
using System.Threading.Tasks;

namespace DirectoryManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BusinessController : ControllerBase
    {
        private readonly IBusinessService _businessService;

        public BusinessController(IBusinessService businessService)
        {
            _businessService = businessService;
        }

        [HttpGet]
        public async Task<IActionResult> GetBusinesses()
        {
            var businesses = await _businessService.GetBusinesses();
            return Ok(businesses);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBusiness(int id)
        {
            var business = await _businessService.GetBusinessById(id);
            if (business == null)
            {
                return NotFound();
            }
            return Ok(business);
        }

        [HttpPost]
        public async Task<IActionResult> CreateBusiness([FromBody] Business business)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdBusiness = await _businessService.CreateBusiness(business);
            
            return Ok(createdBusiness);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBusiness(int id, [FromBody] Business business)
        {
            if (id != business.BusinessID)
            {
                return BadRequest("Mismatched Business ID.");
            }

            var updatedBusiness = await _businessService.UpdateBusiness(id, business);
            
            if (updatedBusiness == null)
            {
                return NotFound("Business not found.");
            }

            return Ok(updatedBusiness);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBusiness(int id)
        {
            var result = await _businessService.DeleteBusiness(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
