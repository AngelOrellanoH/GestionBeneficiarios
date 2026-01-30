using GestionBeneficiario_BackendAPI.DTOs.Beneficiarios;

namespace GestionBeneficiario_BackendAPI.Services.Interfaces
{
    public interface IBeneficiarioService
    {
        Task<List<BeneficiarioResponseDto>> ListarAsync(string? texto = null);
        Task<BeneficiarioResponseDto?> ObtenerPorIdAsync(int id);
        Task<int> CrearAsync(BeneficiarioCreateDto dto);
        Task<int> ActualizarAsync(int id, BeneficiarioUpdateDto dto);
        Task<int> EliminarAsync(int id);
    }
}
