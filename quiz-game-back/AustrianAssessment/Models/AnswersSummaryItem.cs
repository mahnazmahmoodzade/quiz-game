namespace AustrianAssessment.Models;

public class AnswersSummaryItem
{
    public string Question { get; set; }
    public string CorrectAnswer { get; set; }
    public string SelectedAnswer { get; set; }
    public bool IsCorrect { get; set; }
}