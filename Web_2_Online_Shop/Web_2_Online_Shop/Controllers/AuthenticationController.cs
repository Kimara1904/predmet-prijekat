using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web_2_Online_Shop.DTOs;
using Web_2_Online_Shop.Interfaces;

namespace Web_2_Online_Shop.Controllers
{
    [Route("api/authentication")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private IAuthenticationService _userService;
        public AuthenticationController(IAuthenticationService userService)
        {
            _userService = userService;

        }

        [HttpPost("google-authentication")]
        [AllowAnonymous]
        public async Task<ActionResult<TokenDTO>> GoogleAuthentication(GoogleAuthenticationDTO google)
        {
            string token = await _userService.AuthenticationByGoogle(google);
            return Ok(new TokenDTO { Token = token });
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult<TokenDTO>> Login(LoginDTO loginUser)
        {
            string token = await _userService.Login(loginUser.Email, loginUser.Password);
            return Ok(new TokenDTO { Token = token });
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<ActionResult<string>> Register(RegisterDTO userInfo)
        {
            await _userService.Register(userInfo);
            return Ok(string.Format("Successfully registered user with username: {0}", userInfo.Username));
        }
    }
}
