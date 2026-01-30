export interface DocumentoIdentidadApi {
  id: number;
  nombre: string;
  abreviatura?: string | null;
  pais?: string | null;
  longitud: number;
  soloNumeros: boolean;
  activo: boolean;
}
