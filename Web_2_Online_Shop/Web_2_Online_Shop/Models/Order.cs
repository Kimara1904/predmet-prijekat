namespace Web_2_Online_Shop.Models
{
    public class Order : EntityBase
    {
        public virtual List<OrderItem> Items { get; set; } = null!;
        public string Address { get; set; } = null!;
        public DateTime DeliveryTime { get; set; }
        public string? Comment { get; set; }
        public bool IsCanceled { get; set; }
        public double DeliveryPrice { get; set; }
        public virtual User? Buyer { get; set; }
        public int BuyerId { get; set; }
        public bool IsApproved { get; set; }
        public bool IsPayed { get; set; }
    }
}
