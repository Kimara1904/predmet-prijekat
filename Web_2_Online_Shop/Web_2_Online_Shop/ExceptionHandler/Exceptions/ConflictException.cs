using System.Net;

namespace Web_2_Online_Shop.ExceptionHandler.Exceptions
{
    public class ConflictException : CustomException
    {
        public ConflictException(string message) : base(message, null, HttpStatusCode.Conflict)
        {
        }
    }
}
