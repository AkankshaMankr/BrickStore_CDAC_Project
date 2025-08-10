using BrickStoreBackend.Models;
using BrickStoreBackend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BrickStoreBackend.Controllers
{
    [ApiController]
    public class AreaDocumentController : ControllerBase
    {
        private readonly IAreaDocumentService _areaDocumentService;
        private readonly IAppointmentService _appointmentService;

        public AreaDocumentController(IAreaDocumentService areaDocumentService, IAppointmentService appointmentService)
        {
            _areaDocumentService = areaDocumentService;
            _appointmentService = appointmentService;
        }

        [Authorize]
        [HttpPost("engineer/uploadDocument/{appointmentId}")]
        public async Task<IActionResult> UploadDocument(long appointmentId, IFormFile file)
        {
            var appointment = await _appointmentService.GetAppointmentByIdAsync(appointmentId);
            if (appointment == null)
            {
                return NotFound("Appointment not found");
            }

            appointment.Status = "COMPLETED";
            await _appointmentService.UpdateAppointmentStatusAsync(appointment);

            using var memoryStream = new MemoryStream();
            await file.CopyToAsync(memoryStream);

            var document = new AreaDocument
            {
                Name = $"AreaDoc_{appointmentId}",
                DocumentPdf = memoryStream.ToArray(),
                AppointmentId = appointmentId,
                Appointment = appointment
            };

            await _areaDocumentService.SaveDocumentAsync(document);

            return Ok("Document uploaded successfully");
        }

        [Authorize]
        [HttpGet("customer/downloadDocument/{appointmentId}")]
        public async Task<IActionResult> DownloadDocument(long appointmentId)
        {
            var document = await _areaDocumentService.GetDocumentByAppointmentIdAsync(appointmentId);

            if (document == null)
                return NotFound();

            return File(document.DocumentPdf, "application/pdf", $"{document.Name}.pdf");
        }
    }

}
