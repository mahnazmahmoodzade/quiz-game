using System.Text.Json;
using AustrianAssessment.Dtos;
using AustrianAssessment.Models;

namespace AustrianAssessment.Core.Opentdb;

public class OpentdbQuestionService : IQuestionService
{
    private readonly HttpClient _httpClient;
    private readonly JsonSerializerOptions _jsonSerializerOptions;

    public OpentdbQuestionService(HttpClient httpClient)
    {
        _httpClient = httpClient;
        _jsonSerializerOptions = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };
    }


    public async Task<ICollection<QuestionCategory>> GetCategories()
    {
        //call this api https://opentdb.com/api_category.php using HttpClient

        var response = await _httpClient.GetAsync("/api_category.php");
        var content = await response.Content.ReadAsStringAsync();
        var categories = JsonSerializer.Deserialize<QuestionCategoryResponse>(content, _jsonSerializerOptions);
        var triviaCategories =
            categories.TriviaCategories.Select(c => new QuestionCategory { Id = c.Id, Name = c.Name }).ToList();
        return triviaCategories;
    }

    public async Task<Question> GetNextQuestion(int categoryId, string difficulty)
    {
        var questions = await GetQuestion(categoryId, difficulty);
        var question = questions.Results.Single();

        return new Question()
        {
            Text = question.Question,
            CorrectAnswer = question.CorrectAnswer,
            Options = question.IncorrectAnswers.Append(question.CorrectAnswer).ToList(),
        };
    }

    private async Task<OpentdbQuestionResponse?> GetQuestion(int categoryId, string difficulty)
    {
        var path = $"/api.php?amount=1&category={categoryId}&difficulty={difficulty}";
        var response = await _httpClient.GetAsync(path);
        var content = await response.Content.ReadAsStringAsync();
        var questions = JsonSerializer.Deserialize<OpentdbQuestionResponse>(content, _jsonSerializerOptions);
        if (questions.Response_Code != 0)
        {
            throw new Exception("Error while fetching questions");
        }

        return questions;
    }
}