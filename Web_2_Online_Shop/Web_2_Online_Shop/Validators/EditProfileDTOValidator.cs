using FluentValidation;
using Web_2_Online_Shop.DTOs;

namespace Web_2_Online_Shop.Validators
{
    public class EditProfileDTOValidator : AbstractValidator<EditUserDTO>
    {
        public EditProfileDTOValidator()
        {
            RuleFor(user => user.Username).Length(6, 15);
            RuleFor(user => user.Email).EmailAddress();
            RuleFor(user => user.NewPassword).MinimumLength(8)
                      .MaximumLength(30)
                      .Matches("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])")
                      .WithMessage("Password must contain at least one uppercase, lowercase letter, digit and special character");
            RuleFor(user => user.FirstName).MaximumLength(30);
            RuleFor(user => user.LastName).MaximumLength(30);
            RuleFor(user => user.BirthDate).LessThan(DateTime.Now.AddYears(-18)).WithMessage("User must have 18 years and above");
            RuleFor(user => user.Address).MaximumLength(40);
        }
    }
}
