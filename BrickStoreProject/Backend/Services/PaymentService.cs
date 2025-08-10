using BrickStoreBackend.DTO;
using BrickStoreBackend.Models;
using BrickStoreBackend.Repositories;

namespace BrickStoreBackend.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IPaymentRepository _paymentRepository;

        public PaymentService(IPaymentRepository paymentRepository)
        {
            _paymentRepository = paymentRepository;
        }
        public async Task<PaymentResponseDTO> ProcessPaymentAsync(PaymentRequestDTO request)
        {
            var order = await _paymentRepository.GetOrderByIdAsync(request.OrderId);
            if (order == null)
                throw new KeyNotFoundException($"Order not found with ID: {request.OrderId}");

            var payment = new Payment
            {
                OrderId = order.OrderId,
                Amount = request.Amount,
                PaymentStatus = "PAID"
            };

            var savedPayment = await _paymentRepository.AddPaymentAsync(payment);

            return new PaymentResponseDTO
            {
                PaymentId = savedPayment.Id,
                OrderId = savedPayment.OrderId,
                Amount = savedPayment.Amount,
                Status = savedPayment.PaymentStatus
            };
        }

        public async Task<List<PaymentResponseDTO>> GetAllPaymentsAsync()
        {
            var payments = await _paymentRepository.GetAllPaymentsAsync();

            return payments.Select(p => new PaymentResponseDTO
            {
                PaymentId = p.PaymentId,
                OrderId = p.OrderId,
                Amount = p.Amount,
                Status = p.PaymentStatus ?? "UNKNOWN",
                orderDate = p.OrderDate,
                userName = p.UserName

            }).ToList();
        }
    }

}
