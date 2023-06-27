using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web_2_Online_Shop.DTOs;
using Web_2_Online_Shop.Interfaces;

namespace Web_2_Online_Shop.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult<List<OrderDTO>>> GetAll()
        {
            var ret = await _orderService.GetAll();
            return Ok(ret);
        }

        [Authorize(Roles = "Customer")]
        [HttpGet("customers-orders")]
        public async Task<ActionResult<List<MyOrderDTO>>> GetAllMy()
        {
            var id = int.Parse(User.Claims.First(c => c.Type == "UserId").Value);
            var ret = await _orderService.GetAllMy(id);

            return Ok(ret);
        }

        [Authorize(Roles = "Customer")]
        [HttpGet("delivery-price")]
        public async Task<ActionResult<double>> GetDeliveryPrice([FromQuery] List<int> items)
        {
            var price = await _orderService.GetDeliveryPrice(items);
            return Ok(price);
        }

        [Authorize(Roles = "Seller", Policy = "VerifiedUserOnly")]
        [HttpGet("sellers-delivered")]
        public async Task<ActionResult<List<OrderDTO>>> GetAllDelivered()
        {
            var id = int.Parse(User.Claims.First(c => c.Type == "UserId").Value);
            var ret = await _orderService.GetAllDeliveredForSeller(id);

            return Ok(ret);
        }

        [Authorize(Roles = "Seller", Policy = "VerifiedUserOnly")]
        [HttpGet("sellers-in-delivery")]
        public async Task<ActionResult<List<OrderDTO>>> GetAllInDelivery()
        {
            var id = int.Parse(User.Claims.First(c => c.Type == "UserId").Value);
            var ret = await _orderService.GetAllInDeliveryForSeller(id);

            return Ok(ret);
        }

        [Authorize(Roles = "Seller", Policy = "VerifiedUserOnly")]
        [HttpGet("sellers-unapproved")]
        public async Task<ActionResult<List<OrderDTO>>> GetAllUnaproved()
        {
            var id = int.Parse(User.Claims.First(c => c.Type == "UserId").Value);
            var ret = await _orderService.GetAllUnapprovedForSeller(id);

            return Ok(ret);
        }

        [Authorize(Roles = "Customer")]
        [HttpPost]
        public async Task<ActionResult<MyOrderDTO>> Create(CreateOrderDTO orderDTO)
        {
            var id = int.Parse(User.Claims.First(c => c.Type == "UserId").Value);
            var ret = await _orderService.Create(orderDTO, id);

            return Ok(ret);
        }

        [Authorize(Roles = "Customer")]
        [HttpPut("cancel/{id:int}")]
        public async Task<ActionResult<string>> Cancel(int id)
        {
            var buyerId = int.Parse(User.Claims.First(c => c.Type == "UserId").Value);
            await _orderService.Cancel(id, buyerId);

            return Ok(string.Format("Successfully cancled order with id: {0}", id));
        }

        [Authorize(Roles = "Customer")]
        [HttpPut("pay/{id:int}")]
        public async Task<ActionResult<MyOrderDTO>> Pay(int id)
        {
            var buyerId = int.Parse(User.Claims.First(c => c.Type == "UserId").Value);
            var ret = await _orderService.Pay(id, buyerId);

            return Ok(ret);
        }

        [Authorize(Roles = "Seller", Policy = "VerifiedUserOnly")]
        [HttpPut("aprove/{id:int}")]
        public async Task<ActionResult<MyOrderDTO>> Aprove(int id)
        {
            var ret = await _orderService.Aprove(id);

            return Ok(ret);
        }
    }
}
