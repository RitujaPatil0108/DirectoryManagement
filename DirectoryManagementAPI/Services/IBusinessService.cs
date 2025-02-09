using System.Collections.Generic;
using System.Threading.Tasks;
using DirectoryManagementAPI.Models;

namespace DirectoryManagementAPI.Services
{
    public interface IBusinessService
    {
        Task<IEnumerable<Business>> GetBusinesses();
        Task<Business> GetBusinessById(int id);
        Task<Business> CreateBusiness(Business business);
        Task<Business> UpdateBusiness(int id, Business business);
        Task<bool> DeleteBusiness(int id);
    }
}
