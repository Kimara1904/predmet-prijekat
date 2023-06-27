using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Web_2_Online_Shop.DTOs;
using Web_2_Online_Shop.ExceptionHandler.Exceptions;
using Web_2_Online_Shop.Interfaces;
using Web_2_Online_Shop.Models;

namespace Web_2_Online_Shop.Services
{
    public class ArticleService : IArticleService
    {
        private readonly IRepositoryWrapper _repository;
        private readonly IMapper _mapper;

        public ArticleService(IRepositoryWrapper repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<ArticleDTO> CreateArticle(int id, CreateArticleDTO newArticle)
        {
            var article = _mapper.Map<Article>(newArticle);
            article.SellerId = id;

            if (newArticle.ImageFile != null)
            {
                using (var ms = new MemoryStream())
                {
                    newArticle.ImageFile.CopyTo(ms);
                    var fileBytes = ms.ToArray();

                    article.Image = fileBytes;
                }
            }

            await _repository._articleRepository.Insert(article);
            await _repository.SaveChanges();

            return _mapper.Map<ArticleDTO>(article);
        }

        public async Task DeleteArticle(int id, int sellerId)
        {
            var articles = await _repository._articleRepository.GetAllAsync();
            var article = articles.Where(a => a.Id == id && a.SellerId == sellerId).FirstOrDefault();

            if (article == null)
            {
                return;
            }

            _repository._articleRepository.Delete(article);
            await _repository.SaveChanges();
        }

        public async Task<List<ArticleDTO>> GetAll()
        {
            var articlesQuery = await _repository._articleRepository.GetAllAsync();
            var articles = articlesQuery.Include(a => a.Seller).ToList();

            var seller = articles[0].Seller;

            var ret = _mapper.Map<List<Article>, List<ArticleDTO>>(articles);
            return ret;
        }

        public async Task<List<ArticleDTO>> GetAllMyArticles(int id)
        {
            var articlesQuery = await _repository._articleRepository.GetAllAsync();
            var articles = articlesQuery.Where(a => a.SellerId == id).ToList();

            var ret = _mapper.Map<List<Article>, List<ArticleDTO>>(articles);
            return ret;
        }

        public async Task<ArticleDTO> GetById(int id)
        {
            var article = await _repository._articleRepository.FindAsync(id) ?? throw new NotFoundException(string.Format("Article with id: {0} doesn't exist.", id));
            return _mapper.Map<ArticleDTO>(article);
        }

        public async Task<ArticleDTO> UpdateArticle(int idProduct, int idSeller, UpdateArticleDTO newArticleInfo)
        {
            var articles = await _repository._articleRepository.GetAllAsync();
            var article = articles.Where(a => a.Id == idProduct && a.SellerId == idSeller).FirstOrDefault() ??
                throw new NotFoundException(string.Format("Article with id: {0} doesn't exist", idProduct));

            _mapper.Map<UpdateArticleDTO, Article>(newArticleInfo, article);

            if (newArticleInfo.ImageFile != null)
            {
                using (var ms = new MemoryStream())
                {
                    newArticleInfo.ImageFile.CopyTo(ms);
                    var fileBytes = ms.ToArray();

                    article.Image = fileBytes;
                }
            }

            _repository._articleRepository.Update(article);
            await _repository.SaveChanges();

            return _mapper.Map<ArticleDTO>(article);
        }

        public async Task UploadImage(int id, IFormFile file, int sellerId)
        {
            var articleQuery = await _repository._articleRepository.GetAllAsync();
            var article = articleQuery.Where(a => a.Id == id && a.SellerId == sellerId).FirstOrDefault() ?? throw new NotFoundException(string.Format("Article with id: {0} doesn't exist.", id));

            using (var ms = new MemoryStream())
            {
                file.CopyTo(ms);
                var fileBytes = ms.ToArray();

                article.Image = fileBytes;
                _repository._articleRepository.Update(article);
            }

            await _repository.SaveChanges();
        }
    }
}
