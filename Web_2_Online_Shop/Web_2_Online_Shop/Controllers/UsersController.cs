using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web_2_Online_Shop.DTOs;
using Web_2_Online_Shop.Interfaces;

namespace Web_2_Online_Shop.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [Authorize]
        [HttpGet("my-profile")]
        public async Task<ActionResult<UserDTO>> GetMyProfile()
        {
            var id = int.Parse(User.Claims.First(c => c.Type == "UserId").Value);
            var ret = await _userService.GetMyProfile(id);

            return Ok(ret);
        }

        [Authorize]
        [HttpGet("image")]
        public async Task<ActionResult> GetMyImage()
        {
            var id = int.Parse(User.Claims.First(c => c.Type == "UserId").Value);
            byte[] image = await _userService.GetMyImage(id);

            return File(image, "image/*");
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("unverified")]
        public async Task<ActionResult<List<UserDTO>>> GetUnverifiedSellers()
        {
            var result = await _userService.GetUnverifiedSellers();
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("verified")]
        public async Task<ActionResult<List<UserDTO>>> GetVerifiedSellers()
        {
            var result = await _userService.GetVerifiedSellers();
            return Ok(result);
        }

        [Authorize]
        [HttpPut("image")]
        public async Task<ActionResult<string>> UploadMyImage(IFormFile file)
        {
            var id = int.Parse(User.Claims.First(c => c.Type == "UserId").Value);
            await _userService.UploadMyImage(id, file);

            return Ok("Image successfully uploaded");
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("verify")]
        public async Task<ActionResult<string>> VerifyUser(UserVerifyDTO userVerify)
        {
            await _userService.VerifySeller(userVerify);
            return Ok(string.Format("Successfully verified seller with id: {0}", userVerify.Username));
        }

        [Authorize]
        [HttpPatch]
        public async Task<ActionResult<UserDTO>> EditMyProfile([FromForm] EditUserDTO newUserInfos)
        {
            var id = int.Parse(User.Claims.First(c => c.Type == "UserId").Value);
            var result = await _userService.EditMyProfile(id, newUserInfos);

            return Ok(result);
        }
    }
}
