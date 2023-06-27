using AutoMapper;
using Web_2_Online_Shop.DTOs;
using Web_2_Online_Shop.Enums;
using Web_2_Online_Shop.Models;

namespace Web_2_Online_Shop.Mapper
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<RegisterDTO, User>()
                .ForMember(dest => dest.Role, opt => opt.MapFrom(src => (UserRoles)Enum.Parse(typeof(UserRoles), src.Role)));
            CreateMap<EditUserDTO, User>()
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) =>
                {
                    if (srcMember == null)
                        return false;

                    if (srcMember is string)
                        return !string.IsNullOrEmpty((string)srcMember);

                    if (srcMember is DateTime)
                        return (DateTime)srcMember != DateTime.MinValue;

                    return true;
                }));
            CreateMap<User, UserDTO>();
        }
    }
}
