using BrickStoreBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace BrickStoreBackend.Repositories
{
    public class AppointmentRepository : IAppointmentRepository
    {
        private readonly BrickstoreContext _context;

        public AppointmentRepository(BrickstoreContext context)
        {
            _context = context;
        }

        public Appointment BookAppointment(Appointment appointment)
        {
            _context.Appointments.Add(appointment);
            _context.SaveChanges();
            return appointment;
        }

        public async Task<List<Appointment>> GetAppointmentsByEngineerIdAsync(long engineerId)
        {
            return await _context.Appointments
                .Include(a => a.User)
                .Where(a => a.EngineerId == engineerId)
                .ToListAsync();
        }

        public async Task<List<Appointment>> GetAppointmentsByUserIdAsync(long userId)
        {
            return await _context.Appointments
                .Include(a => a.User)
                .Include(a => a.Engineer)
                .Where(a => a.UserId == userId)
                .ToListAsync();
        }

        public async Task<Appointment?> GetAppointmentByIdAsync(long appointmentId)
        {
            return await _context.Appointments.FindAsync(appointmentId);
        }

        public async Task UpdateAppointmentStatusAsync(Appointment appointment)
        {
            appointment.Status = "COMPLETED";
            _context.Appointments.Update(appointment);
            await _context.SaveChangesAsync();
        }
    }
}
