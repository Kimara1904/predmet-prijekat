using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Web_2_Online_Shop.DTOs;
using Web_2_Online_Shop.Enums;
using Web_2_Online_Shop.ExceptionHandler.Exceptions;
using Web_2_Online_Shop.Interfaces;
using Web_2_Online_Shop.Models;

namespace Web_2_Online_Shop.Services
{
    public class UserService : IUserService
    {
        private readonly IRepositoryWrapper _repository;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IMapper _mapper;
        private readonly IMailService _mailService;

        public UserService(IRepositoryWrapper repository, IPasswordHasher<User> passwordHasher, IMapper mapper, IMailService mailService)
        {
            _repository = repository;
            _passwordHasher = passwordHasher;
            _mapper = mapper;
            _mailService = mailService;
        }

        public async Task<UserDTO> EditMyProfile(int id, EditUserDTO newUserInfos)
        {
            var users = await _repository._userRepository.GetAllAsync();
            var user = users.Where(u => u.Id == id).FirstOrDefault() ?? throw new NotFoundException("User with this token doesn't exist.");

            if (newUserInfos.Email != null && newUserInfos.Email != user.Email)
            {
                var emailUser = users.Where(u => u.Email == newUserInfos.Email).FirstOrDefault();
                if (emailUser != null)
                {
                    throw new ConflictException(string.Format("User with email {0} already exists.", newUserInfos.Email));
                }
            }

            if (newUserInfos.Username != null && newUserInfos.Username != user.Username)
            {
                var usernameUser = users.Where(u => u.Username == newUserInfos.Username).FirstOrDefault();
                if (usernameUser != null)
                {
                    throw new ConflictException(string.Format("User with username {0} already exists.", newUserInfos.Username));
                }
            }

            _mapper.Map(newUserInfos, user);

            if (newUserInfos.NewPassword != null)
            {
                if (newUserInfos.OldPassword == null)
                    throw new BadRequestException("If you want to change password old password is required.");

                if (_passwordHasher.VerifyHashedPassword(user, user.Password, newUserInfos.OldPassword) != PasswordVerificationResult.Success)
                    throw new ConflictException("Wrong old password.");

                var result = _passwordHasher.HashPassword(user, newUserInfos.NewPassword);
                user.Password = result;
            }

            if (newUserInfos.FileImage != null)
            {
                using (var ms = new MemoryStream())
                {
                    newUserInfos.FileImage.CopyTo(ms);
                    var fileBytes = ms.ToArray();

                    user.Image = fileBytes;
                }
            }

            _repository._userRepository.Update(user);
            await _repository.SaveChanges();

            return _mapper.Map<UserDTO>(user);
        }

        public async Task<byte[]> GetMyImage(int id)
        {
            var user = await _repository._userRepository.FindAsync(id) ?? throw new NotFoundException("User with this token doesn't exist.");
            if (user.Image == null)
            {
                throw new NotFoundException("This user doesn't have image.");
            }
            return user.Image;
        }

        public async Task<UserDTO> GetMyProfile(int id)
        {
            var user = await _repository._userRepository.FindAsync(id) ?? throw new NotFoundException("User with this token doesn't exist.");
            return _mapper.Map<UserDTO>(user);
        }

        public async Task<List<UserDTO>> GetUnverifiedSellers()
        {
            var users = await _repository._userRepository.GetAllAsync();
            var unverifiedSellers = users.Where(u => u.Role == Enums.UserRoles.Seller && u.Verified == Enums.VerifiedStates.Wait).ToList();

            return _mapper.Map<List<User>, List<UserDTO>>(unverifiedSellers);
        }

        public async Task<List<UserDTO>> GetVerifiedSellers()
        {
            var users = await _repository._userRepository.GetAllAsync();
            var unverifiedSellers = users.Where(u => u.Role == Enums.UserRoles.Seller && u.Verified == Enums.VerifiedStates.Accepted).ToList();

            return _mapper.Map<List<User>, List<UserDTO>>(unverifiedSellers);
        }

        public async Task UploadMyImage(int id, IFormFile file)
        {
            var user = await _repository._userRepository.FindAsync(id) ?? throw new NotFoundException("User with this token doesn't exist.");
            using (var ms = new MemoryStream())
            {
                file.CopyTo(ms);
                var fileBytes = ms.ToArray();

                user.Image = fileBytes;
                _repository._userRepository.Update(user);
            }

            await _repository.SaveChanges();
        }

        public async Task VerifySeller(UserVerifyDTO userVerify)
        {
            var userQuery = await _repository._userRepository.GetAllAsync();
            var user = userQuery.Where(u => u.Username == userVerify.Username).FirstOrDefault()
                ?? throw new NotFoundException(string.Format("User with username: {0} doesn't exist.", userVerify.Username));

            user.Verified = (VerifiedStates)Enum.Parse(typeof(VerifiedStates), userVerify.Verified);
            string subject = user.Verified == VerifiedStates.Accepted
                ? "Verification - Account Approved"
                : "Verification - Account Denied";

            string message = user.Verified == VerifiedStates.Accepted
                ? "Your account is approved. You can now start selling."
                : "Your account is denied. You cannot start selling.";

            await _mailService.SendEmail(subject, message, user.Email);

            _repository._userRepository.Update(user);
            await _repository.SaveChanges();
        }
    }
}
