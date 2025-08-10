using BrickStoreBackend.DTO;

namespace BrickStoreBackend.Services
{
    public interface IQuestionAnswerService
    {
        Task<QuestionAnswerDTO> AskQuestionAsync(QuestionAnswerDTO dto);
        Task<QuestionAnswerDTO> AnswerQuestionAsync(long id, QuestionAnswerDTO dto);
        Task<List<QuestionAnswerDTO>> GetQuestionsByUserAsync(long userId);
        Task<List<QuestionAnswerDTO>> GetAllQuestionsAsync();
    }
}
