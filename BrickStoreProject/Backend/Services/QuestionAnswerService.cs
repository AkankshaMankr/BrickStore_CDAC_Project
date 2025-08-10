using BrickStoreBackend.DTO;
using BrickStoreBackend.Models;
using BrickStoreBackend.Repositories;

namespace BrickStoreBackend.Services
{
    public class QuestionAnswerService : IQuestionAnswerService
    {
        private readonly IQuestionAnswerRepository _qaRepo;
        private readonly IUserRepository _userRepo;

        public QuestionAnswerService(IQuestionAnswerRepository qaRepo, IUserRepository userRepo)
        {
            _qaRepo = qaRepo;
            _userRepo = userRepo;
        }

        public async Task<QuestionAnswerDTO> AskQuestionAsync(QuestionAnswerDTO dto)
        {
            var user = await _userRepo.GetUserByIdAsync(dto.UserId)
                ?? throw new Exception("User not found");

            var entity = new QuestionAnswer
            {
                UserId = user.Id,
                Question = dto.Question,
                IsAnswered = false
            };

            var saved = await _qaRepo.AddQuestionAsync(entity);
            return MapToDTO(saved);
        }

        public async Task<QuestionAnswerDTO> AnswerQuestionAsync(long id, QuestionAnswerDTO dto)
        {
            var question = await _qaRepo.GetByIdAsync(id)
                ?? throw new Exception("Question not found");

            var admin = await _userRepo.GetUserByIdAsync(dto.AdminId)
    ?? throw new Exception("Admin not found");


            if (admin.Role != "ROLE_ADMIN")
                throw new Exception("Only admins can answer");

            question.Answer = dto.Answer;
            question.IsAnswered = true;

            var updated = await _qaRepo.UpdateAsync(question);
            return MapToDTO(updated);
        }

        public async Task<List<QuestionAnswerDTO>> GetQuestionsByUserAsync(long userId)
        {
            var list = await _qaRepo.GetByUserIdAsync(userId);
            return list.Select(MapToDTO).ToList();
        }

        public async Task<List<QuestionAnswerDTO>> GetAllQuestionsAsync()
        {
            var list = await _qaRepo.GetAllAsync();
            return list.Select(MapToDTO).ToList();
        }

        private QuestionAnswerDTO MapToDTO(QuestionAnswer qa)
        {
            return new QuestionAnswerDTO
            {
                Id = qa.Id,
                UserId = qa.UserId,
                Question = qa.Question,
                Answer = qa.Answer,
                IsAnswered = qa.IsAnswered
            };
        }
    }

}
