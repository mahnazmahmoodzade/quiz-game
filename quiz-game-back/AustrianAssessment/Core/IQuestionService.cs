using AustrianAssessment.Dtos;
using AustrianAssessment.Models;

namespace AustrianAssessment.Core;

public interface IQuestionService
{
    Task<ICollection<QuestionCategory>> GetCategories();
    Task<Question> GetNextQuestion(int categoryId, string difficulty);
}