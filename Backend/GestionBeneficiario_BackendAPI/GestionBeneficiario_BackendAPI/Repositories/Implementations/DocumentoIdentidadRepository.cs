using GestionBeneficiario_BackendAPI.Data;
using GestionBeneficiario_BackendAPI.Models;
using GestionBeneficiario_BackendAPI.Repositories.Interfaces;
using Microsoft.Data.SqlClient;
using System.Data;

namespace GestionBeneficiario_BackendAPI.Repositories.Implementations
{
    public class DocumentoIdentidadRepository : IDocumentoIdentidadRepository
    {
        private readonly DbConnectionFactory _db;

        public DocumentoIdentidadRepository(DbConnectionFactory db)
        {
            _db = db;
        }

        public async Task<List<DocumentoIdentidad>> ListarActivosAsync(string? pais = null)
        {
            using var conn = _db.CreateConnection();
            conn.Open();

            using var cmd = conn.CreateCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "dbo.sp_DocumentoIdentidad_ListarActivos";

            var pPais = cmd.CreateParameter();
            pPais.ParameterName = "@Pais";
            pPais.Value = (object?)pais ?? DBNull.Value;
            cmd.Parameters.Add(pPais);

            var result = new List<DocumentoIdentidad>();

            using var reader = await ((SqlCommand)cmd).ExecuteReaderAsync();
            while (await reader.ReadAsync())
            {
                result.Add(new DocumentoIdentidad
                {
                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                    Nombre = reader.GetString(reader.GetOrdinal("Nombre")),
                    Abreviatura = reader.GetString(reader.GetOrdinal("Abreviatura")),
                    Pais = reader.GetString(reader.GetOrdinal("Pais")),
                    Longitud = reader.GetInt32(reader.GetOrdinal("Longitud")),
                    SoloNumeros = reader.GetBoolean(reader.GetOrdinal("SoloNumeros")),
                    Activo = reader.GetBoolean(reader.GetOrdinal("Activo"))
                });
            }

            return result;
        }

        public async Task<DocumentoIdentidad?> ObtenerPorIdAsync(int id)
        {
            using var conn = _db.CreateConnection();
            conn.Open();

            using var cmd = conn.CreateCommand();
            cmd.CommandType = CommandType.Text;
            cmd.CommandText = @"
SELECT TOP 1 Id, Nombre, Abreviatura, Pais, Longitud, SoloNumeros, Activo
FROM dbo.DocumentoIdentidad
WHERE Id = @Id;";

            var pId = cmd.CreateParameter();
            pId.ParameterName = "@Id";
            pId.Value = id;
            cmd.Parameters.Add(pId);

            using var reader = await ((SqlCommand)cmd).ExecuteReaderAsync();
            if (!await reader.ReadAsync()) return null;

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
