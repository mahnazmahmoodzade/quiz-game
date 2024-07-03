using AustrianAssessment.Dtos;
using AustrianAssessment.Models;

namespace AustrianAssessment.Core;

public interface IGameService
{
    Task<string> StartSession(int questionCount,string accessCode);
    Task<QuestionDto> GetNextQuestion(string sessionId, int categoryId, string difficulty);
    Task<AnswerResponseDto> SubmitAnswer(string sessionId,string questionId, string answer);
    
    Task<ICollection<QuestionCategoryDto>> GetCategories();
    
    Task<GameSummaryDto> GetGameSummary(string sessionId);
}