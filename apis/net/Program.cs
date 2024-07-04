using Microsoft.OpenApi.Models;
using Net.Services;
using Net.Middleware;
using Net.Filters;

var builder = WebApplication.CreateBuilder(args);

// Load .env file
DotNetEnv.Env.Load();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
            builder.WithOrigins("http://localhost:4321")
                    .AllowAnyHeader()
                    .AllowAnyMethod();
        });
});

// Add services to the container.
builder.Services.AddSingleton<MySqlService>();
builder.Services.AddSingleton<SqlServerService>();
builder.Services.AddSingleton<MongoDbService>();
builder.Services.AddSingleton<PostgresService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Net", Version = "v1" });

    // Add the header parameter globally
    c.AddSecurityDefinition("x-db-type", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Name = "x-db-type",
        Type = SecuritySchemeType.ApiKey,
        Description = "Specify the database type to use (mysql, sqlserver, mongodb, postgres)"
    });

    c.OperationFilter<AddRequiredHeaderParameter>();
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Net v1");
    });
}
app.UseRouting();
app.UseCors();
app.UseAuthorization();

// Use the custom middleware
app.UseMiddleware<DbSelectionMiddleware>();

app.MapControllers();

app.Run();
