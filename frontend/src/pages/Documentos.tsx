
import React from 'react';
import { FaFilePdf, FaTrash, FaEdit, FaSearch } from 'react-icons/fa';

// Exemplo de dados mockados (substitua por dados reais depois)
const documentos = [
  { id: 1, nome: 'Contrato 2024', setor: 'TI', tipo: 'PDF', status: 'Arquivado', data: '2024-01-10' },
  { id: 2, nome: 'Relatório RH', setor: 'RH', tipo: 'PDF', status: 'Descarte Pendente', data: '2024-02-15' },
  { id: 3, nome: 'Fatura 123', setor: 'Financeiro', tipo: 'PDF', status: 'Arquivado', data: '2024-03-01' },
  { id: 4, nome: 'Processo 456', setor: 'Jurídico', tipo: 'PDF', status: 'Consultado', data: '2024-03-20' },
];

const statusColor = {
  'Arquivado': 'bg-green-100 text-green-700',
  'Descarte Pendente': 'bg-yellow-100 text-yellow-800',
  'Consultado': 'bg-blue-100 text-blue-700',
  'Descartado': 'bg-gray-200 text-gray-600',
};

const Documentos: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-[#2563eb]">Documentos</h2>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Buscar documento..."
            className="px-4 py-2 rounded-lg border border-[#e5e7eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb] bg-[#f1f5f9] text-[#1e293b]"
          />
          <button className="bg-[#2563eb] hover:bg-[#1e40af] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 shadow-md">
            <FaSearch /> Buscar
          </button>
        </div>
      </div>
      {/* Tabela para desktop */}
      <div className="hidden md:block">
        <table className="w-full rounded-2xl overflow-hidden shadow-lg">
          <thead className="bg-[#2563eb] text-white">
            <tr>
              <th className="py-3 px-4 text-left">Nome</th>
              <th className="py-3 px-4 text-left">Setor</th>
              <th className="py-3 px-4 text-left">Tipo</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Data</th>
              <th className="py-3 px-4 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {documentos.map((doc, idx) => (
              <tr key={doc.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#f1f5f9] hover:bg-[#e0e7ef]'}>
                <td className="py-3 px-4 font-medium flex items-center gap-2"><FaFilePdf className="text-[#2563eb]" /> {doc.nome}</td>
                <td className="py-3 px-4">{doc.setor}</td>
                <td className="py-3 px-4">{doc.tipo}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor[doc.status as keyof typeof statusColor]}`}>{doc.status}</span>
                </td>
                <td className="py-3 px-4">{doc.data}</td>
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
        {documentos.map(doc => (
          <div key={doc.id} className="bg-white rounded-2xl shadow p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#2563eb] font-bold"><FaFilePdf /> {doc.nome}</div>
            <div className="flex gap-2 text-sm text-[#64748b]">
              <span>{doc.setor}</span> | <span>{doc.tipo}</span> | <span>{doc.data}</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor[doc.status as keyof typeof statusColor]}`}>{doc.status}</span>
              <button className="p-2 rounded-full hover:bg-[#e0e7ef] transition"><FaEdit className="text-[#2563eb]" /></button>
              <button className="p-2 rounded-full hover:bg-red-100 transition"><FaTrash className="text-red-500" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Documentos;
