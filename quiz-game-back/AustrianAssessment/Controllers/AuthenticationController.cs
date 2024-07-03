using AustrianAssessment.Dtos;
using AustrianAssessment.Security;
using Microsoft.AspNetCore.Mvc;

namespace AustrianAssessment.Controllers;

[ApiController]
[Route("authentication")]
public class AuthenticationController : ControllerBase
{
    private readonly ITokenProvider _tokenProvider;

    public AuthenticationController(ITokenProvider tokenProvider)
    {
        _tokenProvider = tokenProvider;
    }


    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto request)
    {
        var token = await _tokenProvider.GenerateJwtToken(request.AccessCode);
        return Ok(new { Token = token });
    }
}