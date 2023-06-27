namespace Web_2_Online_Shop.DTOs
{
    public class UpdateArticleDTO
    {
        public string? Name { get; set; }
        public double Price { get; set; }
        public int Amount { get; set; }
        public string? Description { get; set; }
        public IFormFile? ImageFile { get; set; }
    }
}
