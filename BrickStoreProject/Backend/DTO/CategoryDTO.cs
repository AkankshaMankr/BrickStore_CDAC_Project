namespace BrickStoreBackend.DTO
{
    public class CategoryDTO
    {
        public long CategoryId { get; set; }
        public string? Name { get; set; } = string.Empty;
        public byte[]? Image { get; set; }
    }
}
