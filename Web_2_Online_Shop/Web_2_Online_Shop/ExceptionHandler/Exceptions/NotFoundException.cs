using System.Net;

namespace Web_2_Online_Shop.ExceptionHandler.Exceptions
{
    public class NotFoundException : CustomException
    {
        public NotFoundException(string message) : base(message, null, HttpStatusCode.NotFound)
        {
        }
    }
}
