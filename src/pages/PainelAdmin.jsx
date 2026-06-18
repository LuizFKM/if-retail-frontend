import AdminSidebar from "../components/AdminSIdebar.jsx";


function PainelAdmin() {
    return (
        // flex e min-h-screen garantem que o layout ocupe a tela toda lado a lado
        <div className="flex min-h-screen bg-paper-fundo-principal">

            {/* O Menu Lateral Fixo */}
            <AdminSidebar />

            {/* Área de Conteúdo Principal */}
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-5xl mx-auto">
                    <h1 className="font-serif text-3xl text-coffee-primaria mb-6">
                        Visão Geral
                    </h1>

                    {/* Aqui entrarão os próximos componentes que vamos criar
                        (tabelas, formulários de cadastro, etc.) */}
                    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 min-h-[400px]">
                        <p className="text-ink-texto">Selecione uma opção no menu lateral para começar.</p>
                    </div>
                </div>
            </main>

        </div>
    );
}

export default PainelAdmin;