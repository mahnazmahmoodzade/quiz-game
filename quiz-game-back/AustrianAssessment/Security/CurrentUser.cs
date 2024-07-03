namespace AustrianAssessment.Security;

public class CurrentUser
{
    public string AccessCode { get; set; }
    public string SessionId { get; set; }
    public List<int> Scope { get; set; }
}