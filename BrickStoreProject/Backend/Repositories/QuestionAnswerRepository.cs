using BrickStoreBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace BrickStoreBackend.Repositories
{
    public class QuestionAnswerRepository : IQuestionAnswerRepository
    {
        private readonly BrickstoreContext _context;

        public QuestionAnswerRepository(BrickstoreContext context)
        {
            _context = context;
        }

        public async Task<QuestionAnswer> AddQuestionAsync(QuestionAnswer question)
        {
            _context.QuestionAnswers.Add(question);
            await _context.SaveChangesAsync();
            return question;
        }

        public async Task<QuestionAnswer?> GetByIdAsync(long id)
        {
            return await _context.QuestionAnswers
                                 .Include(q => q.User)
                                 .FirstOrDefaultAsync(q => q.Id == id);
        }

        public async Task<List<QuestionAnswer>> GetByUserIdAsync(long userId)
        {
            return await _context.QuestionAnswers
                                 .Where(q => q.UserId == userId)
                                 .ToListAsync();
        }

        public async Task<List<QuestionAnswer>> GetAllAsync()
        {
            return await _context.QuestionAnswers.ToListAsync();
        }

        public async Task<QuestionAnswer> UpdateAsync(QuestionAnswer question)
        {
            _context.QuestionAnswers.Update(question);
            await _context.SaveChangesAsync();
            return question;
        }
    }

}
