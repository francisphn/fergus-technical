using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Tradify.API.Contexts;
using Tradify.API.Contracts;
using Tradify.API.Models;

// Create the builder
var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
builder.Services.AddSingleton<DapperContext>(); // Add Dapper
builder.Services.AddScoped<IModel, Model>();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer(); // Swagger
builder.Services.AddSwaggerGen();

FirebaseApp.Create(new AppOptions()
{
    Credential = GoogleCredential.FromFile("firebase.json")
});

// Configuration Kestrel server.
builder.Services.Configure<KestrelServerOptions>(options =>
{
    options.AllowSynchronousIO = true;
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

app.UseAuthorization();

app.MapControllers();

app.Run();
