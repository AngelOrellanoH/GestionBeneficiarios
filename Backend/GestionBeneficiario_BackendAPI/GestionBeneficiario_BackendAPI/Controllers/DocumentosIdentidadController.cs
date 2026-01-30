using GestionBeneficiario_BackendAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GestionBeneficiario_BackendAPI.Controllers
{
    [ApiController]
    [Route("api/documentos-identidad")]
    public class DocumentosIdentidadController : ControllerBase
    {
        private readonly IDocumentoIdentidadService _service;

        public DocumentosIdentidadController(IDocumentoIdentidadService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> ListarActivos([FromQuery] string? pais = null)
        {
            var result = await _service.ListarActivosAsync(pais);
            return Ok(result);
        }
    }
}
