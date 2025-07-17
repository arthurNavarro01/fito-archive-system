
import React from 'react';
import { FaBox, FaTrash, FaEdit, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

// Exemplo de dados mockados (substitua por dados reais depois)
const caixas = [
  { id: 1, numero: 'CX-001', setor: 'TI', status: 'Disponível', capacidade: 50, ocupada: 32 },
  { id: 2, numero: 'CX-002', setor: 'RH', status: 'Cheia', capacidade: 50, ocupada: 50 },
  { id: 3, numero: 'CX-003', setor: 'Financeiro', status: 'Em Manutenção', capacidade: 50, ocupada: 10 },
  { id: 4, numero: 'CX-004', setor: 'Jurídico', status: 'Indisponível', capacidade: 50, ocupada: 0 },
];

const statusColor = {
  'Disponível': 'bg-green-100 text-green-700',
  'Cheia': 'bg-yellow-100 text-yellow-800',
  'Indisponível': 'bg-gray-200 text-gray-600',
  'Em Manutenção': 'bg-blue-100 text-blue-700',
};
const statusIcon = {
  'Disponível': <FaCheckCircle className="text-green-500" />,
  'Cheia': <FaExclamationCircle className="text-yellow-500" />,
  'Indisponível': <FaExclamationCircle className="text-gray-500" />,
  'Em Manutenção': <FaExclamationCircle className="text-blue-500" />,
};

const Caixas: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 bg-white dark:bg-[#181f2a] dark:text-gray-100 transition-colors min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-[#2563eb]">Caixas</h2>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Buscar caixa..."
            className="px-4 py-2 rounded-lg border border-[#e5e7eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb] bg-[#f1f5f9] text-[#1e293b]"
          />
          <button className="bg-[#2563eb] hover:bg-[#1e40af] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 shadow-md">
            <FaBox /> Buscar
          </button>
        </div>
      </div>
      {/* Tabela para desktop */}
      <div className="hidden md:block">
        <table className="w-full rounded-2xl overflow-hidden shadow-lg">
          <thead className="bg-[#2563eb] text-white">
            <tr>
              <th className="py-3 px-4 text-left">Número</th>
              <th className="py-3 px-4 text-left">Setor</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Capacidade</th>
              <th className="py-3 px-4 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {caixas.map((caixa, idx) => (
              <tr key={caixa.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#f1f5f9] hover:bg-[#e0e7ef]'}>
                <td className="py-3 px-4 font-medium flex items-center gap-2"><FaBox className="text-[#2563eb]" /> {caixa.numero}</td>
                <td className="py-3 px-4">{caixa.setor}</td>
                <td className="py-3 px-4 flex items-center gap-2">
                  {statusIcon[caixa.status as keyof typeof statusIcon]}
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor[caixa.status as keyof typeof statusColor]}`}>{caixa.status}</span>
                </td>
                <td className="py-3 px-4">{caixa.ocupada} / {caixa.capacidade}</td>
                <td className="py-3 px-4 flex gap-2 justify-center">
                  <button className="p-2 rounded-full hover:bg-[#e0e7ef] transition"><FaEdit className="text-[#2563eb]" /></button>
                  <button className="p-2 rounded-full hover:bg-red-100 transition"><FaTrash className="text-red-500" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Cards para mobile */}
      <div className="md:hidden flex flex-col gap-4">
        {caixas.map(caixa => (
          <div key={caixa.id} className="bg-white rounded-2xl shadow p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#2563eb] font-bold"><FaBox /> {caixa.numero}</div>
            <div className="flex gap-2 text-sm text-[#64748b]">
              <span>{caixa.setor}</span> | <span>{caixa.ocupada} / {caixa.capacidade}</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              {statusIcon[caixa.status as keyof typeof statusIcon]}
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor[caixa.status as keyof typeof statusColor]}`}>{caixa.status}</span>
              <button className="p-2 rounded-full hover:bg-[#e0e7ef] transition"><FaEdit className="text-[#2563eb]" /></button>
              <button className="p-2 rounded-full hover:bg-red-100 transition"><FaTrash className="text-red-500" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Caixas;
