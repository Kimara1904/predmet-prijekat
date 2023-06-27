using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Web_2_Online_Shop.Models;

namespace Web_2_Online_Shop.Infrastructure.Configurations
{
    public class ArticleConfiguration : IEntityTypeConfiguration<Article>
    {
        public void Configure(EntityTypeBuilder<Article> builder)
        {
            builder.HasKey(a => a.Id);
            builder.Property(a => a.Name).IsRequired().HasMaxLength(20);
            builder.Property(a => a.Price).IsRequired();
            builder.Property(a => a.Amount).IsRequired();
            builder.HasOne(a => a.Seller).WithMany(s => s.Articles).HasForeignKey(a => a.SellerId).OnDelete(DeleteBehavior.Restrict);
        }
    }
}
