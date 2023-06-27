using FluentValidation;
using Web_2_Online_Shop.DTOs;

namespace Web_2_Online_Shop.Validators
{
    public class CreateItemDTOValidator : AbstractValidator<CreateItemDTO>
    {
        public CreateItemDTOValidator()
        {
            RuleFor(i => i.ArticleId).NotEmpty().GreaterThan(0);
            RuleFor(i => i.Amount).NotEmpty().GreaterThan(0);
        }
    }
}
