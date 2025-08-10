using System;
using System.Collections.Generic;

namespace BrickStoreBackend.Models;

public partial class AreaDocument
{
    public long Id { get; set; }

    public byte[]? DocumentPdf { get; set; }

    public string? Name { get; set; }

    public long AppointmentId { get; set; }

    public virtual Appointment? Appointment { get; set; }
}
