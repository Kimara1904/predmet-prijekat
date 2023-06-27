using System.Net;

namespace Web_2_Online_Shop.ExceptionHandler.Exceptions
{
    public class BadRequestException : CustomException
    {
        public BadRequestException(string message) : base(message, null, HttpStatusCode.BadRequest)
        {
        }
    }
}
