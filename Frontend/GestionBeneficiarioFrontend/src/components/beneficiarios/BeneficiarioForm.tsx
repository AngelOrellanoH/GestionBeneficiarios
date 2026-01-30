import { useEffect, useMemo, useState } from "react";
import { AlertCircle, Check } from "lucide-react";

import type { Beneficiario, BeneficiarioCreateDto, BeneficiarioUpdateDto } from "../../types/ui/beneficiario.ui";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

import type { DocumentoIdentidad } from "../../types/ui/documento.ui";
import { toDateInputValue } from "../../lib/utils";

type Props = {
  documentos: DocumentoIdentidad[];
  initialData?: Beneficiario;
  onSubmit: (data: BeneficiarioCreateDto | BeneficiarioUpdateDto) => void;
  onCancel: () => void;
  isLoading?: boolean;
};

export default function BeneficiarioForm({
  documentos,
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: Props) {
 const [formData, setFormData] = useState<BeneficiarioCreateDto>({
    nombres: "",
    apellidos: "",
    documentoIdentidadId: 0,
    numeroDocumento: "",
    fechaNacimiento: "",
    sexo: "M",
  });

  useEffect(() => {
    if (initialData) {
      const { id, documentoNombre, documentoAbreviatura, ...rest } = initialData as any;
      setFormData({
        ...rest,
        fechaNacimiento: toDateInputValue(rest.fechaNacimiento),
      });
    } else {
      setFormData({
        nombres: "",
        apellidos: "",
        documentoIdentidadId: 0,
        numeroDocumento: "",
        fechaNacimiento: "",
        sexo: "M",
      });
    }
  }, [initialData]);


  const [errors, setErrors] = useState<Record<string, string>>({});
  const [validationMessages, setValidationMessages] = useState<Record<string, string>>({});

  const activeDocs = useMemo(() => documentos.filter((d) => d.activo !== false), [documentos]);

  const selectedDocumento = useMemo(
    () => activeDocs.find((d) => d.id === formData.documentoIdentidadId),
    [activeDocs, formData.documentoIdentidadId]
  );

  const validateNumeroDocumento = (numero: string) => {
    if (!selectedDocumento) return { isValid: false, message: "" };
    if (numero.length === 0) return { isValid: false, message: "" };

    const longitud = selectedDocumento.longitud ?? null;
    const soloNumeros = selectedDocumento.soloNumeros ?? false;

    if (soloNumeros && !/^\d+$/.test(numero)) {
      return { isValid: false, message: `Solo se aceptan números (${selectedDocumento.nombre})` };
    }

    if (longitud) {
      if (numero.length < longitud) {
        return { isValid: false, message: `Mínimo ${longitud} caracteres (${numero.length}/${longitud})` };
      }
      if (numero.length > longitud) {
        return { isValid: false, message: `Máximo ${longitud} caracteres (${numero.length}/${longitud})` };
      }
    }

    return { isValid: true, message: `${selectedDocumento.nombre} válido` };
  };

  const handleNumeroDocumentoChange = (value: string) => {
    setFormData((prev) => ({ ...prev, numeroDocumento: value }));

    if (!selectedDocumento) return;
    const validation = validateNumeroDocumento(value);
    setValidationMessages((prev) => ({ ...prev, numeroDocumento: value ? validation.message : "" }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombres.trim()) newErrors.nombres = "Los nombres son requeridos";
    if (!formData.apellidos.trim()) newErrors.apellidos = "Los apellidos son requeridos";
    if (formData.documentoIdentidadId === 0) newErrors.documentoIdentidadId = "Selecciona un tipo de documento";
    if (!formData.numeroDocumento.trim()) newErrors.numeroDocumento = "El número de documento es requerido";
    if (!formData.fechaNacimiento) newErrors.fechaNacimiento = "La fecha de nacimiento es requerida";

    if (selectedDocumento && formData.numeroDocumento) {
      const v = validateNumeroDocumento(formData.numeroDocumento);
      if (!v.isValid) newErrors.numeroDocumento = v.message;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isNumeroDocumentoValid =
    !!selectedDocumento && !!formData.numeroDocumento && validateNumeroDocumento(formData.numeroDocumento).isValid;
    
  return (
    <Card className="border border-border bg-card">
      <CardHeader className="border-b border-border">
        <CardTitle className="text-xl text-foreground">
          {initialData ? "Editar Beneficiario" : "Agregar Nuevo Beneficiario"}
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (validateForm()) onSubmit(formData);
          }}
          className="space-y-6"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {/* Nombres */}
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Nombres <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                value={formData.nombres}
                onChange={(e) => setFormData((p) => ({ ...p, nombres: e.target.value }))}
                className={`w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder-muted-foreground transition-colors ${
                  errors.nombres ? "border-destructive focus:ring-2 focus:ring-destructive" : "border-input focus:ring-2 focus:ring-ring"
                } focus:outline-none`}
              />
              {errors.nombres && (
                <div className="mt-1 flex items-center gap-1 text-xs text-destructive">
                  <AlertCircle className="h-3 w-3" />
                  {errors.nombres}
                </div>
              )}
            </div>

            {/* Apellidos */}
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Apellidos <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                value={formData.apellidos}
                onChange={(e) => setFormData((p) => ({ ...p, apellidos: e.target.value }))}
                className={`w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder-muted-foreground transition-colors ${
                  errors.apellidos ? "border-destructive focus:ring-2 focus:ring-destructive" : "border-input focus:ring-2 focus:ring-ring"
                } focus:outline-none`}
              />
              {errors.apellidos && (
                <div className="mt-1 flex items-center gap-1 text-xs text-destructive">
                  <AlertCircle className="h-3 w-3" />
                  {errors.apellidos}
                </div>
              )}
            </div>

            {/* Tipo Documento */}
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Tipo de Documento <span className="text-destructive">*</span>
              </label>
              <select
                value={formData.documentoIdentidadId}
                onChange={(e) => {
                  const newId = Number(e.target.value);
                  setFormData((p) => ({ ...p, documentoIdentidadId: newId, numeroDocumento: "" }));
                  setValidationMessages((p) => ({ ...p, numeroDocumento: "" }));
                }}
                className={`w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground transition-colors ${
                  errors.documentoIdentidadId ? "border-destructive focus:ring-2 focus:ring-destructive" : "border-input focus:ring-2 focus:ring-ring"
                } focus:outline-none`}
              >
                <option value={0}>Selecciona un documento...</option>
                {activeDocs.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.nombre}{doc.abreviatura ? ` (${doc.abreviatura})` : ""}{doc.pais ? ` - ${doc.pais}` : ""}
                  </option>
                ))}
              </select>
              {errors.documentoIdentidadId && (
                <div className="mt-1 flex items-center gap-1 text-xs text-destructive">
                  <AlertCircle className="h-3 w-3" />
                  {errors.documentoIdentidadId}
                </div>
              )}
            </div>

            {/* Numero Documento */}
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Número de Documento <span className="text-destructive">*</span>
                {selectedDocumento?.longitud ? (
                  <span className="ml-2 font-normal text-muted-foreground">
                    ({selectedDocumento.longitud} caracteres{selectedDocumento.soloNumeros ? ", solo números" : ""})
                  </span>
                ) : null}
              </label>

              <input
                type="text"
                value={formData.numeroDocumento}
                onChange={(e) => handleNumeroDocumentoChange(e.target.value)}
                disabled={!selectedDocumento}
                maxLength={selectedDocumento?.longitud ?? 20}
                className={`w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder-muted-foreground transition-colors disabled:opacity-50 ${
                  isNumeroDocumentoValid
                    ? "border-green-500 focus:ring-2 focus:ring-green-500"
                    : errors.numeroDocumento
                    ? "border-destructive focus:ring-2 focus:ring-destructive"
                    : "border-input focus:ring-2 focus:ring-ring"
                } focus:outline-none`}
              />

              {validationMessages.numeroDocumento && (
                <div className={`mt-1 flex items-center gap-1 text-xs ${isNumeroDocumentoValid ? "text-green-600" : "text-destructive"}`}>
                  {isNumeroDocumentoValid ? <Check className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                  {validationMessages.numeroDocumento}
                </div>
              )}

              {errors.numeroDocumento && !validationMessages.numeroDocumento && (
                <div className="mt-1 flex items-center gap-1 text-xs text-destructive">
                  <AlertCircle className="h-3 w-3" />
                  {errors.numeroDocumento}
                </div>
              )}
            </div>

            {/* Fecha nacimiento */}
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Fecha de Nacimiento <span className="text-destructive">*</span>
              </label>
              <input
                type="date"
                value={formData.fechaNacimiento}
                onChange={(e) => setFormData((p) => ({ ...p, fechaNacimiento: e.target.value }))}
                className={`w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground transition-colors ${
                  errors.fechaNacimiento ? "border-destructive focus:ring-2 focus:ring-destructive" : "border-input focus:ring-2 focus:ring-ring"
                } focus:outline-none`}
              />
              {errors.fechaNacimiento && (
                <div className="mt-1 flex items-center gap-1 text-xs text-destructive">
                  <AlertCircle className="h-3 w-3" />
                  {errors.fechaNacimiento}
                </div>
              )}
            </div>

            {/* Sexo */}
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Sexo</label>
              <div className="flex gap-4 pt-1">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="sexo"
                    value="M"
                    checked={formData.sexo === "M"}
                    onChange={(e) => setFormData((p) => ({ ...p, sexo: e.target.value as "M" | "F" }))}
                    className="h-4 w-4 cursor-pointer accent-primary"
                  />
                  <span className="text-sm text-foreground">Masculino</span>
                </label>

                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="sexo"
                    value="F"
                    checked={formData.sexo === "F"}
                    onChange={(e) => setFormData((p) => ({ ...p, sexo: e.target.value as "M" | "F" }))}
                    className="h-4 w-4 cursor-pointer accent-primary"
                  />
                  <span className="text-sm text-foreground">Femenino</span>
                </label>
              </div>
            </div>
          </div>

          {/* acciones */}
          <div className="flex justify-end gap-3 border-t border-border pt-4">
            <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading} className="bg-transparent px-6">
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-primary px-6 text-primary-foreground hover:bg-primary/90">
              {isLoading ? "Guardando..." : "Guardar Beneficiario"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
