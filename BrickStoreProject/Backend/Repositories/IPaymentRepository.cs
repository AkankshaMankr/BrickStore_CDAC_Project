using BrickStoreBackend.DTO;
using BrickStoreBackend.Models;

namespace BrickStoreBackend.Repositories
{
    public interface IPaymentRepository
    {
        Task<Payment> AddPaymentAsync(Payment payment);
        Task<Order> GetOrderByIdAsync(long orderId);
        Task<List<AdminPaymentDTO>> GetAllPaymentsAsync();
    }
}
