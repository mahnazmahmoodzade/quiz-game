namespace AustrianAssessment.Security;

public interface ITokenProvider
{
    Task<string> GenerateJwtToken(string accessCode);
}