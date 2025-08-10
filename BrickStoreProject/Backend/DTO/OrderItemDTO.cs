namespace BrickStoreBackend.DTO
{
    public class OrderItemDTO
    {
        public long OrderId { get; set; }
        public DateTime? OrderDate { get; set; }

        public long ProductId { get; set; }
        public string ProductName { get; set; }
        public string ProductImage { get; set; }
        public decimal? ProductPrice { get; set; }
        public int Quantity { get; set; }
    }
}
