using GestionBeneficiario_BackendAPI.DTOs.Beneficiarios;
using GestionBeneficiario_BackendAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GestionBeneficiario_BackendAPI.Controllers
{
    [ApiController]
    [Route("api/beneficiarios")]
    public class BeneficiariosController : ControllerBase
    {
        private readonly IBeneficiarioService _service;

        public BeneficiariosController(IBeneficiarioService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Listar([FromQuery] string? texto = null)
        {
            var list = await _service.ListarAsync(texto);
            return Ok(list);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> ObtenerPorId([FromRoute] int id)
        {
            var item = await _service.ObtenerPorIdAsync(id);
            if (item is null) return NotFound(new { error = "Beneficiario no encontrado." });

            return Ok(item);
        }

        [HttpPost]
        public async Task<IActionResult> Crear([FromBody] BeneficiarioCreateDto dto)
        {
            var newId = await _service.CrearAsync(dto);
            return CreatedAtAction(nameof(ObtenerPorId), new { id = newId }, new { id = newId });
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Actualizar([FromRoute] int id, [FromBody] BeneficiarioUpdateDto dto)
        {
            var result = await _service.ActualizarAsync(id, dto);

            if (result <= 0) return NotFound(new { error = "Beneficiario no encontrado." });

            return Ok(new { updated = true, value = result });
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Eliminar([FromRoute] int id)
        {
            var result = await _service.EliminarAsync(id);
            if (result <= 0) return NotFound(new { error = "Beneficiario no encontrado." });

            return Ok(new { deleted = true, value = result });
        }
    }
}
