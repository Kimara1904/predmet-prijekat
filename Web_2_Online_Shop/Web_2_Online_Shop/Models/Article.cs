namespace Web_2_Online_Shop.Models
{
    public class Article : EntityBase
    {
        public string Name { get; set; } = null!;
        public double Price { get; set; }
        public int Amount { get; set; }
        public string? Description { get; set; }
        public byte[]? Image { get; set; }
        public virtual User? Seller { get; set; }
        public int SellerId { get; set; }
    }
}
