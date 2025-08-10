using System.ComponentModel.DataAnnotations;

namespace BrickStoreBackend.DTO
{
    public class CartDTO
    {
        public long CartId { get; set; }
        public int? Quantity { get; set; }
        public long ProductId { get; set; }
        public long UserId { get; set; }
        public ProductDTO Product { get; set; }


    }
}
