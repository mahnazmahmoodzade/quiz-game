using System.Text.Json.Serialization;
using AustrianAssessment.Models;

namespace AustrianAssessment.Core.Opentdb;

public class QuestionCategoryResponse
{
    [JsonPropertyName("trivia_categories")]

    public ICollection<QuestionCategory> TriviaCategories { get; set; }=new List<QuestionCategory>();
}