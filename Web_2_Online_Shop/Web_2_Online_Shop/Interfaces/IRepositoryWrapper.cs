using Web_2_Online_Shop.Models;

namespace Web_2_Online_Shop.Interfaces
{
    public interface IRepositoryWrapper : IDisposable
    {
        IGenericRepository<User> _userRepository { get; }
        IGenericRepository<Article> _articleRepository { get; }
        IGenericRepository<OrderItem> _orderItemRepository { get; }
        IGenericRepository<Order> _orderRepository { get; }

        Task SaveChanges();
    }
}
