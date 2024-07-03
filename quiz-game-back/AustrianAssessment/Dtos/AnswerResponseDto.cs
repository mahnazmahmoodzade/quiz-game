namespace AustrianAssessment.Dtos;

public class AnswerResponseDto
{
    public bool Correct { get; set; }
    public int CurrentScore { get; set; }
    public int RemainingQuestions { get; set; }
    public int TotalQuestions { get; set; }

}