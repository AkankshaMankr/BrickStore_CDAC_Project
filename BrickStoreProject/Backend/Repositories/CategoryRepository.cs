using BrickStoreBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace BrickStoreBackend.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly BrickstoreContext _context;

        public CategoryRepository(BrickstoreContext context)
        {
            _context = context;
        }

        public async Task AddCategoryAsync(Category category)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Category>> GetAllCategoriesAsync()
        {
            return await _context.Categories.ToListAsync();
        }


        public async Task<Category?> GetCategoryByNameAsync(string name)
        {
            return await _context.Categories.FirstOrDefaultAsync(c => c.Name.ToLower() == name.ToLower());
        }

    }

}
