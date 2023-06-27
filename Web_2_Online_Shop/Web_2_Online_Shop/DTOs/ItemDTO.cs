namespace Web_2_Online_Shop.DTOs
{
    public class ItemDTO
    {
        public int Id { get; set; }
        public int Amount { get; set; }
        public string ArticleName { get; set; } = null!;
        public double ArticlePrice { get; set; }
    }
}
