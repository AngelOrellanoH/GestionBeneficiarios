import type { BeneficiarioResponseDtoApi } from "../../types/api/beneficiario.api";
import type { Beneficiario } from "../../types/ui/beneficiario.ui";

export const mapBeneficiarioApiToUi = (b: BeneficiarioResponseDtoApi | any): Beneficiario => ({
  id: b.Id ?? b.id,
  nombres: b.Nombres ?? b.nombres,
  apellidos: b.Apellidos ?? b.apellidos,
  documentoIdentidadId: b.DocumentoIdentidadId ?? b.documentoIdentidadId,
  numeroDocumento: b.NumeroDocumento ?? b.numeroDocumento,
  fechaNacimiento: b.FechaNacimiento ?? b.fechaNacimiento,
  sexo: ((b.Sexo ?? b.sexo) === "M" ? "M" : "F"),
  documentoNombre: b.DocumentoNombre ?? b.documentoNombre ?? null,
  documentoAbreviatura: b.DocumentoAbreviatura ?? b.documentoAbreviatura ?? null,
});
