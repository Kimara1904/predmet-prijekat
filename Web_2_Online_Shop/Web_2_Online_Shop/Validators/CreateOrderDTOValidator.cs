using FluentValidation;
using Web_2_Online_Shop.DTOs;

namespace Web_2_Online_Shop.Validators
{
    public class CreateOrderDTOValidator : AbstractValidator<CreateOrderDTO>
    {
        public CreateOrderDTOValidator()
        {
            RuleFor(o => o.Items).NotEmpty();
            RuleFor(o => o.Address).NotEmpty().MaximumLength(40);
            RuleFor(o => o.PayingMethod).NotEmpty().Must(pm => pm.Equals("Card") || pm.Equals("Cash"))
                .WithMessage("Paying method must be by: Card or Cash.");
        }
    }
}
