using System.Net;

namespace Web_2_Online_Shop.ExceptionHandler.Exceptions
{
    public class InternalServerException : CustomException
    {
        public InternalServerException(string message, List<string>? errorMessages = default)
            : base(message, errorMessages, HttpStatusCode.InternalServerError)
        {
        }
    }
}
