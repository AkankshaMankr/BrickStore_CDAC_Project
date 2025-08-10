using BrickStoreBackend.Models;

namespace BrickStoreBackend.Services
{
    public interface IAreaDocumentService
    {
        Task<AreaDocument> SaveDocumentAsync(AreaDocument document);
        Task<AreaDocument?> GetDocumentByAppointmentIdAsync(long appointmentId);
    }
}
