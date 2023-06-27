using Web_2_Online_Shop.Models;

namespace Web_2_Online_Shop.Interfaces
{
    public interface IGenericRepository<T> where T : EntityBase
    {
        Task<IQueryable<T>> GetAllAsync();
        Task<T?> FindAsync(int id);
        Task Insert(T entity);
        void Update(T entity);
        void Delete(T entity);
    }
}
