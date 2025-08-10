using BrickStoreBackend.DTO;

namespace BrickStoreBackend.Services
{
    public interface IPaymentService
    {
        Task<PaymentResponseDTO> ProcessPaymentAsync(PaymentRequestDTO request);
        Task<List<PaymentResponseDTO>> GetAllPaymentsAsync();
    }
}
