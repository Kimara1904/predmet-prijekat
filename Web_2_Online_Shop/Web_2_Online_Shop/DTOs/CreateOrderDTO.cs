namespace Web_2_Online_Shop.DTOs
{
    public class CreateOrderDTO
    {
        public List<CreateItemDTO> Items { get; set; } = null!;
        public string Address { get; set; } = null!;
        public string? Comment { get; set; }
        public string PayingMethod { get; set; } = null!;
        public bool IsPaying { get; set; }
    }
}
