using AutoMapper;
using Web_2_Online_Shop.DTOs;
using Web_2_Online_Shop.Models;

namespace Web_2_Online_Shop.Mapper
{
    public class ArticleProfile : Profile
    {
        public ArticleProfile()
        {
            CreateMap<Article, ArticleDTO>();
            CreateMap<CreateArticleDTO, Article>();
            CreateMap<UpdateArticleDTO, Article>()
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) =>
                {
                    if (srcMember == null)
                        return false;

                    if (srcMember is string)
                        return !string.IsNullOrEmpty((string)srcMember);

                    if (srcMember is int)
                        return (int)srcMember > 0;

                    return true;
                }));
        }
    }
}
