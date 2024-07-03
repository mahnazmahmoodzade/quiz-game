namespace AustrianAssessment.Models;

public class AppConfig
{
    public int QuestionCount { get; set; }
    public string TriviaApi { get; set; }
    public string SecretKey { get; set; }
    public string ForbiddenCategory { get; set; }
    public string AllowedOrigin { get; set; }

    public static AppConfig Instance { get; set; }
}