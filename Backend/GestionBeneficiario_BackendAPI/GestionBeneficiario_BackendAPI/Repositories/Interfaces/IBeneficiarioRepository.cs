using GestionBeneficiario_BackendAPI.Models;

namespace GestionBeneficiario_BackendAPI.Repositories.Interfaces
{
    public interface IBeneficiarioRepository
    {
        Task<List<BeneficiarioListado>> ListarAsync(string? texto = null);
        Task<BeneficiarioListado?> ObtenerPorIdAsync(int id);
        Task<int> InsertarAsync(Beneficiario beneficiario);
        Task<int> ActualizarAsync(int id, Beneficiario beneficiario);
        Task<int> EliminarAsync(int id);
    }
}
