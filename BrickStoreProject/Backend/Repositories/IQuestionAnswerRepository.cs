using BrickStoreBackend.Models;

namespace BrickStoreBackend.Repositories
{
    public interface IQuestionAnswerRepository
    {
        Task<QuestionAnswer> AddQuestionAsync(QuestionAnswer question);
        Task<QuestionAnswer?> GetByIdAsync(long id);
        Task<List<QuestionAnswer>> GetByUserIdAsync(long userId);
        Task<List<QuestionAnswer>> GetAllAsync();
        Task<QuestionAnswer> UpdateAsync(QuestionAnswer question);
    }
}
