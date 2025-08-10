using BrickStoreBackend.DTO;
using BrickStoreBackend.Models;

namespace BrickStoreBackend.Services
{
    public interface IAppointmentService
    {
        AppointmentDTO BookAppointment(AppointmentDTO dto);
        Task<List<EngineerAppointmentResponseDTO>> GetAppointmentsByEngineerIdAsync(long engineerId);
        Task<List<AppointmentResponseDTO>> GetAppointmentsByUserIdAsync(long userId);

        Task<Appointment?> GetAppointmentByIdAsync(long appointmentId);
        Task UpdateAppointmentStatusAsync(Appointment appointment);
    }
}
