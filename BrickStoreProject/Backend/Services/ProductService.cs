using BrickStoreBackend.DTO;
using BrickStoreBackend.Models;
using BrickStoreBackend.Repositories;
using Microsoft.EntityFrameworkCore;

namespace BrickStoreBackend.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _repo;
        private readonly ICategoryRepository _catRepo;

        public ProductService(IProductRepository repo, ICategoryRepository catRepo)
        {
            _repo = repo;
            _catRepo = catRepo;
        }

        public async Task<Product> AddProductAsync(ProductUploadDTO dto)
        {
            byte[]? imageBytes = null;

            if (dto.ProductImage != null)
            {
                using var ms = new MemoryStream();
                await dto.ProductImage.CopyToAsync(ms);
                imageBytes = ms.ToArray();
            }

            var product = new Product
            {
                ProductName = dto.ProductName,
                Price = dto.Price,
                Quantity = dto.Quantity,
                ProductImage = imageBytes,
                CategoryId = dto.CategoryId
            };

            await _repo.AddProductAsync(product);
            return product;
        }


        private async Task<byte[]> ConvertToBytesAsync(IFormFile file)
        {
            using var ms = new MemoryStream();
            await file.CopyToAsync(ms);
            return ms.ToArray();
        }

        public async Task<List<ProductDTO>> GetAllProductsAsync()
        {
            var products = await _repo.GetAllProductsAsync();
            return products.Select(p => new ProductDTO(p)).ToList();
        }

        public async Task<List<ProductDTO>> GetProductsByCategoryAsync(long categoryId)
        {
            var products = await _repo.GetProductsByCategoryAsync(categoryId);
            return products.Select(p => new ProductDTO(p)).ToList();
        }

        public async Task<Product> GetProductByIdAsync(long productId)
        {
            var product = await _repo.GetProductByIdAsync(productId);
            if (product == null)
                throw new KeyNotFoundException($"Product not found with id: {productId}");

            return product;
        }

        public async Task<Product> UpdateProductAsync(long productId, ProductUpdateDTO dto)
        {
            var product = await _repo.GetProductByIdAsync(productId);
            if (product == null)
                throw new KeyNotFoundException($"Product not found with id: {productId}");

            product.Price = dto.Price;
            product.Quantity = dto.Quantity;

            return await _repo.UpdateProductAsync(product);
        }
    }

}
