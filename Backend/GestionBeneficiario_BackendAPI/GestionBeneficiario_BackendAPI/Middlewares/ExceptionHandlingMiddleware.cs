using System.Net;
using System.Text.Json;

namespace GestionBeneficiario_BackendAPI.Middlewares
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionHandlingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (ArgumentException ex)
            {
                await WriteError(context, HttpStatusCode.BadRequest, ex.Message);
            }
            catch (KeyNotFoundException ex)
            {
                await WriteError(context, HttpStatusCode.NotFound, ex.Message);
            }
            catch (Exception)
            {
                await WriteError(context, HttpStatusCode.InternalServerError, "Ocurrió un error inesperado.");
            }
        }

        private static Task WriteError(HttpContext context, HttpStatusCode statusCode, string message)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)statusCode;

            var payload = JsonSerializer.Serialize(new
            {
                error = message,
                status = context.Response.StatusCode
            });

            return context.Response.WriteAsync(payload);
        }
    }
}
