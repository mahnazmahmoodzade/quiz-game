namespace AustrianAssessment.Models;

public class GameSession
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    
    public ICollection<Question> Questions { get; set; }= new List<Question>();
    
}