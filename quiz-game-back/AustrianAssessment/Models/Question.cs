namespace AustrianAssessment.Models;

public class Question
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    
    public string Text { get; set; }
    
    public ICollection<string> Options { get; set; }
    
    public string CorrectAnswer { get; set; }
    
    public string SelectedAnswer { get; set; }
    
    
    public bool IsAnsweredCorrectly => SelectedAnswer == CorrectAnswer;
}