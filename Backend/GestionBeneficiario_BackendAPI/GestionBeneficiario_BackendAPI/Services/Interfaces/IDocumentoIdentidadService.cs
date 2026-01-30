using GestionBeneficiario_BackendAPI.DTOs.DocumentosIdentidad;

namespace GestionBeneficiario_BackendAPI.Services.Interfaces
{
    public interface IDocumentoIdentidadService
    {
        Task<List<DocumentoIdentidadResponseDto>> ListarActivosAsync(string? pais = null);
    }
}
