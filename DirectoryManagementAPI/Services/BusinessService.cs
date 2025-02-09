using System.Collections.Generic;
using System.Threading.Tasks;
using DirectoryManagementAPI.Models;
using DirectoryManagementAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace DirectoryManagementAPI.Services
{
    public class BusinessService : IBusinessService
    {
        private readonly ApplicationDbContext _context;

        public BusinessService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Business>> GetBusinesses()
{
    var businesses = await _context.Businesses.ToListAsync();
    
    foreach (var business in businesses)
    {
        Console.WriteLine($"BusinessID: {business.BusinessID}, Name: {business.Name}, CategoryID: {business.CategoryId}");
    }

    return businesses;
}


        public async Task<Business> GetBusinessById(int id)
        {
            return await _context.Businesses.Include(b => b.CategoryId)
                                            .FirstOrDefaultAsync(b => b.BusinessID == id);
        }

        public async Task<Business> CreateBusiness(Business business)
        {
            await _context.Database.ExecuteSqlRawAsync("SET IDENTITY_INSERT Businesses ON;");
            _context.Businesses.Add(business);
            await _context.SaveChangesAsync();
            await _context.Database.ExecuteSqlRawAsync("SET IDENTITY_INSERT Businesses ON;");
            return business;
        }

        public async Task<Business> UpdateBusiness(int id, Business business)
        {
            var existingBusiness = await _context.Businesses.FindAsync(id);
            if (existingBusiness == null) return null;

            existingBusiness.Name = business.Name;
            existingBusiness.Address = business.Address;
            existingBusiness.City = business.City;
            existingBusiness.State = business.State;
            existingBusiness.ZipCode = business.ZipCode;
            existingBusiness.PhoneNumber = business.PhoneNumber;
            existingBusiness.Website = business.Website;
            existingBusiness.Rating = business.Rating;
            existingBusiness.CategoryId = business.CategoryId;
            existingBusiness.UpdatedAt = business.UpdatedAt;

            await _context.SaveChangesAsync();
            return existingBusiness;
        }

        public async Task<bool> DeleteBusiness(int id)
        {
            var business = await _context.Businesses.FindAsync(id);
            if (business == null) return false;

            _context.Businesses.Remove(business);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
