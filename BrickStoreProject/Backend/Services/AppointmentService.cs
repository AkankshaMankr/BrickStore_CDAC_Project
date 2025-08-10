using BrickStoreBackend.DTO;
using BrickStoreBackend.Models;
using BrickStoreBackend.Repositories;

namespace BrickStoreBackend.Services
{
    public class AppointmentService : IAppointmentService
    {
        private readonly IAppointmentRepository _appointmentRepo;
        private readonly BrickstoreContext _context;

        public AppointmentService(IAppointmentRepository appointmentRepo, BrickstoreContext context)
        {
            _appointmentRepo = appointmentRepo;
            _context = context;
        }
        //orginal code
        //public AppointmentDTO BookAppointment(AppointmentDTO dto)
        //{
        //    var user = _context.Users.Find(dto.UserId) ?? throw new Exception("User not found");
        //    var engineer = _context.Users.Find(dto.EngineerId) ?? throw new Exception("Engineer not found");

        //    var appointment = new Appointment
        //    {
        //        UserId = dto.UserId,
        //        EngineerId = dto.EngineerId,
        //        AppointmentDate = dto.AppointmentDate,
        //        Sqft = dto.Sqft,
        //        Bhk = dto.Bhk,
        //        Floor = dto.Floor,
        //        LandDescription = dto.LandDescription,
        //        Status = "PENDING"
        //    };

        //    _context.Appointments.Add(appointment);
        //    _context.SaveChanges();

        //    return dto; 
        //}

            public AppointmentDTO BookAppointment(AppointmentDTO dto)
        {
            var user = _context.Users.Find(dto.UserId) ?? throw new Exception("User not found");
            var engineer = _context.Users.Find(dto.EngineerId) ?? throw new Exception("Engineer not found");

            // ❗ Check if appointment already exists for the same user, engineer, and date
            bool exists = _context.Appointments.Any(a =>
                a.UserId == dto.UserId &&
                a.EngineerId == dto.EngineerId &&
                a.AppointmentDate== dto.AppointmentDate
            );

            if (exists)
            {
                throw new Exception("You have already booked this engineer on the selected date.");
            }

            var appointment = new Appointment
            {
                UserId = dto.UserId,
                EngineerId = dto.EngineerId,
                AppointmentDate = dto.AppointmentDate,
                Sqft = dto.Sqft,
                Bhk = dto.Bhk,
                Floor = dto.Floor,
                LandDescription = dto.LandDescription,
                Status = "PENDING"
            };

            _context.Appointments.Add(appointment);
            _context.SaveChanges();

            return dto;
        }


        public async Task<List<EngineerAppointmentResponseDTO>> GetAppointmentsByEngineerIdAsync(long engineerId)
        {
            var appointments = await _appointmentRepo.GetAppointmentsByEngineerIdAsync(engineerId);

            return appointments.Select(a => new EngineerAppointmentResponseDTO
            {
                AppointmentId = a.Id,
                AppointmentDate = a.AppointmentDate,
                Status = a.Status,
                Sqft = a.Sqft,
                Bhk = a.Bhk,
                Floor = a.Floor,
                LandDescription = a.LandDescription,
                UserId = a.User?.Id,
                UserName = a.User?.UserName,
                UserEmail = a.User?.Email
            }).ToList();
        }

        public async Task<List<AppointmentResponseDTO>> GetAppointmentsByUserIdAsync(long userId)
        {
            var appointments = await _appointmentRepo.GetAppointmentsByUserIdAsync(userId);

            return appointments.Select(a => new AppointmentResponseDTO
            {
                AppointmentId = a.Id,
                AppointmentDate = a.AppointmentDate,
                Status = a.Status,
                Sqft = a.Sqft,
                Bhk = a.Bhk,
                Floor = a.Floor,
                LandDescription = a.LandDescription,
                EngineerName = a.Engineer?.UserName,
                UserName = a.User?.UserName
            }).ToList();
        }

        public Task<Appointment?> GetAppointmentByIdAsync(long appointmentId)
        {
            return _appointmentRepo.GetAppointmentByIdAsync(appointmentId);
        }

        public Task UpdateAppointmentStatusAsync(Appointment appointment)
        {
            return _appointmentRepo.UpdateAppointmentStatusAsync(appointment);
        }

    }
}
