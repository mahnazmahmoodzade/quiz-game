using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AustrianAssessment.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

 

namespace AustrianAssessment.Security;

public class JwtAuthorizeAttribute : Attribute, IAuthorizationFilter
{

    public JwtAuthorizeAttribute()
    {
        
    }
    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var token = context.HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

        if (token == null)
        {
            context.Result = new UnauthorizedResult();
            return;
        }

        try
        {
            var key = Encoding.ASCII.GetBytes(AppConfig.Instance.SecretKey);
            var tokenHandler = new JwtSecurityTokenHandler();
            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = false,
                ValidateIssuerSigningKey = false,
                IssuerSigningKey = new SymmetricSecurityKey(key)
            };

            ClaimsPrincipal principal = tokenHandler.ValidateToken(token, validationParameters, out SecurityToken validatedToken);

            // Set the current principal
            Thread.CurrentPrincipal = principal;
            context.HttpContext.User = principal;

        }
        catch (Exception ex)
        {
            context.Result = new UnauthorizedResult();
        }
    }
}