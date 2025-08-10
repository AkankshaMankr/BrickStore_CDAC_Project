
using BrickStoreBackend.DTO;
using System.Threading.Tasks;

namespace BrickStoreBackend.Services
{
    public interface ICategoryService
    {
        Task<CategoryDTO> AddCategoryAsync(string name, IFormFile? image);
        Task<IEnumerable<CategoryDTO>> GetAllCategoriesAsync();
    }
}
