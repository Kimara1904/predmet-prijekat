namespace Web_2_Online_Shop.Interfaces
{
    public interface IMailService
    {
        Task SendEmail(string header, string body, string to);
    }
}
