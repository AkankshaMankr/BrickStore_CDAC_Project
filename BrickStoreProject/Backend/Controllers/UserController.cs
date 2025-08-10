using BrickStoreBackend.DTO;
using BrickStoreBackend.Models;
using BrickStoreBackend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BrickStoreBackend.Controllers
{
    [Route("customer")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IAppointmentService _appointmentService;
        private readonly IPasswordHasher<User> _passwordHasher;

        public UserController(IUserService userService, IAppointmentService appointmentService, IPasswordHasher<User> passwordHasher)
        {
            _userService = userService;
            _appointmentService = appointmentService;
            _passwordHasher = passwordHasher;
        }

        [AllowAnonymous]
        [HttpPost("registerUser")]
        public async Task<IActionResult> RegisterUser([FromBody] User user)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(user.Password))
                    return BadRequest("Password is required.");

                user.Role = "ROLE_CUSTOMER";
                var newUser = await _userService.RegisterUserAsync(user);
                return Created("", newUser);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error registering user: {ex.Message}");
            }
        }

        [Authorize]
        [HttpPut("updateUser/{id}")]
        public async Task<IActionResult> UpdateUser(long id, [FromBody] User user)
        {
            try
            {
                user.Role = "ROLE_CUSTOMER";

                var updatedUser = await _userService.UpdateUserAsync(id, user);
                if (updatedUser == null)
                    return NotFound("User not found");

                return Ok(updatedUser);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error updating user: {ex.Message}");
            }
        }

        [Authorize]
        [HttpGet("getAllUsers")]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var users = await _userService.GetAllUsersAsync();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error fetching users: {ex.Message}");
            }
        }

        [Authorize]
        [HttpGet("getUserById/{id}")]
        public async Task<IActionResult> GetUserById(long id)
        {
            try
            {
                var user = await _userService.GetUserByIdAsync(id);
                if (user == null)
                    return NotFound("User not found");

                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error fetching user: {ex.Message}");
            }
        }

        [Authorize]
        [HttpPost("bookAppointment")]
        public async Task<IActionResult> BookAppointment([FromBody] AppointmentDTO dto)
        {
            try
            {
                var appointment = _appointmentService.BookAppointment(dto);
                return Ok(appointment);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Booking failed: {ex.Message}" });
            }
        }

        [Authorize]
        [HttpGet("getEngineerAppointments/{engineerId}")]
        public async Task<IActionResult> GetEngineerAppointments(long engineerId)
        {
            var result = await _appointmentService.GetAppointmentsByEngineerIdAsync(engineerId);

            if (result == null || result.Count == 0)
                return NoContent();

            return Ok(result);
        }

        [Authorize]
        [HttpGet("getAppointmentsByUserId/{userId}")]
        public async Task<IActionResult> GetAppointmentsByUserId(long userId)
        {
            var result = await _appointmentService.GetAppointmentsByUserIdAsync(userId);

            if (result == null || result.Count == 0)
                return NoContent();

            return Ok(result);
        }
    }
}
