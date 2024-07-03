using AustrianAssessment.Core;
using AustrianAssessment.Dtos;
using AustrianAssessment.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace AustrianAssessment.Controllers;

[ApiController]
[Route("questions")]
public class QuestionsController : AuthorizedControllerBase
{
    private readonly IGameService _gameService;

    public QuestionsController(IGameService gameService)
    {
        _gameService = gameService;
    }

    [HttpGet("next")]
    public async Task<IActionResult> GetNextQuestion(int categoryId, string difficulty)
    {
        if (!CurrentUser.Scope.Contains(categoryId))
        {
            var error = new ErrorModel
            {
                Title = "Sport is not allowed.",
                Detail = "You are not allowed to use this category",
                Code = 403
            };
            return new ObjectResult(error)
            {
                StatusCode = StatusCodes.Status403Forbidden
            };
        }


        try
        {
            var question = await _gameService.GetNextQuestion(CurrentUser.SessionId, categoryId, difficulty);
            return Ok(question);
        }
        catch (ApplicationException)
        {
            return BadRequest(new ErrorModel
            {
                Title = "Game is finished",
                Detail = "Game is finished already. Please start a new session",
                Code = 400
            });
        }
    }

    [HttpPost("submit")]
    public async Task<AnswerResponseDto> SubmitAnswer([FromBody] SubmitAnswerRequest request)
    {
        return await _gameService.SubmitAnswer(CurrentUser.SessionId, request.QuestionId, request.Answer);
    }

    [HttpGet("summary")]
    public async Task<GameSummaryDto> GetGameSummary()
    {
        return await _gameService.GetGameSummary(CurrentUser.SessionId);
    }
}