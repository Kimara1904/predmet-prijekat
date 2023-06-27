using Web_2_Online_Shop.DTOs;

namespace Web_2_Online_Shop.Interfaces
{
    public interface IArticleService
    {
        Task<List<ArticleDTO>> GetAll();
        Task<List<ArticleDTO>> GetAllMyArticles(int id);
        Task<ArticleDTO> GetById(int id);
        Task<ArticleDTO> CreateArticle(int id, CreateArticleDTO newArticle);
        Task DeleteArticle(int id, int sellerId);
        Task<ArticleDTO> UpdateArticle(int idProduct, int idSeller, UpdateArticleDTO newArticleInfo);
        Task UploadImage(int id, IFormFile file, int sellerId);
    }
}
