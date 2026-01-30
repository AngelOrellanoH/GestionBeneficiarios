namespace GestionBeneficiario_BackendAPI.Models
{
    public class BeneficiarioListado : Beneficiario
    {
        public string TipoDocumento { get; set; } = string.Empty;
        public string Abreviatura { get; set; } = string.Empty;
    }
}
