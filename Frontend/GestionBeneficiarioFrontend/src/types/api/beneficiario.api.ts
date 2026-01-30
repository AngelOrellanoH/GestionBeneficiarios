export interface BeneficiarioResponseDtoApi {
  id: number;
  nombres: string;
  apellidos: string;

  documentoIdentidadId: number;
  numeroDocumento: string;

  fechaNacimiento: string; 
  sexo: "M" | "F";

  documentoNombre?: string | null;
  documentoAbreviatura?: string | null;
}

export interface BeneficiarioCreateDtoApi {
  nombres: string;
  apellidos: string;
  documentoIdentidadId: number;
  numeroDocumento: string;
  fechaNacimiento: string;
  sexo: "M" | "F";
}

export interface BeneficiarioUpdateDtoApi extends BeneficiarioCreateDtoApi {}

