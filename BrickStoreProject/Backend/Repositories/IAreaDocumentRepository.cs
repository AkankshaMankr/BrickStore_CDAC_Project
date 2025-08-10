using BrickStoreBackend.Models;

namespace BrickStoreBackend.Repositories
{
    public interface IAreaDocumentRepository
    {
        Task<AreaDocument> SaveDocumentAsync(AreaDocument document);
        Task<AreaDocument?> FindByAppointmentIdAsync(long appointmentId);
    }
}
