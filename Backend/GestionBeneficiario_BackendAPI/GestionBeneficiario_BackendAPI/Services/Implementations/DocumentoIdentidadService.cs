using GestionBeneficiario_BackendAPI.DTOs.DocumentosIdentidad;
using GestionBeneficiario_BackendAPI.Repositories.Interfaces;
using GestionBeneficiario_BackendAPI.Services.Interfaces;

namespace GestionBeneficiario_BackendAPI.Services.Implementations
{
    public class DocumentoIdentidadService : IDocumentoIdentidadService
    {
        private readonly IDocumentoIdentidadRepository _repo;

        public DocumentoIdentidadService(IDocumentoIdentidadRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<DocumentoIdentidadResponseDto>> ListarActivosAsync(string? pais = null)
        {
            var items = await _repo.ListarActivosAsync(pais);

            return items.Select(d => new DocumentoIdentidadResponseDto
            {
                Id = d.Id,
                Nombre = d.Nombre,
                Abreviatura = d.Abreviatura,
                Pais = d.Pais,
                Longitud = d.Longitud,
                SoloNumeros = d.SoloNumeros,
                Activo = d.Activo
            }).ToList();
        }
    }
}
