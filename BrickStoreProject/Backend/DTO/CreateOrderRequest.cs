namespace BrickStoreBackend.DTO
{
    public class CreateOrderRequest
    {
        public long Id { get; set; } // User ID
        public List<OrderItemResponseDTO> Items { get; set; } = new();
    }
}
