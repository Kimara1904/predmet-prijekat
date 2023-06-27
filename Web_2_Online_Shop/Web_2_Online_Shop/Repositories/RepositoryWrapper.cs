using Microsoft.EntityFrameworkCore;
using Web_2_Online_Shop.Interfaces;
using Web_2_Online_Shop.Models;

namespace Web_2_Online_Shop.Repositories
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private readonly DbContext _context;

        public IGenericRepository<User> _userRepository { get; } = null!;

        public IGenericRepository<Article> _articleRepository { get; } = null!;

        public IGenericRepository<OrderItem> _orderItemRepository { get; } = null!;

        public IGenericRepository<Order> _orderRepository { get; } = null!;

        public RepositoryWrapper(DbContext context, IGenericRepository<User> userRepository, IGenericRepository<Article> articleRepository,
            IGenericRepository<OrderItem> orderItemRepository, IGenericRepository<Order> orderRepository)
        {
            _context = context;
            _userRepository = userRepository;
            _articleRepository = articleRepository;
            _orderItemRepository = orderItemRepository;
            _orderRepository = orderRepository;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                _context.Dispose();
            }
        }

        public async Task SaveChanges()
        {
            await _context.SaveChangesAsync();
        }
    }
}
