using FluentValidation;
using Web_2_Online_Shop.DTOs;

namespace Web_2_Online_Shop.Validators
{
    public class CreateArticleDTOValidator : AbstractValidator<CreateArticleDTO>
    {
        public CreateArticleDTOValidator()
        {
            RuleFor(a => a.Name).NotEmpty().MaximumLength(20);
            RuleFor(a => a.Price).NotEmpty().GreaterThan(0);
            RuleFor(a => a.Amount).NotEmpty().GreaterThan(0);
            RuleFor(a => a.Description).NotEmpty();
        }
    }
}
