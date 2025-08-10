using BrickStoreBackend.DTO;
using BrickStoreBackend.Models;

namespace BrickStoreBackend.Services
{
    public interface ICartService
    {
        Task<CartResponseDTO> AddToCartAsync(CartRequestDTO cartDto);
        Task<List<CartDTO>> GetCartByUserIdAsync(long userId);
        Task RemoveProductFromCartAsync(long userId, long productId);
    }
}
