namespace GestionBeneficiario_BackendAPI.DTOs.Beneficiarios
{
    public class BeneficiarioResponseDto
    {
        public int Id { get; set; }
        public string Nombres { get; set; } = string.Empty;
        public string Apellidos { get; set; } = string.Empty;

        public int DocumentoIdentidadId { get; set; }
        public string NumeroDocumento { get; set; } = string.Empty;

        public DateTime FechaNacimiento { get; set; }
        public string Sexo { get; set; } = string.Empty;


        public string? DocumentoNombre { get; set; }
        public string? DocumentoAbreviatura { get; set; }
    }
}
