namespace BrickStoreBackend.DTO
{
    public class QuestionAnswerDTO
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public string? Question { get; set; }
        public string? Answer { get; set; }
        public bool IsAnswered { get; set; }
        public long AdminId { get; set; }
    }
}
