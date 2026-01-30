export type Sexo = "M" | "F";

export interface Beneficiario {
  id: number;
  nombres: string;
  apellidos: string;
  documentoIdentidadId: number;
  numeroDocumento: string;
  fechaNacimiento: string;
  sexo: Sexo;
  documentoNombre?: string | null;
  documentoAbreviatura?: string | null;
}

export type BeneficiarioCreateDto = Omit<Beneficiario, "id" | "documentoNombre" | "documentoAbreviatura">;
export type BeneficiarioUpdateDto = BeneficiarioCreateDto;