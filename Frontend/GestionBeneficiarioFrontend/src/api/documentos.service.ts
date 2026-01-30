import { http } from "../api/http";
import type { DocumentoIdentidadApi } from "../types/api/documento.api";
import type { DocumentoIdentidad } from "../types/ui/documento.ui";
import { mapDocumentoApiToUi } from "../utils/mappers/documento.mapper";

const BASE = "/api/documentos-identidad";

export async function listarDocumentosIdentidad(): Promise<DocumentoIdentidad[]> {
  const data = await http<DocumentoIdentidadApi[]>(BASE);
  return data.map(mapDocumentoApiToUi);
}
