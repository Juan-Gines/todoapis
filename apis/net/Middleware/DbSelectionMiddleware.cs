using Net.Services;

namespace Net.Middleware
{
  public class DbSelectionMiddleware(RequestDelegate next)
  {
    private readonly RequestDelegate _next = next;

    public async Task InvokeAsync(HttpContext context)
    {
      if (context.Request.Headers.TryGetValue("x-db-type", out var dbType))
      {
        switch (dbType.ToString().ToLower())
        {
          case "mysql":
            context.Items["DbService"] = context.RequestServices.GetService<MySqlService>();
            break;
          case "sqlserver":
            context.Items["DbService"] = context.RequestServices.GetService<SqlServerService>();
            break;
          case "mongodb":
            context.Items["DbService"] = context.RequestServices.GetService<MongoDbService>();
            break;
          case "postgres":
            context.Items["DbService"] = context.RequestServices.GetService<PostgresService>();
            break;
          default:
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            await context.Response.WriteAsync("Invalid x-db-type header");
            return;
        }
      }
      else
      {
        context.Response.StatusCode = StatusCodes.Status400BadRequest;
        await context.Response.WriteAsync("x-db-type header is missing");
        return;
      }

      await _next(context);
    }
  }
}
