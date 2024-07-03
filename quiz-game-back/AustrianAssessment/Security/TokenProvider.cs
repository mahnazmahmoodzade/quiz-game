using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AustrianAssessment.Core;
using AustrianAssessment.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace AustrianAssessment.Security;

public class TokenProvider : ITokenProvider
{
    private readonly IGameService _gameService;
    private readonly AppConfig _appConfig;
    public TokenProvider(IGameService gameService, IOptions<AppConfig> appConfig)
    {
        _appConfig = appConfig.Value;
        _gameService = gameService;
    }


    public async Task<string> GenerateJwtToken(string accessCode)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_appConfig.SecretKey); 

        var categories = await _gameService.GetCategories();

        var invalidCategories = new[] { _appConfig.ForbiddenCategory };

        var categoryIds= categories
            .Where(c => !invalidCategories.Contains(c.Name))
            .Select(c => c.Id)
            .ToList();

        var jwt = new JwtSecurityToken(
            issuer:"issuer",
            audience:"audience",
            claims: new []
            {
                new Claim("access_code", await _gameService.StartSession(10,accessCode)),
                new Claim("game_session", "XXXX"),
                new Claim("scope", string.Join(",", categoryIds))
            },
            expires:DateTime.UtcNow.AddHours(1),
            signingCredentials:new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            );
        
        return tokenHandler.WriteToken(jwt);
    }
}