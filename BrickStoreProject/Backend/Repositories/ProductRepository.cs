using BrickStoreBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace BrickStoreBackend.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly BrickstoreContext _context;

        public ProductRepository(BrickstoreContext context)
        {
            _context = context;
        }

        public async Task AddProductAsync(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Product>> GetAllProductsAsync()
        {
            return await _context.Products
                .Include(p => p.Category)
                .ToListAsync();
        }



        public async Task<List<Product>> GetProductsByCategoryAsync(long categoryId)
        {
            return await _context.Products
                .Where(p => p.CategoryId == categoryId)
                .ToListAsync();
        }

        public async Task<Product> GetProductByIdAsync(long productId)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.ProductId == productId);
            if (product is null)
                throw new Exception($"Product with ID {productId} not found.");

            return product;
        }


        public async Task<Product> UpdateProductAsync(Product product)
        {
            _context.Products.Update(product);
            await _context.SaveChangesAsync();
            return product;
        }
    }

}
