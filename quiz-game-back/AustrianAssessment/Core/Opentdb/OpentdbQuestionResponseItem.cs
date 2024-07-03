using System.Text.Json.Serialization;

namespace AustrianAssessment.Core.Opentdb;

public class OpentdbQuestionResponseItem
{
    public string Type { get; set; }
    public string Difficulty { get; set; }
    public string Category { get; set; }
    public string Question { get; set; }

    [JsonPropertyName("correct_answer")] public string CorrectAnswer { get; set; }

    [JsonPropertyName("incorrect_answers")] public ICollection<string> IncorrectAnswers { get; set; } = new List<string>();
}