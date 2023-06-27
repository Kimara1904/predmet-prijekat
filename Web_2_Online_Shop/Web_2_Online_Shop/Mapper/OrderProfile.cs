using AutoMapper;
using Web_2_Online_Shop.DTOs;
using Web_2_Online_Shop.Models;

namespace Web_2_Online_Shop.Mapper
{
    public class OrderProfile : Profile
    {
        public OrderProfile()
        {
            CreateMap<CreateOrderDTO, Order>();
            CreateMap<Order, OrderDTO>().ForMember(dest => dest.BuyerUsername, opt => opt.MapFrom(src => src.Buyer.Username));
            CreateMap<Order, MyOrderDTO>();
        }
    }
}
