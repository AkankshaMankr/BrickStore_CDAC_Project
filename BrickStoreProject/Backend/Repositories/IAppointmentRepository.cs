using BrickStoreBackend.Models;

namespace BrickStoreBackend.Repositories
{
    public interface IAppointmentRepository
    {

        Appointment BookAppointment(Appointment appointment);

        Task<List<Appointment>> GetAppointmentsByEngineerIdAsync(long engineerId);
        Task<List<Appointment>> GetAppointmentsByUserIdAsync(long userId);

        Task<Appointment?> GetAppointmentByIdAsync(long appointmentId);
        Task UpdateAppointmentStatusAsync(Appointment appointment);
    }
}
