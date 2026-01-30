import type { DocumentoIdentidadApi } from "../../types/api/documento.api";
import type { DocumentoIdentidad } from "../../types/ui/documento.ui";

export const mapDocumentoApiToUi = (d: DocumentoIdentidadApi): DocumentoIdentidad => ({
  id: d.id,
  nombre: d.nombre,
  abreviatura: d.abreviatura ?? null,
  pais: d.pais ?? null,
  longitud: d.longitud,
  soloNumeros: d.soloNumeros,
  activo: d.activo,
});
