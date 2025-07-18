
import React from 'react';
import { useNavigate } from 'react-router-dom';

const caixasMock = [
  { id: 'CX-001', local: 'Rua A, Estante 1, Andar 2, Pos 3', capacidade: 50, ocupacao: 0, status: 'Vazia', percentual: 0 },
  { id: 'CX-002', local: 'Rua A, Estante 1, Andar 3, Pos 1', capacidade: 50, ocupacao: 12, status: 'Parcial', percentual: 24 },
  { id: 'CX-003', local: 'Rua B, Estante 2, Andar 2, Pos 2', capacidade: 50, ocupacao: 28, status: 'Parcial', percentual: 56 },
  { id: 'CX-004', local: 'Rua B, Estante 3, Andar 2, Pos 4', capacidade: 50, ocupacao: 42, status: 'Parcial', percentual: 84 },
  { id: 'CX-005', local: 'Rua C, Estante 1, Andar 1, Pos 1', capacidade: 50, ocupacao: 50, status: 'Cheia', percentual: 100 },
  { id: 'CX-006', local: 'Rua C, Estante 2, Andar 3, Pos 2', capacidade: 50, ocupacao: 18, status: 'Parcial', percentual: 36 },
];

const statusBadge = {
  'Vazia': 'bg-green-100 text-green-700',
  'Parcial': 'bg-yellow-100 text-yellow-800',
  'Cheia': 'bg-red-100 text-red-700',
};
const statusBadgeDark = {
  'Vazia': 'dark:bg-green-900 dark:text-green-200',
  'Parcial': 'dark:bg-yellow-900 dark:text-yellow-200',
  'Cheia': 'dark:bg-red-900 dark:text-red-200',
};
const statusBar = {
  'Vazia': 'bg-green-500',
  'Parcial': 'bg-yellow-400',
  'Cheia': 'bg-red-500',
};

const Caixas: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#f7fafd] dark:bg-[#181f2a] flex flex-col px-2 py-10">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto mb-6">
        <h1 className="text-3xl font-bold text-[#2563eb]">Listagem de Caixas</h1>
        <button className="bg-[#2563eb] hover:bg-[#1e40af] text-white px-6 py-2 rounded-lg font-semibold transition-all shadow focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-[#181f2a]" onClick={() => navigate('/nova-caixa')}>+ Nova Caixa</button>
      </div>
      <div className="w-full max-w-7xl mx-auto bg-white dark:bg-[#23272f] rounded-2xl shadow-lg p-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">Caixas Cadastradas</h2>
        <div className="flex flex-wrap gap-4 mb-6 items-end">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-200 mb-1">Rua</label>
            <select className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#23272f] text-gray-700 dark:text-gray-100 min-w-[110px]">
              <option>Todas</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-200 mb-1">Estante</label>
            <select className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#23272f] text-gray-700 dark:text-gray-100 min-w-[110px]">
              <option>Todas</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-200 mb-1">Andar</label>
            <select className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#23272f] text-gray-700 dark:text-gray-100 min-w-[110px]">
              <option>Todos</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-200 mb-1">Status</label>
            <select className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#23272f] text-gray-700 dark:text-gray-100 min-w-[110px]">
              <option>Todos</option>
            </select>
          </div>
          <div className="flex-1 min-w-[180px]">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-200 mb-1">Buscar</label>
            <input type="text" className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#23272f] text-gray-700 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400 w-full" placeholder="Buscar por código, localização..." />
          </div>
          <button className="bg-[#2563eb] hover:bg-[#1e40af] text-white px-6 py-2 rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-[#181f2a]">Filtrar</button>
        </div>
        <div className="overflow-x-auto rounded-2xl">
          <table className="w-full rounded-2xl overflow-hidden shadow bg-white dark:bg-[#23272f] text-gray-900 dark:text-gray-100">
            <thead>
              <tr className="bg-gray-100 dark:bg-[#232837] text-gray-700 dark:text-gray-200">
                <th className="py-3 px-4 text-left">ID/Código</th>
                <th className="py-3 px-4 text-left">Localização</th>
                <th className="py-3 px-4 text-left">Capacidade Total</th>
                <th className="py-3 px-4 text-left">Ocupação Atual</th>
                <th className="py-3 px-4 text-left">Percentual</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {caixasMock.map((caixa, i) => (
                <tr key={caixa.id} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4 font-medium">{caixa.id}</td>
                  <td className="py-3 px-4">{caixa.local}</td>
                  <td className="py-3 px-4">{caixa.capacidade} documentos</td>
                  <td className="py-3 px-4">{caixa.ocupacao} documentos</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <div className={`h-2 rounded-full ${statusBar[caixa.status as keyof typeof statusBar]}`} style={{ width: `${caixa.percentual}%` }} />
                      </div>
                      <span className="text-xs text-gray-700 dark:text-gray-200">{caixa.percentual}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadge[caixa.status as keyof typeof statusBadge]} ${statusBadgeDark[caixa.status as keyof typeof statusBadgeDark]}`}>{caixa.status}</span>
                  </td>
                  <td className="py-3 px-4 flex gap-2 justify-center">
                    <button className="p-2 rounded-full hover:bg-[#e0e7ef] dark:hover:bg-[#232837] transition" title="Ver"><span className="sr-only">Ver</span><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M2.05 12a9.94 9.94 0 0 1 19.9 0 9.94 9.94 0 0 1-19.9 0Z"/></svg></button>
                    <button className="p-2 rounded-full hover:bg-[#fef3c7] dark:hover:bg-yellow-900 transition" title="Editar"><span className="sr-only">Editar</span><svg width="18" height="18" fill="none" stroke="#fbbf24" strokeWidth="2" viewBox="0 0 24 24"><path d="M16.862 5.487l1.65 1.65a2.121 2.121 0 0 1 0 3l-8.486 8.486a2 2 0 0 1-.707.464l-4.243 1.415 1.415-4.243a2 2 0 0 1 .464-.707l8.486-8.486a2.121 2.121 0 0 1 3 0Z"/><path d="M15 7l2 2"/></svg></button>
                    <button className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition" title="Excluir"><span className="sr-only">Excluir</span><svg width="18" height="18" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 6h18"/><path d="M8 6v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M5 6V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2"/></svg></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Paginação */}
        <div className="flex justify-center mt-6">
          <nav className="flex gap-1">
            {[1,2,3,4,5].map(p => (
              <button key={p} className={`w-8 h-8 rounded flex items-center justify-center font-medium border ${p === 1 ? 'bg-[#2563eb] text-white border-[#2563eb]' : 'bg-white dark:bg-[#23272f] text-gray-700 dark:text-gray-100 border-gray-200 dark:border-gray-700'} transition`}>{p}</button>
            ))}
          </nav>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-300 mt-2 text-center">Mostrando 1-6 de 24 resultados</div>
      </div>
    </div>
  );
};

export default Caixas;
