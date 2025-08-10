using BrickStoreBackend.DTO;
using BrickStoreBackend.Models;

namespace BrickStoreBackend.Repositories
{
    public interface IUserRepository
    {
        Task<User?> GetUserByIdAsync(long userId);
        Task<User?> GetUserByEmailAsync(string email);
        Task<User> RegisterUserAsync(User user);
        Task<User> UpdateUserAsync(long id, User user);
        Task<List<User>> GetAllUsersAsync();

        Task<IEnumerable<User>> GetUsersByRoleAsync(string role);

    }
}
