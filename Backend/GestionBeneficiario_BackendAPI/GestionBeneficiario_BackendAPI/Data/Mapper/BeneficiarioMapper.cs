using GestionBeneficiario_BackendAPI.Models;
using Microsoft.Data.SqlClient;

namespace GestionBeneficiario_BackendAPI.Data.Mapper
{
    public class BeneficiarioMapper
    {
        public static Beneficiario Map(SqlDataReader reader)
        {
            return new Beneficiario
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Nombres = reader.GetString(reader.GetOrdinal("Nombres")),
                Apellidos = reader.GetString(reader.GetOrdinal("Apellidos")),
                DocumentoIdentidadId = reader.GetInt32(reader.GetOrdinal("DocumentoIdentidadId")),
                NumeroDocumento = reader.GetString(reader.GetOrdinal("NumeroDocumento")),
                FechaNacimiento = reader.GetDateTime(reader.GetOrdinal("FechaNacimiento")),
                Sexo = reader.GetString(reader.GetOrdinal("Sexo")) // char(1) funciona como string
            };
        }
    }
}
