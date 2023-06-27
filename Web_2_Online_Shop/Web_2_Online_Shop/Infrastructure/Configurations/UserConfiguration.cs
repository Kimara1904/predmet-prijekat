using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Web_2_Online_Shop.Enums;
using Web_2_Online_Shop.Models;

namespace Web_2_Online_Shop.Infrastructure.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(u => u.Id);
            builder.Property(u => u.Username).HasMaxLength(15);
            builder.HasIndex(u => u.Username).IsUnique();
            builder.Property(u => u.Email).HasMaxLength(25);
            builder.HasIndex(u => u.Email).IsUnique();
            builder.Property(u => u.Password).IsRequired();
            builder.Property(u => u.FirstName).HasMaxLength(30);
            builder.Property(u => u.LastName).HasMaxLength(30);
            builder.Property(u => u.Address).HasMaxLength(40);
            builder.Property(u => u.Role).HasConversion(new EnumToStringConverter<UserRoles>());
            builder.Property(u => u.Verified).HasConversion(new EnumToStringConverter<VerifiedStates>());
            builder.HasData(new User
            {
                Id = 1,
                Email = "admin@admin.com",
                Username = "Admin",
                Password = new PasswordHasher<User>().HashPassword(null, "Adm1n!"),
                Role = UserRoles.Admin,
                Verified = VerifiedStates.Accepted
            });
        }
    }
}
