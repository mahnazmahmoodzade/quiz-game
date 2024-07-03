using AustrianAssessment.Dtos;
using AustrianAssessment.Models;
using Microsoft.Extensions.Options;

namespace AustrianAssessment.Core;

public class GameService : IGameService
{
    private readonly IQuestionService _questionService;
    private readonly IGameRepository _gameRepository;
    private readonly AppConfig _appConfig;


    public GameService(IQuestionService questionService,
        IGameRepository gameRepository,
        IOptions<AppConfig> appConfig)
    {
        _questionService = questionService;
        _gameRepository = gameRepository;
        _appConfig = appConfig.Value;
    }

    public Task<string> StartSession(int questionCount, string accessCode)
    {
        var gameSession = new GameSession
        {
            Id = Guid.NewGuid().ToString(),
        };
        _gameRepository.AddSession(gameSession);
        return Task.FromResult(gameSession.Id);
    }

    public async Task<QuestionDto> GetNextQuestion(string sessionId, int categoryId, string difficulty)
    {
        var isGameFinished = _gameRepository.GetGame(sessionId).Questions.Count == _appConfig.QuestionCount;
        if (isGameFinished)
            throw new ApplicationException("Game is finished");

        var question= await _questionService.GetNextQuestion(categoryId, difficulty);

        var questionDto = new QuestionDto() {Id = question.Id, Text = question.Text, Options = question.Options};
        
        _gameRepository.AddQuestionToSession(sessionId, question);

        return questionDto;
    }

    public Task<AnswerResponseDto> SubmitAnswer(string sessionId, string questionId, string answer)
    {
        var game = _gameRepository.GetGame(sessionId);
        var question = game.Questions.First(q => q.Id == questionId);
        question.SelectedAnswer = answer;


        return Task.FromResult(new AnswerResponseDto()
        {
            Correct = question.CorrectAnswer == answer,
            CurrentScore = game.Questions.Count(q => q.IsAnsweredCorrectly),
            RemainingQuestions = _appConfig.QuestionCount - game.Questions.Count,
            TotalQuestions = _appConfig.QuestionCount
        });
    }

    public async Task<ICollection<QuestionCategoryDto>> GetCategories()
    {
        var categories = await _questionService.GetCategories();
        var dtos = categories.Select(c => new QuestionCategoryDto() { Id = c.Id, Name = c.Name });
        return dtos.ToList();
    }

    public Task<GameSummaryDto> GetGameSummary(string sessionId)
    {
        var game = _gameRepository.GetGame(sessionId);
        return Task.FromResult(new GameSummaryDto()
        {
            Score = game.Questions.Count(q => q.IsAnsweredCorrectly),
            Answers = game.Questions.Select(q => new AnswersSummaryItemDto()
            {
                Question = q.Text,
                CorrectAnswer = q.CorrectAnswer,
                SelectedAnswer = q.SelectedAnswer,
                IsCorrect = q.IsAnsweredCorrectly
            }).ToList()
        });
    }
}