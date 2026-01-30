import { useEffect, useState } from "react";
import { listarBeneficiarios } from "../api/beneficiarios.service";


import type { Beneficiario } from "../types/ui/beneficiario.ui";
import type { DocumentoIdentidad } from "../types/ui/documento.ui";
import { listarDocumentosIdentidad } from "../api/documentos.service";

export function useBeneficiariosData() {
  const [beneficiarios, setBeneficiarios] = useState<Beneficiario[]>([]);
  const [documentos, setDocumentos] = useState<DocumentoIdentidad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const [b, d] = await Promise.all([
        listarBeneficiarios(),
        listarDocumentosIdentidad(),
      ]);

      setBeneficiarios(b);
      setDocumentos(d);
    } catch (e: any) {
      setError(e?.message ?? "Error cargando datos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return { beneficiarios, documentos, loading, error, setBeneficiarios, reload: load };
}
