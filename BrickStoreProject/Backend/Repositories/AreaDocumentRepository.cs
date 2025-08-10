using BrickStoreBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace BrickStoreBackend.Repositories
{
    public class AreaDocumentRepository : IAreaDocumentRepository
    {
        private readonly BrickstoreContext _context;

        public AreaDocumentRepository(BrickstoreContext context)
        {
            _context = context;
        }

        public async Task<AreaDocument> SaveDocumentAsync(AreaDocument document)
        {
            _context.AreaDocuments.Add(document);
            await _context.SaveChangesAsync();
            return document;
        }

        public async Task<AreaDocument?> FindByAppointmentIdAsync(long appointmentId)
        {
            return await _context.AreaDocuments
                .Include(d => d.Appointment)
                .FirstOrDefaultAsync(d => d.AppointmentId == appointmentId);
        }
    }

}
