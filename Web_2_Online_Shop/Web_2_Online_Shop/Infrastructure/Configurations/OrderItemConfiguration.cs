using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Web_2_Online_Shop.Models;

namespace Web_2_Online_Shop.Infrastructure.Configurations
{
    public class OrderItemConfiguration : IEntityTypeConfiguration<OrderItem>
    {
        public void Configure(EntityTypeBuilder<OrderItem> builder)
        {
            builder.HasKey(oi => oi.Id);
            builder.Property(oi => oi.ArticleId).IsRequired();
            builder.HasOne(oi => oi.Order).WithMany(o => o.Items).HasForeignKey(oi => oi.OrderId).OnDelete(DeleteBehavior.Restrict);
            builder.Property(oi => oi.ArticleName).IsRequired().HasMaxLength(20);
            builder.Property(oi => oi.ArticlePrice).IsRequired();
            builder.Property(oi => oi.Amount).IsRequired();
        }
    }
}
