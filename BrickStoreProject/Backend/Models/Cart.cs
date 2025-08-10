using System;
using System.Collections.Generic;

namespace BrickStoreBackend.Models;

public partial class Cart
{
    public long CartId { get; set; }

    public int? Quantity { get; set; }

    public long? ProductId { get; set; }

    public long UserId { get; set; }

    public virtual Product? Product { get; set; }

    public virtual User User { get; set; } = null!;
}
