using BrickStoreBackend.DTO;
using BrickStoreBackend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BrickStoreBackend.Controllers
{
    [Route("questions")]
    [ApiController]
    public class QuestionAnswerController : ControllerBase
    {
        private readonly IQuestionAnswerService _qaService;

        public QuestionAnswerController(IQuestionAnswerService qaService)
        {
            _qaService = qaService;
        }

        [Authorize]
        [HttpPost("ask")]
        public async Task<IActionResult> AskQuestion([FromBody] QuestionAnswerDTO dto)
        {
            try
            {
                var result = await _qaService.AskQuestionAsync(dto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest("Error: " + ex.Message);
            }
        }

        [Authorize]
        [HttpPost("admin/answer/{id}")]
        public async Task<IActionResult> AnswerQuestion(long id, [FromBody] QuestionAnswerDTO dto)
        {
            try
            {
                var result = await _qaService.AnswerQuestionAsync(id, dto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest("Error: " + ex.Message);
            }
        }

        [Authorize]
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserQuestions(long userId)
        {
            var result = await _qaService.GetQuestionsByUserAsync(userId);
            return Ok(result);
        }

        [Authorize]
        [HttpGet("admin/getAllQuestions")]
        public async Task<IActionResult> GetAllQuestions()
        {
            var result = await _qaService.GetAllQuestionsAsync();
            return Ok(result);
        }
    }

}
