import { useMemo, useState } from "react";
import { ChevronLeft, Plus } from "lucide-react";


import Header from "../components/layout/Header";
import BeneficiarioForm from "../components/beneficiarios/BeneficiarioForm";

import { Button } from "../components/ui/button";

import { useBeneficiariosData } from "../hooks/useBeneficiariosData";
import {
  crearBeneficiario,
  actualizarBeneficiario,
  eliminarBeneficiario,
  obtenerBeneficiario,
} from "../api/beneficiarios.service";

import type { Beneficiario, BeneficiarioCreateDto, BeneficiarioUpdateDto } from "../types/ui/beneficiario.ui";
import BeneficiariosList from "../components/beneficiarios/BeneficiariosList";
import BeneficiariosStats from "../components/beneficiarios/BeneficiariosStats";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";


export default function BeneficiariosPage() {
  const { beneficiarios, documentos, loading, error, setBeneficiarios, reload } = useBeneficiariosData();

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editing, setEditing] = useState<Beneficiario | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<Beneficiario | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);


  const closeDelete = () => setDeleteTarget(null);

  const stats = useMemo(() => {
    const total = beneficiarios.length;
    const hombres = beneficiarios.filter((b) => b.sexo === "M").length;
    const mujeres = beneficiarios.filter((b) => b.sexo === "F").length;
    
    return {
        total,
        hombres,
        mujeres,
    };

  }, [beneficiarios]);

  const openCreate = () => {
    setEditing(null);
    setIsFormVisible(true);
  };

  const openEdit = (b: Beneficiario) => {
    setEditing(b);
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
    setEditing(null);
  };

  async function onCreate(dto: BeneficiarioCreateDto) {
    setIsSaving(true);
    try {
      const createdPartial = await crearBeneficiario(dto); 
      const createdFull = await obtenerBeneficiario(createdPartial.id); 

      setBeneficiarios((prev) => [createdFull, ...prev]);
      closeForm();
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  }

  async function onUpdate(dto: BeneficiarioUpdateDto) {
    if (!editing) return;

    setIsSaving(true);
    try {
      await actualizarBeneficiario(editing.id, dto);
      const updatedFull = await obtenerBeneficiario(editing.id);

      setBeneficiarios((prev) =>
        prev.map((x) => (x.id === editing.id ? updatedFull : x))
      );

      closeForm();
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  }

  function onAskDelete(b: Beneficiario) {
    setDeleteTarget(b);
  }

  async function onConfirmDelete() {
    if (!deleteTarget) return;

    const id = deleteTarget.id;
    const before = beneficiarios;

    setIsDeleting(true);
    setBeneficiarios((prev) => prev.filter((x) => x.id !== id)); 

    try {
      await eliminarBeneficiario(id);
      closeDelete();
    } catch (e) {
      console.error(e);
      setBeneficiarios(before); 
    } finally {
      setIsDeleting(false);
    }
  }


  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {loading && <div className="text-sm text-muted-foreground">Cargando...</div>}

        {error && (
          <div className="rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
            {error}
            <div className="mt-2">
              <Button variant="outline" onClick={reload}>
                Reintentar
              </Button>
            </div>
          </div>
        )}

        {!loading && !error && (
          <>
            {isFormVisible ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={closeForm}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Volver a la lista
                  </Button>
                </div>

                <BeneficiarioForm
                  documentos={documentos}
                  initialData={editing ?? undefined}
                  onSubmit={editing ? onUpdate : onCreate}
                  onCancel={closeForm}
                  isLoading={isSaving}
                />
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-balance text-3xl font-bold text-foreground">Gestión de Beneficiarios</h2>
                    <p className="mt-2 text-muted-foreground">
                      Administra y registra los beneficiarios del programa social multi-país
                    </p>
                  </div>

                  <Button
                    onClick={openCreate}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Agregar Beneficiario
                  </Button>
                </div>

                <BeneficiariosList
                  beneficiarios={beneficiarios}
                  documentos={documentos}
                  onEdit={openEdit}
                  onDelete={onAskDelete}
                />

                <BeneficiariosStats
                  total={stats.total}
                  hombres={stats.hombres}
                  mujeres={stats.mujeres}
                />
              </div>
            )}
          </>
        )}
      </div>

      <ConfirmDeleteModal
        open={!!deleteTarget}
        title="Eliminar beneficiario"
        description={
          deleteTarget
            ? `¿Seguro que deseas eliminar a "${deleteTarget.nombres} ${deleteTarget.apellidos}"? Esta acción no se puede deshacer.`
            : "¿Seguro que deseas eliminar este beneficiario?"
        }
        isLoading={isDeleting}
        onClose={closeDelete}
        onConfirm={onConfirmDelete}
      />
    </main>
  );
}
