namespace BrickStoreBackend.DTO
{
    public class CartResponseDTO
    {
        public int? Quantity { get; set; }
        public long CartId { get; set; }
        public ProductDTO Product { get; set; }
    }
}
