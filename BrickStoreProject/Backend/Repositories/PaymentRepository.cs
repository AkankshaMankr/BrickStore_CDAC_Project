using BrickStoreBackend.DTO;
using BrickStoreBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace BrickStoreBackend.Repositories
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly BrickstoreContext _context;

        public PaymentRepository(BrickstoreContext context)
        {
            _context = context;
        }

        // Implementation
        public async Task<Payment> AddPaymentAsync(Payment payment)
        {
            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();
            return payment;
        }

        public async Task<Order> GetOrderByIdAsync(long orderId)
        {
            return await _context.Orders.FindAsync(orderId);
        }

        public async Task<List<AdminPaymentDTO>> GetAllPaymentsAsync()
        {
            return await _context.Payments
                .Include(p => p.Order)                 // Include Order
                .ThenInclude(o => o.User)              // Include User inside Order
                .Select(p => new AdminPaymentDTO
                {
                    PaymentId = p.Id,
                    OrderId = p.OrderId,
                    Amount = p.Amount,
                    PaymentStatus = p.PaymentStatus,
                    UserName = p.Order.User.UserName,     // Adjust based on your property name
                    OrderDate = p.Order.OrderDate         // Adjust based on your property name
                })
                .ToListAsync();
        }


    }

}
