namespace BrickStoreBackend.DTO
{
    public class CartRequestDTO
    {
        public int? Quantity { get; set; }
        public long ProductId { get; set; }
        public long UserId { get; set; }
    }
}
