using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace BrickStoreBackend.Models;


public partial class User
{
    public long Id { get; set; }

    public string? Address { get; set; }

    public string? Contact { get; set; }

    public string? Email { get; set; }

    public string? Password { get; set; }

    public string? Pincode { get; set; }

    public string? Role { get; set; }

    [NotMapped]
    public Role? UserRole
    {
        get => Role != null ? Enum.Parse<Role>(Role) : null;
        set => Role = value?.ToString();
    }

    public string? UserName { get; set; }

    public virtual ICollection<Appointment> AppointmentEngineers { get; set; } = new List<Appointment>();

    public virtual ICollection<Appointment> AppointmentUsers { get; set; } = new List<Appointment>();

    public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<QuestionAnswer> QuestionAnswers { get; set; } = new List<QuestionAnswer>();
}
