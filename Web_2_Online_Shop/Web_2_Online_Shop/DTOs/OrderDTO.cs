namespace Web_2_Online_Shop.DTOs
{
    public class OrderDTO
    {
        public int Id { get; set; }
        public string BuyerUsername { get; set; } = null!;
        public List<ItemDTO> Items { get; set; } = null!;
        public double ItemPrice { get; set; }
        public double DeliveryPrice { get; set; }
        public string Address { get; set; } = null!;
        public string? Comment { get; set; }
        public DateTime DeliveryTime { get; set; }
        public bool IsCanceled { get; set; }
        public bool IsApproved { get; set; }
        public bool IsPayed { get; set; }
    }
}
