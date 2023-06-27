using Web_2_Online_Shop.DTOs;

namespace Web_2_Online_Shop.Interfaces
{
    public interface IAuthenticationService
    {
        Task<string> Login(string email, string password);

        Task Register(RegisterDTO userInfo);

        Task<string> AuthenticationByGoogle(GoogleAuthenticationDTO google);
    }
}
