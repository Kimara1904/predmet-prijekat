using FluentValidation;
using Web_2_Online_Shop.DTOs;

namespace Web_2_Online_Shop.Validators
{
    public class GoogleAuthenticationDTOValidator : AbstractValidator<GoogleAuthenticationDTO>
    {
        public GoogleAuthenticationDTOValidator()
        {
            RuleFor(dto => dto.Token).NotEmpty();
        }
    }
}
