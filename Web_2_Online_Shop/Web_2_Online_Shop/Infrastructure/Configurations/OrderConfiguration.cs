using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Web_2_Online_Shop.Models;

namespace Web_2_Online_Shop.Infrastructure.Configurations
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.HasKey(o => o.Id);
            builder.Property(o => o.Address).HasMaxLength(40).IsRequired();
            builder.Property(o => o.DeliveryTime).IsRequired();
            builder.Property(o => o.IsCanceled).HasDefaultValue(false);
            builder.Property(o => o.DeliveryPrice).IsRequired();
            builder.HasOne(o => o.Buyer).WithMany(b => b.Orders).HasForeignKey(o => o.BuyerId).OnDelete(DeleteBehavior.Restrict);
        }
    }
}
