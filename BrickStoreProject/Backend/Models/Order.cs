using System;
using System.Collections.Generic;

namespace BrickStoreBackend.Models;

public partial class Order
{
    public long OrderId { get; set; }

    public DateTime? OrderDate { get; set; }

    public long? UserId { get; set; }

    public virtual ICollection<OrderProduct> OrderProducts { get; set; } = new List<OrderProduct>();

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    public virtual User? User { get; set; }
}
