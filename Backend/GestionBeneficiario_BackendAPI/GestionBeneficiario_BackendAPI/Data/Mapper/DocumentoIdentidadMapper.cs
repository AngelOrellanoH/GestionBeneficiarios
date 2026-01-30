using GestionBeneficiario_BackendAPI.Models;
using Microsoft.Data.SqlClient;

namespace GestionBeneficiario_BackendAPI.Data.Mapper
{
    public class DocumentoIdentidadMapper
    {
        public static DocumentoIdentidad Map(SqlDataReader reader)
        {
            return new DocumentoIdentidad
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Nombre = reader.GetString(reader.GetOrdinal("Nombre")),
                Abreviatura = reader.GetString(reader.GetOrdinal("Abreviatura")),
                Pais = reader.GetString(reader.GetOrdinal("Pais")),
                Longitud = reader.GetInt32(reader.GetOrdinal("Longitud")),
                SoloNumeros = reader.GetBoolean(reader.GetOrdinal("SoloNumeros")),
                Activo = reader.GetBoolean(reader.GetOrdinal("Activo"))
            };
        }
    }
}
