using BrickStoreBackend.DTO;
using BrickStoreBackend.Models;

namespace BrickStoreBackend.Services
{
    public interface IUserService
    {
        Task<User> RegisterUserAsync(User user);
        Task<User> UpdateUserAsync(long id, User user);
        Task<List<User>> GetAllUsersAsync();
        Task<User> GetUserByIdAsync(long id);

        Task<User> RegisterEngineerAsync(UserDTO userDto);
        Task<User> UpdateUserAsync(long id, UserDTO userDto);
        Task<IEnumerable<User>> GetEngineersAsync();

        Task<User?> Authenticate(string email, string password);
    }
}
