IF OBJECT_ID('dbo.sp_DocumentoIdentidad_ListarActivos', 'P') IS NOT NULL
    DROP PROCEDURE dbo.sp_DocumentoIdentidad_ListarActivos;
GO

CREATE PROCEDURE dbo.sp_DocumentoIdentidad_ListarActivos
    @Pais VARCHAR(50) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    SELECT Id, Nombre, Abreviatura, Pais, Longitud, SoloNumeros, Activo
    FROM dbo.DocumentoIdentidad
    WHERE Activo = 1
      AND (@Pais IS NULL OR Pais = @Pais)
    ORDER BY Pais, Nombre;
END
GO

IF OBJECT_ID('dbo.fn_EsSoloDigitos', 'FN') IS NOT NULL DROP FUNCTION dbo.fn_EsSoloDigitos;
GO

CREATE FUNCTION dbo.fn_EsSoloDigitos (@texto VARCHAR(50))
RETURNS BIT
AS
BEGIN
    IF (@texto IS NULL OR @texto = '') RETURN 0;
    IF (@texto LIKE '%[^0-9]%') RETURN 0;
    RETURN 1;
END
GO


IF OBJECT_ID('dbo.sp_Beneficiario_Insertar', 'P') IS NOT NULL
    DROP PROCEDURE dbo.sp_Beneficiario_Insertar;
GO

CREATE PROCEDURE dbo.sp_Beneficiario_Insertar
    @Nombres              VARCHAR(100),
    @Apellidos            VARCHAR(100),
    @DocumentoIdentidadId INT,
    @NumeroDocumento      VARCHAR(20),
    @FechaNacimiento      DATE,
    @Sexo                 CHAR(1)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @Longitud INT, @SoloNumeros BIT, @Activo BIT;

    SELECT
        @Longitud = Longitud,
        @SoloNumeros = SoloNumeros,
        @Activo = Activo
    FROM dbo.DocumentoIdentidad
    WHERE Id = @DocumentoIdentidadId;

    IF @Longitud IS NULL
        THROW 50001, 'DocumentoIdentidadId no existe.', 1;

    IF @Activo = 0
        THROW 50002, 'El tipo de documento está inactivo.', 1;

    IF LEN(@NumeroDocumento) <> @Longitud
        THROW 50003, 'NumeroDocumento no cumple la longitud requerida para el documento seleccionado.', 1;

    IF @SoloNumeros = 1 AND dbo.fn_EsSoloDigitos(@NumeroDocumento) = 0
        THROW 50004, 'NumeroDocumento debe contener solo dígitos para el documento seleccionado.', 1;

    INSERT INTO dbo.Beneficiario (Nombres, Apellidos, DocumentoIdentidadId, NumeroDocumento, FechaNacimiento, Sexo)
    VALUES (@Nombres, @Apellidos, @DocumentoIdentidadId, @NumeroDocumento, @FechaNacimiento, @Sexo);

    SELECT SCOPE_IDENTITY() AS IdCreado;
END
GO


IF OBJECT_ID('dbo.sp_Beneficiario_Listar', 'P') IS NOT NULL
    DROP PROCEDURE dbo.sp_Beneficiario_Listar;
GO

CREATE PROCEDURE dbo.sp_Beneficiario_Listar
    @Texto VARCHAR(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        b.Id,
        b.Nombres,
        b.Apellidos,
        b.DocumentoIdentidadId,
        di.Nombre AS TipoDocumento,
        di.Abreviatura,
        b.NumeroDocumento,
        b.FechaNacimiento,
        b.Sexo
    FROM dbo.Beneficiario b
    INNER JOIN dbo.DocumentoIdentidad di ON di.Id = b.DocumentoIdentidadId
    WHERE (@Texto IS NULL OR @Texto = ''
          OR b.Nombres LIKE '%' + @Texto + '%'
          OR b.Apellidos LIKE '%' + @Texto + '%'
          OR b.NumeroDocumento LIKE '%' + @Texto + '%')
    ORDER BY b.Id DESC;
END
GO


IF OBJECT_ID('dbo.sp_Beneficiario_ObtenerPorId', 'P') IS NOT NULL
    DROP PROCEDURE dbo.sp_Beneficiario_ObtenerPorId;
GO

CREATE PROCEDURE dbo.sp_Beneficiario_ObtenerPorId
    @Id INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        b.Id, b.Nombres, b.Apellidos, b.DocumentoIdentidadId, b.NumeroDocumento,
        b.FechaNacimiento, b.Sexo
    FROM dbo.Beneficiario b
    WHERE b.Id = @Id;
END
GO

IF OBJECT_ID('dbo.sp_Beneficiario_Actualizar', 'P') IS NOT NULL
    DROP PROCEDURE dbo.sp_Beneficiario_Actualizar;
GO

CREATE PROCEDURE dbo.sp_Beneficiario_Actualizar
    @Id                  INT,
    @Nombres              VARCHAR(100),
    @Apellidos            VARCHAR(100),
    @DocumentoIdentidadId INT,
    @NumeroDocumento      VARCHAR(20),
    @FechaNacimiento      DATE,
    @Sexo                 CHAR(1)
AS
BEGIN
    SET NOCOUNT ON;

    IF NOT EXISTS (SELECT 1 FROM dbo.Beneficiario WHERE Id = @Id)
        THROW 50010, 'Beneficiario no existe.', 1;

    DECLARE @Longitud INT, @SoloNumeros BIT, @Activo BIT;

    SELECT
        @Longitud = Longitud,
        @SoloNumeros = SoloNumeros,
        @Activo = Activo
    FROM dbo.DocumentoIdentidad
    WHERE Id = @DocumentoIdentidadId;

    IF @Longitud IS NULL
        THROW 50011, 'DocumentoIdentidadId no existe.', 1;

    IF @Activo = 0
        THROW 50012, 'El tipo de documento está inactivo.', 1;

    IF LEN(@NumeroDocumento) <> @Longitud
        THROW 50013, 'NumeroDocumento no cumple la longitud requerida para el documento seleccionado.', 1;

    IF @SoloNumeros = 1 AND dbo.fn_EsSoloDigitos(@NumeroDocumento) = 0
        THROW 50014, 'NumeroDocumento debe contener solo dígitos para el documento seleccionado.', 1;

    UPDATE dbo.Beneficiario
    SET
        Nombres = @Nombres,
        Apellidos = @Apellidos,
        DocumentoIdentidadId = @DocumentoIdentidadId,
        NumeroDocumento = @NumeroDocumento,
        FechaNacimiento = @FechaNacimiento,
        Sexo = @Sexo
    WHERE Id = @Id;

    SELECT @Id AS IdActualizado;
END
GO

IF OBJECT_ID('dbo.sp_Beneficiario_Eliminar', 'P') IS NOT NULL
    DROP PROCEDURE dbo.sp_Beneficiario_Eliminar;
GO

CREATE PROCEDURE dbo.sp_Beneficiario_Eliminar
    @Id INT
AS
BEGIN
    SET NOCOUNT ON;

    IF NOT EXISTS (SELECT 1 FROM dbo.Beneficiario WHERE Id = @Id)
        THROW 50020, 'Beneficiario no existe.', 1;

    DELETE FROM dbo.Beneficiario WHERE Id = @Id;

    SELECT @Id AS IdEliminado;
END
GO





