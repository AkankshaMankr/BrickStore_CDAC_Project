using System;
using System.Collections.Generic;

namespace BrickStoreBackend.Models;

public partial class QuestionAnswer
{
    public long Id { get; set; }

    public string? Answer { get; set; }

    public bool IsAnswered { get; set; }

    public string Question { get; set; } = null!;

    public long UserId { get; set; }

    public virtual User? User { get; set; }
}
