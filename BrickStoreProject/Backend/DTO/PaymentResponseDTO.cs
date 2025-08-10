namespace BrickStoreBackend.DTO
{
    public class PaymentResponseDTO
    {
        public long PaymentId { get; set; }
        public long OrderId { get; set; }
        public double Amount { get; set; }
        public string Status { get; set; }

        public DateTime? orderDate { get; set; }

        public string userName { get; set; }
    }
}
