using Web_2_Online_Shop.DTOs;

namespace Web_2_Online_Shop.Interfaces
{
    public interface IUserService
    {
        Task<UserDTO> GetMyProfile(int id);
        Task<UserDTO> EditMyProfile(int id, EditUserDTO newUserInfos);
        Task UploadMyImage(int id, IFormFile file);
        Task<byte[]> GetMyImage(int id);
        Task VerifySeller(UserVerifyDTO userVerify);
        public Task<List<UserDTO>> GetVerifiedSellers();
        public Task<List<UserDTO>> GetUnverifiedSellers();
    }
}
