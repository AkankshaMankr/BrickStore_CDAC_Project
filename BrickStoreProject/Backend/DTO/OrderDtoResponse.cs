using BrickStoreBackend.Models;

namespace BrickStoreBackend.DTO
{
    public class OrderDtoResponse
    {
        public long OrderId { get; set; }
        public DateTime? OrderDate { get; set; }
        public List<OrderItemDTO> OrderItems { get; set; }

    }

}
