
using BrickStoreBackend.DTO;
using BrickStoreBackend.Models;
using BrickStoreBackend.Repositories;

namespace BrickStoreBackend.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IWebHostEnvironment _env;

        public CategoryService(ICategoryRepository categoryRepository, IWebHostEnvironment env)
        {
            _categoryRepository = categoryRepository;
            _env = env;
        }

        //public async Task<CategoryDTO> AddCategoryAsync(string name, IFormFile? image)
        //{
        //    byte[]? imageBytes;

        //    if (image != null && image.Length > 0)
        //    {
        //        using (var memoryStream = new MemoryStream())
        //        {
        //            await image.CopyToAsync(memoryStream);
        //            imageBytes = memoryStream.ToArray();
        //        }
        //    }
        //    else
        //    {
        //        imageBytes = Array.Empty<byte>(); // Use empty array instead of null
        //    }


        //    var category = new Category
        //    {
        //        Name = name,
        //        Image = imageBytes
        //    };

        //    await _categoryRepository.AddCategoryAsync(category);

        //    return new CategoryDTO
        //    {
        //        CategoryId = category.Id,
        //        Name = category.Name,
        //        Image = category.Image
        //    };
        //}

        public async Task<CategoryDTO> AddCategoryAsync(string name, IFormFile? image)
        {
            // Check if category with the same name already exists
            var existingCategory = await _categoryRepository.GetCategoryByNameAsync(name);
            if (existingCategory != null)
            {
                throw new InvalidOperationException("Category with this name already exists.");
            }

            byte[]? imageBytes;

            if (image != null && image.Length > 0)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await image.CopyToAsync(memoryStream);
                    imageBytes = memoryStream.ToArray();
                }
            }
            else
            {
                imageBytes = Array.Empty<byte>();
            }

            var category = new Category
            {
                Name = name,
                Image = imageBytes
            };

            await _categoryRepository.AddCategoryAsync(category);

            return new CategoryDTO
            {
                CategoryId = category.Id,
                Name = category.Name,
                Image = category.Image
            };
        }




        public async Task<IEnumerable<CategoryDTO>> GetAllCategoriesAsync()
        {
            var categories = await _categoryRepository.GetAllCategoriesAsync();

            return categories.Select(c => new CategoryDTO
            {
                CategoryId = c.Id,
                Name = c.Name,
                Image = c.Image
            });
        }
    }

}
