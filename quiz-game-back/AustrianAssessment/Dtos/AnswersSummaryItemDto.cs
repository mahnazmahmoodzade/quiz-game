namespace AustrianAssessment.Dtos;

public class AnswersSummaryItemDto
{
    public string Question { get; set; }
    public string CorrectAnswer { get; set; }
    public string SelectedAnswer { get; set; }
    public bool IsCorrect { get; set; }
}