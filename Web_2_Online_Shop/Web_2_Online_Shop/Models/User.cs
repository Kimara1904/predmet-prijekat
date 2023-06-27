using Web_2_Online_Shop.Enums;

namespace Web_2_Online_Shop.Models
{
    public class User : EntityBase
    {
        public string Username { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public DateTime BirthDate { get; set; }
        public string? Address { get; set; }
        public UserRoles Role { get; set; }
        public byte[]? Image { get; set; }
        public VerifiedStates Verified { get; set; }
        public virtual List<Order>? Orders { get; set; }
        public virtual List<Article>? Articles { get; set; }

    }
}
