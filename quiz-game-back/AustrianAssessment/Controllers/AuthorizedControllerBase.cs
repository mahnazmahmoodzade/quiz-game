using System.Security.Claims;
using AustrianAssessment.Security;
using Microsoft.AspNetCore.Mvc;

namespace AustrianAssessment.Controllers;

[JwtAuthorize]
public class AuthorizedControllerBase : ControllerBase
{
    protected CurrentUser CurrentUser
    {
        get
        {
            var user = new CurrentUser();
            user.SessionId = HttpContext.User.Claims.First(c => c.Type == "access_code").Value;
            user.Scope = HttpContext.User.Claims.First(c => c.Type == "scope").Value.Split(",").Select(int.Parse).ToList();
            // user.SessionId = HttpContext.User.Claims.First(c => c.Type == "session_id").Value;
            return user;
        }
    }
}