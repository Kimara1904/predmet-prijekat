namespace Web_2_Online_Shop.DTOs
{
    public class CreateArticleDTO
    {
        public string Name { get; set; } = null!;
        public double Price { get; set; }
        public int Amount { get; set; }
        public string Description { get; set; } = null!;
        public IFormFile? ImageFile { get; set; }
    }
}
