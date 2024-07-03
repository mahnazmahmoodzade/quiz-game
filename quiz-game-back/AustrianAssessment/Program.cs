using System.Text.Json;
using AustrianAssessment.Core;
using AustrianAssessment.Core.Opentdb;
using AustrianAssessment.Models;
using AustrianAssessment.Security;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.Configure<AppConfig>(builder.Configuration.GetSection("AppConfig"));
AppConfig.Instance = builder.Configuration.GetSection("AppConfig").Get<AppConfig>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder =>
        {
            builder.WithOrigins(AppConfig.Instance.AllowedOrigin)
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

builder.Services.AddHttpClient<IQuestionService, OpentdbQuestionService>(client =>
{
    client.BaseAddress = new Uri(AppConfig.Instance.TriviaApi);
});

builder.Services.AddTransient<IGameService, GameService>();
builder.Services.AddTransient<ITokenProvider, TokenProvider>();
builder.Services.AddSingleton<IGameRepository, InMemoryGameRepository>();


builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors("AllowSpecificOrigin");

app.Run();