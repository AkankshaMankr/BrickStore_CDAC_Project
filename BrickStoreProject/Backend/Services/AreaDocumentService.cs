using BrickStoreBackend.Models;
using BrickStoreBackend.Repositories;

namespace BrickStoreBackend.Services
{
    public class AreaDocumentService : IAreaDocumentService
    {
        private readonly IAreaDocumentRepository _documentRepository;

        public AreaDocumentService(IAreaDocumentRepository documentRepository)
        {
            _documentRepository = documentRepository;
        }

        public Task<AreaDocument> SaveDocumentAsync(AreaDocument document)
        {
            return _documentRepository.SaveDocumentAsync(document);
        }

        public Task<AreaDocument?> GetDocumentByAppointmentIdAsync(long appointmentId)
        {
            return _documentRepository.FindByAppointmentIdAsync(appointmentId);
        }
    }
}
