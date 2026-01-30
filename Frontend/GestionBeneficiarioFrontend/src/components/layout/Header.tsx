import { Users } from "lucide-react"

function Header() {
  return (
    <header className="!border-b !border-border !bg-card">
      <div className="!flex !items-center !justify-between !px-6 !py-4">
        <div className="!flex !items-center !gap-3">
          <div className="!flex !h-10 !w-10 !items-center !justify-center !rounded-lg !bg-primary">
            <Users className="!h-6 !w-6 !text-primary-foreground" />
          </div>
          <div>
            <h1 className="!text-2xl !font-bold !text-foreground">
              Sistema de Beneficiarios
            </h1>
            <p className="!text-sm !text-muted-foreground">
              Gestión de programa social multi-país
            </p>
          </div>
        </div>
        <div className="!text-right">
          <p className="!text-sm !font-medium !text-foreground">PowerMas</p>
          <p className="!text-xs !text-muted-foreground">
            {new Date().toLocaleDateString("es-PE")}
          </p>
        </div>
      </div>
    </header>
  )
}

export default Header
