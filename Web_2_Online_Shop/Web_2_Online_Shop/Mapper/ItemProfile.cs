using AutoMapper;
using Web_2_Online_Shop.DTOs;
using Web_2_Online_Shop.Models;

namespace Web_2_Online_Shop.Mapper
{
    public class ItemProfile : Profile
    {
        public ItemProfile()
        {
            CreateMap<CreateItemDTO, OrderItem>();
            CreateMap<OrderItem, ItemDTO>();
        }
    }
}
