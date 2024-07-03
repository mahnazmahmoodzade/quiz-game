namespace AustrianAssessment.Dtos;

public class QuestionDto
{
    public string Id { get; set; } = Guid.NewGuid().ToString();

    public string Text { get; set; }

    public ICollection<string> Options { get; set; }
}