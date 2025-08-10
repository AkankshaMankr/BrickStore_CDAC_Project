using System;
using System.Collections.Generic;

namespace BrickStoreBackend.Models;

public partial class Appointment
{
    public long Id { get; set; }

    public DateOnly AppointmentDate { get; set; }

    public int Bhk { get; set; }

    public int Floor { get; set; }

    public string? LandDescription { get; set; }

    public double Sqft { get; set; }

    public string? Status { get; set; }

    public long? EngineerId { get; set; }

    public long? UserId { get; set; }

    public virtual ICollection<AreaDocument> AreaDocuments { get; set; } = new List<AreaDocument>();

    public virtual User? Engineer { get; set; }

    public virtual User? User { get; set; }
}
