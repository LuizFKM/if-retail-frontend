import { Outlet } from "react-router-dom"
import AdminSidebar from "../components/AdminSIdebar.jsx" // typo no nome do arquivo mantido intencionalmente

function PainelAdmin() {
  return (
    <div className="flex min-h-screen bg-paper-fundo-principal">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default PainelAdmin
