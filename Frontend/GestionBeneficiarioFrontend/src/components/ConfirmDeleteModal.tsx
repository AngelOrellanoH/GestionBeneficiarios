import { AlertTriangle, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";


type Props = {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

export default function ConfirmDeleteModal({
  open,
  title = "Confirmar eliminación",
  description = "Esta acción no se puede deshacer.",
  confirmText = "Sí, eliminar",
  cancelText = "Cancelar",
  isLoading = false,
  onConfirm,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onMouseDown={onClose} 
    >
      <div
        className="w-full max-w-md"
        onMouseDown={(e) => e.stopPropagation()} 
      >
        <Card className="border border-border bg-card">
          <CardHeader className="flex flex-row items-start justify-between gap-4 border-b border-border">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <CardTitle className="text-foreground">{title}</CardTitle>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-muted-foreground hover:bg-secondary/40"
              onClick={onClose}
              disabled={isLoading}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="space-y-5 pt-5">
            <p className="text-sm text-muted-foreground">{description}</p>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
                className="bg-transparent"
              >
                {cancelText}
              </Button>

              <Button
                type="button"
                onClick={onConfirm}
                disabled={isLoading}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {isLoading ? "Eliminando..." : confirmText}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
