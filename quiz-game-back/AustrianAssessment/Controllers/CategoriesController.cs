using AustrianAssessment.Core;
using AustrianAssessment.Dtos;
using AustrianAssessment.Models;
using AustrianAssessment.Security;
using Microsoft.AspNetCore.Mvc;

namespace AustrianAssessment.Controllers;

[ApiController]
[Route("categories")]
public class CategoriesController : AuthorizedControllerBase
{
    private readonly IQuestionService _questinService;
    private readonly IGameService _gameService;

    public CategoriesController( IGameService gameService)
    {
        _gameService = gameService;
    }

    [HttpGet]
    public async Task<ICollection<QuestionCategoryDto>> GetCategories()
    {
        return  await _gameService.GetCategories();
    }
}