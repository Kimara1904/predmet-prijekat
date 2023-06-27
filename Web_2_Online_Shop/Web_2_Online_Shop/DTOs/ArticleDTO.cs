namespace Web_2_Online_Shop.DTOs
{
    public class ArticleDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public double Price { get; set; }
        public int Amount { get; set; }
        public string? Description { get; set; }
        public byte[]? Image { get; set; }
    }
}
