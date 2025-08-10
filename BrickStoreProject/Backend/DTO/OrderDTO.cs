using BrickStoreBackend.Models;

namespace BrickStoreBackend.DTO
{
    public class OrderDTO
    {
        public long OrderId { get; set; }
        public long UserId { get; set; }
        public DateTime OrderDate { get; set; }
        public List<OrderItemDTO> Items { get; set; }

        public OrderDTO(Order order)
        {
            OrderId = order.OrderId;
            UserId = order.UserId ?? 0;
            OrderDate = order.OrderDate;

            Items = order.OrderProducts.Select(op => new OrderItemDTO
            {
                ProductId = op.Id,
                Quantity = op.Quantity
            }).ToList();
        }
    }
}
