namespace BrickStoreBackend.DTO
{
    public class ProductUploadDTO
    {
        public string? ProductName { get; set; }
        public double Price { get; set; }
        public double Quantity { get; set; }
        public IFormFile? ProductImage { get; set; }
        public long CategoryId { get; set; }
    }
}
