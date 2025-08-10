using BrickStoreBackend.DTO;
using BrickStoreBackend.Models;

namespace BrickStoreBackend.Services
{
    public interface IProductService
    {
        Task<Product> AddProductAsync(ProductUploadDTO dto);
        Task<List<ProductDTO>> GetProductsByCategoryAsync(long categoryId);

        Task<List<ProductDTO>> GetAllProductsAsync();

            Task<Product> GetProductByIdAsync(long productId);
        Task<Product> UpdateProductAsync(long productId, ProductUpdateDTO dto);
    }
}
