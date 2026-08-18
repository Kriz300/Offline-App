using Microsoft.AspNetCore.Mvc;

namespace remoteApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class keepAliveController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new
        {
            status = "ok",
            service = "remoteApi",
            timestamp = DateTime.UtcNow
        });
    }
}