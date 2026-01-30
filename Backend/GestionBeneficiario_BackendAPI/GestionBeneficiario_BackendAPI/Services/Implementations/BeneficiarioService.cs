using GestionBeneficiario_BackendAPI.DTOs.Beneficiarios;
using GestionBeneficiario_BackendAPI.Models;
using GestionBeneficiario_BackendAPI.Repositories.Interfaces;
using GestionBeneficiario_BackendAPI.Services.Interfaces;
using System.Text.RegularExpressions;

namespace GestionBeneficiario_BackendAPI.Services.Implementations
{
    public class BeneficiarioService : IBeneficiarioService
    {
        private readonly IBeneficiarioRepository _benefRepo;
        private readonly IDocumentoIdentidadRepository _docRepo;

        public BeneficiarioService(IBeneficiarioRepository benefRepo, IDocumentoIdentidadRepository docRepo)
        {
            _benefRepo = benefRepo;
            _docRepo = docRepo;
        }

        public async Task<List<BeneficiarioResponseDto>> ListarAsync(string? texto = null)
        {
            var list = await _benefRepo.ListarAsync(texto);

            return list.Select(b => new BeneficiarioResponseDto
            {
                Id = b.Id,
                Nombres = b.Nombres,
                Apellidos = b.Apellidos,
                DocumentoIdentidadId = b.DocumentoIdentidadId,
                NumeroDocumento = b.NumeroDocumento,
                FechaNacimiento = b.FechaNacimiento,
                Sexo = b.Sexo,

                DocumentoNombre = b.TipoDocumento,
                DocumentoAbreviatura = b.Abreviatura
            }).ToList();
        }

        public async Task<BeneficiarioResponseDto?> ObtenerPorIdAsync(int id)
        {
            var b = await _benefRepo.ObtenerPorIdAsync(id);
            return b is null ? null : MapToResponse(b);
        }

        public async Task<int> CrearAsync(BeneficiarioCreateDto dto)
        {
            var entity = new Beneficiario
            {
                Nombres = (dto.Nombres ?? "").Trim(),
                Apellidos = (dto.Apellidos ?? "").Trim(),
                DocumentoIdentidadId = dto.DocumentoIdentidadId,
                NumeroDocumento = (dto.NumeroDocumento ?? "").Trim(),
                FechaNacimiento = dto.FechaNacimiento.Date,
                Sexo = (dto.Sexo ?? "").Trim().ToUpper()
            };

            await ValidarBeneficiarioAsync(entity);

            return await _benefRepo.InsertarAsync(entity);
        }

        public async Task<int> ActualizarAsync(int id, BeneficiarioUpdateDto dto)
        {
            var entity = new Beneficiario
            {
                Nombres = (dto.Nombres ?? "").Trim(),
                Apellidos = (dto.Apellidos ?? "").Trim(),
                DocumentoIdentidadId = dto.DocumentoIdentidadId,
                NumeroDocumento = (dto.NumeroDocumento ?? "").Trim(),
                FechaNacimiento = dto.FechaNacimiento.Date,
                Sexo = (dto.Sexo ?? "").Trim().ToUpper()
            };

            await ValidarBeneficiarioAsync(entity);

            return await _benefRepo.ActualizarAsync(id, entity);
        }

        public Task<int> EliminarAsync(int id) => _benefRepo.EliminarAsync(id);


        private async Task ValidarBeneficiarioAsync(Beneficiario b)
        {
            if (string.IsNullOrWhiteSpace(b.Nombres)) throw new ArgumentException("Nombres es obligatorio.");
            if (string.IsNullOrWhiteSpace(b.Apellidos)) throw new ArgumentException("Apellidos es obligatorio.");
            if (string.IsNullOrWhiteSpace(b.NumeroDocumento)) throw new ArgumentException("NumeroDocumento es obligatorio.");

           
            if (!Regex.IsMatch(b.Sexo, "^[MF]$"))
                throw new ArgumentException("Sexo debe ser 'M' o 'F'.");

        
            if (b.FechaNacimiento > DateTime.Today)
                throw new ArgumentException("FechaNacimiento no puede ser futura.");

            
            var doc = await _docRepo.ObtenerPorIdAsync(b.DocumentoIdentidadId);
            if (doc is null)
                throw new ArgumentException("DocumentoIdentidadId no existe.");

            if (!doc.Activo)
                throw new ArgumentException("El tipo de documento seleccionado no está activo.");

           
            if (b.NumeroDocumento.Length != doc.Longitud)
                throw new ArgumentException($"NumeroDocumento debe tener exactamente {doc.Longitud} caracteres para {doc.Nombre}.");

            
            if (doc.SoloNumeros && !Regex.IsMatch(b.NumeroDocumento, @"^\d+$"))
                throw new ArgumentException($"NumeroDocumento debe contener solo números para {doc.Nombre}.");
        }

        private static BeneficiarioResponseDto MapToResponse(Beneficiario b)
        {
            var bl = b as BeneficiarioListado;

            return new BeneficiarioResponseDto
            {
                Id = b.Id,
                Nombres = b.Nombres,
                Apellidos = b.Apellidos,
                DocumentoIdentidadId = b.DocumentoIdentidadId,
                NumeroDocumento = b.NumeroDocumento,
                FechaNacimiento = b.FechaNacimiento,
                Sexo = b.Sexo,

                DocumentoNombre = bl?.TipoDocumento,
                DocumentoAbreviatura = bl?.Abreviatura
            };
        }
    }
}
