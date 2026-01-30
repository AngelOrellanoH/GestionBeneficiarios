using GestionBeneficiario_BackendAPI.Models;

namespace GestionBeneficiario_BackendAPI.Repositories.Interfaces
{
    public interface IDocumentoIdentidadRepository
    {
        Task<List<DocumentoIdentidad>> ListarActivosAsync(string? pais = null);
        Task<DocumentoIdentidad?> ObtenerPorIdAsync(int id);
    }

}
