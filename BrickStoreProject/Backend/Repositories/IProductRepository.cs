using BrickStoreBackend.Models;

namespace BrickStoreBackend.Repositories
{
    public interface IProductRepository
    {

        Task AddProductAsync(Product product);

        Task<List<Product>> GetAllProductsAsync();
        Task<List<Product>> GetProductsByCategoryAsync(long categoryId);
        Task<Product> GetProductByIdAsync(long productId);
        Task<Product> UpdateProductAsync(Product product);
    }
}
