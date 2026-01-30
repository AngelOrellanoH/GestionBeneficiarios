using System.ComponentModel.DataAnnotations;

namespace GestionBeneficiario_BackendAPI.DTOs.Beneficiarios
{
    public class BeneficiarioCreateDto
    {
        [Required, StringLength(100)]
        public string Nombres { get; set; } = string.Empty;

        [Required, StringLength(100)]
        public string Apellidos { get; set; } = string.Empty;

        [Required]
        public int DocumentoIdentidadId { get; set; }

        [Required, StringLength(20)]
        public string NumeroDocumento { get; set; } = string.Empty;

        [Required]
        public DateTime FechaNacimiento { get; set; }

        [Required, RegularExpression("^[MF]$", ErrorMessage = "Sexo debe ser 'M' o 'F'.")]
        public string Sexo { get; set; } = string.Empty;
    }
}
