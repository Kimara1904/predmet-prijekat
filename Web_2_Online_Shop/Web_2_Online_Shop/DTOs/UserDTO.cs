namespace Web_2_Online_Shop.DTOs
{
    public class UserDTO
    {
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public DateTime BirthDate { get; set; }
        public string? Address { get; set; }
        public byte[]? Image { get; set; }
    }
}
