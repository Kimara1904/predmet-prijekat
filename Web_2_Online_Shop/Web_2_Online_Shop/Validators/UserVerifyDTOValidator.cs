using FluentValidation;
using Web_2_Online_Shop.DTOs;

namespace Web_2_Online_Shop.Validators
{
    public class UserVerifyDTOValidator : AbstractValidator<UserVerifyDTO>
    {
        public UserVerifyDTOValidator()
        {
            RuleFor(u => u.Username).NotEmpty();
            RuleFor(u => u.Verified).NotEmpty()
                .Must(verify => verify.Equals("Accepted") || verify.Equals("Denied")).WithMessage("Verification state can be Accepted or Denied");
        }
    }
}
