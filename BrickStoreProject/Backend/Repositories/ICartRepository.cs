using BrickStoreBackend.DTO;
using BrickStoreBackend.Models;
using System.Threading.Tasks;

namespace BrickStoreBackend.Repositories
{
    public interface ICartRepository
    {
        Task AddCartAsync(Cart cart);
        Task<List<Cart>> GetCartByUserIdAsync(long userId);
        Task<Cart?> GetCartItemAsync(long userId, long productId);
        Task RemoveCartAsync(Cart cart);
    }
}
