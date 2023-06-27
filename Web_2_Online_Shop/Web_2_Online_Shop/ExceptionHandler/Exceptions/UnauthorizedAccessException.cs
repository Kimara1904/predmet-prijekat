using System.Net;

namespace Web_2_Online_Shop.ExceptionHandler.Exceptions
{
    public class UnauthorizedAccessException : CustomException
    {
        public UnauthorizedAccessException(string message) : base(message, null, HttpStatusCode.Unauthorized)
        {
        }
    }
}
