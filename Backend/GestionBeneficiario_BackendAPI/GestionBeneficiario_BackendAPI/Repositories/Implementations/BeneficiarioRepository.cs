using GestionBeneficiario_BackendAPI.Data;
using GestionBeneficiario_BackendAPI.Models;
using GestionBeneficiario_BackendAPI.Repositories.Interfaces;
using Microsoft.Data.SqlClient;
using System.Data;

namespace GestionBeneficiario_BackendAPI.Repositories.Implementations
{
    public class BeneficiarioRepository : IBeneficiarioRepository
    {
        private readonly DbConnectionFactory _db;

        public BeneficiarioRepository(DbConnectionFactory db)
        {
            _db = db;
        }

        public async Task<List<BeneficiarioListado>> ListarAsync(string? texto = null)
        {
            using var conn = _db.CreateConnection();
            conn.Open();

            using var cmd = conn.CreateCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "dbo.sp_Beneficiario_Listar";

            var pTexto = cmd.CreateParameter();
            pTexto.ParameterName = "@Texto";
            pTexto.Value = (object?)texto ?? DBNull.Value;
            cmd.Parameters.Add(pTexto);

            var result = new List<BeneficiarioListado>();
            using var reader = await ((SqlCommand)cmd).ExecuteReaderAsync();
            while (await reader.ReadAsync())
            {
                result.Add(new BeneficiarioListado
                {
                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                    Nombres = reader.GetString(reader.GetOrdinal("Nombres")),
                    Apellidos = reader.GetString(reader.GetOrdinal("Apellidos")),
                    DocumentoIdentidadId = reader.GetInt32(reader.GetOrdinal("DocumentoIdentidadId")),
                    NumeroDocumento = reader.GetString(reader.GetOrdinal("NumeroDocumento")),
                    FechaNacimiento = reader.GetDateTime(reader.GetOrdinal("FechaNacimiento")),
                    Sexo = reader.GetString(reader.GetOrdinal("Sexo")),
                    TipoDocumento = reader.GetString(reader.GetOrdinal("TipoDocumento")),
                    Abreviatura = reader.GetString(reader.GetOrdinal("Abreviatura"))
                });
            }

            return result;
        }

        public async Task<BeneficiarioListado?> ObtenerPorIdAsync(int id)
        {
            using var conn = _db.CreateConnection();
            conn.Open();

            using var cmd = conn.CreateCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "dbo.sp_Beneficiario_ObtenerPorId";

            var pId = cmd.CreateParameter();
            pId.ParameterName = "@Id";
            pId.Value = id;
            cmd.Parameters.Add(pId);

            using var reader = await ((SqlCommand)cmd).ExecuteReaderAsync();
            if (!await reader.ReadAsync()) return null;

            return new BeneficiarioListado
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Nombres = reader.GetString(reader.GetOrdinal("Nombres")),
                Apellidos = reader.GetString(reader.GetOrdinal("Apellidos")),
                DocumentoIdentidadId = reader.GetInt32(reader.GetOrdinal("DocumentoIdentidadId")),
                NumeroDocumento = reader.GetString(reader.GetOrdinal("NumeroDocumento")),
                FechaNacimiento = reader.GetDateTime(reader.GetOrdinal("FechaNacimiento")),
                Sexo = reader.GetString(reader.GetOrdinal("Sexo")),
                TipoDocumento = reader.GetString(reader.GetOrdinal("TipoDocumento")),
                Abreviatura = reader.GetString(reader.GetOrdinal("Abreviatura"))
            };
        }

        public async Task<int> InsertarAsync(Beneficiario b)
        {
            using var conn = _db.CreateConnection();
            conn.Open();

            using var cmd = conn.CreateCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "dbo.sp_Beneficiario_Insertar";

            Add(cmd, "@Nombres", b.Nombres);
            Add(cmd, "@Apellidos", b.Apellidos);
            Add(cmd, "@DocumentoIdentidadId", b.DocumentoIdentidadId);
            Add(cmd, "@NumeroDocumento", b.NumeroDocumento);
            Add(cmd, "@FechaNacimiento", b.FechaNacimiento.Date);
            Add(cmd, "@Sexo", b.Sexo);

            var scalar = await ((SqlCommand)cmd).ExecuteScalarAsync();
            return Convert.ToInt32(scalar);
        }

        public async Task<int> ActualizarAsync(int id, Beneficiario b)
        {
            using var conn = _db.CreateConnection();
            conn.Open();

            using var cmd = conn.CreateCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "dbo.sp_Beneficiario_Actualizar";

            Add(cmd, "@Id", id);
            Add(cmd, "@Nombres", b.Nombres);
            Add(cmd, "@Apellidos", b.Apellidos);
            Add(cmd, "@DocumentoIdentidadId", b.DocumentoIdentidadId);
            Add(cmd, "@NumeroDocumento", b.NumeroDocumento);
            Add(cmd, "@FechaNacimiento", b.FechaNacimiento.Date);
            Add(cmd, "@Sexo", b.Sexo);

            var scalar = await ((SqlCommand)cmd).ExecuteScalarAsync();
            return Convert.ToInt32(scalar);
        }

        public async Task<int> EliminarAsync(int id)
        {
            using var conn = _db.CreateConnection();
            conn.Open();

            using var cmd = conn.CreateCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "dbo.sp_Beneficiario_Eliminar";

            Add(cmd, "@Id", id);

            var scalar = await ((SqlCommand)cmd).ExecuteScalarAsync();
            return Convert.ToInt32(scalar);
        }

        private static void Add(IDbCommand cmd, string name, object value)
        {
            var p = cmd.CreateParameter();
            p.ParameterName = name;
            p.Value = value;
            cmd.Parameters.Add(p);
        }

    }
}
