using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web_2_Online_Shop.DTOs;
using Web_2_Online_Shop.Interfaces;

namespace Web_2_Online_Shop.Controllers
{
    [Route("api/articles")]
    [ApiController]
    public class ArticlesController : ControllerBase
    {
        private readonly IArticleService _articleService;
        public ArticlesController(IArticleService articleService)
        {
            _articleService = articleService;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<List<ArticleDTO>>> GetAll()
        {
            return await _articleService.GetAll();
        }

        [Authorize]
        [HttpGet("{id:int}")]
        public async Task<ActionResult<ArticleDTO>> GetById(int id)
        {
            return await _articleService.GetById(id);
        }

        [Authorize(Roles = "Seller", Policy = "VerifiedUserOnly")]
        [HttpGet("all-sellers")]
        public async Task<ActionResult<List<ArticleDTO>>> GetAllMy()
        {
            var id = int.Parse(User.Claims.First(c => c.Type == "UserId").Value);
            return await _articleService.GetAllMyArticles(id);
        }


        [Authorize(Roles = "Seller", Policy = "VerifiedUserOnly")]
        [HttpPost]
        public async Task<ActionResult<ArticleDTO>> Create([FromForm] CreateArticleDTO newArticle)
        {
            var id = int.Parse(User.Claims.First(c => c.Type == "UserId").Value);
            var ret = await _articleService.CreateArticle(id, newArticle);

            return Ok(ret);
        }

        [Authorize(Roles = "Seller", Policy = "VerifiedUserOnly")]
        [HttpPut("{id:int}/image")]
        public async Task<ActionResult<string>> UploadImage(int id, IFormFile file)
        {
            var sellerId = int.Parse(User.Claims.First(c => c.Type == "UserId").Value);
            await _articleService.UploadImage(id, file, sellerId);

            return Ok(string.Format("Image successfully uploaded for article with id: {0}", id));
        }

        [Authorize(Roles = "Seller", Policy = "VerifiedUserOnly")]
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var sellerId = int.Parse(User.Claims.First(c => c.Type == "UserId").Value);
            await _articleService.DeleteArticle(id, sellerId);

            return NoContent();
        }

        [Authorize(Roles = "Seller", Policy = "VerifiedUserOnly")]
        [HttpPatch("{id:int}")]
        public async Task<ActionResult> Update(int id, [FromForm] UpdateArticleDTO updateArticle)
        {
            var sellerId = int.Parse(User.Claims.First(c => c.Type == "UserId").Value);
            var result = await _articleService.UpdateArticle(id, sellerId, updateArticle);

            return Ok(result);
        }
    }
}
