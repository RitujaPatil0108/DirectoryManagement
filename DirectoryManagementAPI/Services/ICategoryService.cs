using System.Collections.Generic;
using System.Threading.Tasks;
using DirectoryManagementAPI.Models;

namespace DirectoryManagementAPI.Services
{
    public interface ICategoryService
    {
        Task<IEnumerable<Category>> GetCategories();
        Task<Category> GetCategoryById(int id);
    }
}
