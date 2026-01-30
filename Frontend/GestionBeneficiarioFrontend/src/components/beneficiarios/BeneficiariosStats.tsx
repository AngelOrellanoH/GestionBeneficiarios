type Props = {
  total: number;
  hombres: number;
  mujeres: number;
};

export default function BeneficiarioStats({ total, hombres, mujeres }: Props) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="rounded-lg border border-border bg-card p-4">
        <p className="mb-1 text-xs font-medium text-muted-foreground">Total de Beneficiarios</p>
        <p className="text-2xl font-bold text-foreground">{total}</p>
      </div>

      <div className="rounded-lg border border-border bg-card p-4">
        <p className="mb-1 text-xs font-medium text-muted-foreground">Hombres</p>
        <p className="text-2xl font-bold text-primary">{hombres}</p>
      </div>

      <div className="rounded-lg border border-border bg-card p-4">
        <p className="mb-1 text-xs font-medium text-muted-foreground">Mujeres</p>
        <p className="text-2xl font-bold text-accent">{mujeres}</p>
      </div>
    </div>
  );
}
