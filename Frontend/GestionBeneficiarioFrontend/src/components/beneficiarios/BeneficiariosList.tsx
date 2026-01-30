import { Calendar, Edit2, FileText, MapPin, Trash2, Users } from "lucide-react";


import type { Beneficiario } from "../../types/ui/beneficiario.ui";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { DocumentoIdentidad } from "../../types/ui/documento.ui";



type Props = {
  beneficiarios: Beneficiario[];
  documentos: DocumentoIdentidad[];
  onEdit: (b: Beneficiario) => void;
  onDelete: (b: Beneficiario) => void;
};

export default function BeneficiarioList({ beneficiarios, documentos, onEdit, onDelete }: Props) {
  const getDocNombre = (id: number) => documentos.find((d) => d.id === id)?.nombre ?? "Desconocido";
  const getDocPais = (id: number) => documentos.find((d) => d.id === id)?.pais ?? "";

  const formatFecha = (fecha: string) =>
    new Date(fecha).toLocaleDateString("es-PE", { year: "numeric", month: "long", day: "numeric" });

  const sexoLabel = (sexo: string) => (sexo === "M" ? "Masculino" : "Femenino");

  if (beneficiarios.length === 0) {
    return (
      <Card className="border border-border bg-card">
        <CardContent className="pb-12 pt-12 text-center">
          <Users className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
          <p className="mb-2 text-muted-foreground">No hay beneficiarios registrados</p>
          <p className="text-sm text-muted-foreground">Agrega tu primer beneficiario para comenzar</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border border-border bg-card">
      <CardHeader className="border-b border-border">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Users className="h-5 w-5 text-primary" />
          Beneficiarios Registrados ({beneficiarios.length})
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Nombre Completo</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Documento</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">País</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Fecha de Nacimiento</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Sexo</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-foreground">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {beneficiarios.map((b, index) => (
                <tr
                  key={b.id}
                  className={`border-b border-border transition-colors hover:bg-secondary/30 ${
                    index % 2 === 0 ? "bg-background" : "bg-card"
                  }`}
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-foreground">
                        {b.nombres} {b.apellidos}
                      </p>
                      <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                        <FileText className="h-3 w-3" />
                        {b.numeroDocumento}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                      {b.documentoNombre ?? getDocNombre(b.documentoIdentidadId)}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {getDocPais(b.documentoIdentidadId)}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {formatFecha(b.fechaNacimiento)}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-block rounded-md bg-secondary/50 px-3 py-1 text-sm text-foreground">
                      {sexoLabel(b.sexo)}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        onClick={() => onEdit(b)}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-muted-foreground hover:bg-primary/10 hover:text-primary"
                      >
                        <Edit2 className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>

                      <Button
                        onClick={() => onDelete(b)}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Eliminar</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
