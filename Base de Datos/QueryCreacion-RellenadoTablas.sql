CREATE DATABASE GestionBeneficiarios;
GO

USE GestionBeneficiarios;
GO


IF OBJECT_ID('dbo.DocumentoIdentidad', 'U') IS NOT NULL DROP TABLE dbo.DocumentoIdentidad;
GO

CREATE TABLE dbo.DocumentoIdentidad (
    Id            INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_DocumentoIdentidad PRIMARY KEY,
    Nombre        VARCHAR(50)  NOT NULL,
    Abreviatura   VARCHAR(10)  NOT NULL,
    Pais          VARCHAR(50)  NOT NULL,
    Longitud      INT          NOT NULL,
    SoloNumeros   BIT          NOT NULL CONSTRAINT DF_DocumentoIdentidad_SoloNumeros DEFAULT(0),
    Activo        BIT          NOT NULL CONSTRAINT DF_DocumentoIdentidad_Activo DEFAULT(1),

    CONSTRAINT CK_DocumentoIdentidad_Longitud_Positive CHECK (Longitud > 0)
);
GO

CREATE UNIQUE INDEX UX_DocumentoIdentidad_Pais_Abrev
ON dbo.DocumentoIdentidad(Pais, Abreviatura);
GO

IF OBJECT_ID('dbo.Beneficiario', 'U') IS NOT NULL DROP TABLE dbo.Beneficiario;
GO

CREATE TABLE dbo.Beneficiario (
    Id                   INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_Beneficiario PRIMARY KEY,
    Nombres              VARCHAR(100) NOT NULL,
    Apellidos            VARCHAR(100) NOT NULL,
    DocumentoIdentidadId INT          NOT NULL,
    NumeroDocumento      VARCHAR(20)  NOT NULL,
    FechaNacimiento      DATE         NOT NULL,
    Sexo                 CHAR(1)      NOT NULL,

    CONSTRAINT FK_Beneficiario_DocumentoIdentidad
        FOREIGN KEY (DocumentoIdentidadId) REFERENCES dbo.DocumentoIdentidad(Id),

    CONSTRAINT CK_Beneficiario_Sexo CHECK (Sexo IN ('M','F')),
    CONSTRAINT CK_Beneficiario_FechaNacimiento CHECK (FechaNacimiento <= CAST(GETDATE() AS DATE))
);
GO


CREATE INDEX IX_Beneficiario_DocumentoIdentidadId
ON dbo.Beneficiario(DocumentoIdentidadId);
GO

CREATE INDEX IX_Beneficiario_NumeroDocumento
ON dbo.Beneficiario(NumeroDocumento);
GO

INSERT INTO dbo.DocumentoIdentidad (Nombre, Abreviatura, Pais, Longitud, SoloNumeros, Activo)
VALUES
('Documento Nacional de Identidad', 'DNI', 'Perú', 8, 1, 1),
('Carné de Extranjería',            'CE',  'Perú', 9, 1, 1),
('Pasaporte',                       'PAS', 'Perú', 9, 0, 1),
('Cédula de Identidad',             'CI',  'Chile', 9, 1, 1),
('Pasaporte',                       'PASS','Chile', 9, 0, 0); 
GO


