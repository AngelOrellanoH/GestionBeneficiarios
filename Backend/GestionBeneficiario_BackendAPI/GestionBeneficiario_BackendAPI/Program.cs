using GestionBeneficiario_BackendAPI.Data;
using GestionBeneficiario_BackendAPI.Middlewares;
using GestionBeneficiario_BackendAPI.Repositories.Implementations;
using GestionBeneficiario_BackendAPI.Repositories.Interfaces;
using GestionBeneficiario_BackendAPI.Services.Implementations;
using GestionBeneficiario_BackendAPI.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var allowedOrigins = builder.Configuration
    .GetSection("Cors:AllowedOrigins")
    .Get<string[]>() ?? Array.Empty<string>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendCors", policy =>
    {
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddScoped<DbConnectionFactory>();

builder.Services.AddScoped<IDocumentoIdentidadRepository, DocumentoIdentidadRepository>();
builder.Services.AddScoped<IBeneficiarioRepository, BeneficiarioRepository>();

builder.Services.AddScoped<IDocumentoIdentidadService, DocumentoIdentidadService>();
builder.Services.AddScoped<IBeneficiarioService, BeneficiarioService>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("FrontendCors");

app.UseAuthorization();

app.UseMiddleware<ExceptionHandlingMiddleware>();

app.MapControllers();

app.Run();
