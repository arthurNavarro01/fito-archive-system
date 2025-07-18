import React from 'react';
import { FaCheckCircle, FaMapMarkerAlt, FaArrowLeft, FaEdit, FaDownload, FaPrint } from 'react-icons/fa';

const mockDocumento = {
  nome: 'Contrato de Prestação de Serviços',
  responsavel: 'Carlos Eduardo Mendes',
  setor: 'Departamento Administrativo',
  tipo: 'Intermediário',
  dataDocumento: '15/03/2023',
  dataDescarte: '15/03/2028',
  status: 'Válido',
  localizacao: {
    rua: 'A',
    estante: '05',
    andar: '02',
    posicao: 'C3',
  },
};

const statusColor = {
  'Válido': 'bg-green-100 text-green-700',
  'A Vencer': 'bg-yellow-100 text-yellow-800',
  'Vencido': 'bg-red-100 text-red-700',
};

const VisualizacaoDocumento: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8 min-h-[70vh] p-6 md:p-10 bg-[#f7fafd]">
      {/* Preview do documento */}
      <div className="flex-1 bg-white rounded-2xl shadow-md p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <button className="text-[#2563eb] hover:underline flex items-center gap-1 text-sm font-medium"><FaArrowLeft /> Voltar</button>
          <span className="text-lg font-semibold ml-4">{mockDocumento.nome}</span>
        </div>
        <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-[#23272f] rounded-xl border border-gray-100 dark:border-gray-700 min-h-[400px]">
          {/* Mock de preview do PDF/texto */}
          <div className="w-full max-w-2xl h-96 flex flex-col items-center justify-center">
            <span className="text-gray-400 dark:text-gray-300 text-2xl mb-2">[Preview do PDF]</span>
            <div className="text-xs text-gray-400 dark:text-gray-300">Página 1 de 10</div>
          </div>
        </div>
      </div>
      {/* Detalhes do documento */}
      <aside className="w-full md:w-96 bg-white rounded-2xl shadow-md p-6 flex flex-col gap-6">
        <h3 className="text-lg font-bold text-[#2563eb] mb-2">Detalhes do Documento</h3>
        <div className="flex flex-col gap-2">
          <div className="text-xs text-gray-500 dark:text-gray-300">INFORMAÇÕES GERAIS</div>
          <div className="font-semibold text-gray-800 dark:text-gray-100">{mockDocumento.nome}</div>
          <div className="text-sm text-gray-700 dark:text-gray-200">Responsável: <b>{mockDocumento.responsavel}</b></div>
          <div className="text-sm text-gray-700 dark:text-gray-200">Setor: <b>{mockDocumento.setor}</b></div>
          <div className="text-sm text-gray-700 dark:text-gray-200">Tipo: <b>{mockDocumento.tipo}</b></div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-xs text-gray-500 dark:text-gray-300">DATAS</div>
          <div className="text-sm text-gray-700 dark:text-gray-200">Data do Documento: <b>{mockDocumento.dataDocumento}</b></div>
          <div className="text-sm text-gray-700 dark:text-gray-200">Data de Descarte: <b>{mockDocumento.dataDescarte}</b></div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-xs text-gray-500 dark:text-gray-300">STATUS</div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold w-fit ${statusColor[mockDocumento.status]}`}>{mockDocumento.status}</span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-xs text-gray-500 dark:text-gray-300">LOCALIZAÇÃO FÍSICA</div>
          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200"><FaMapMarkerAlt /> Rua: <b>{mockDocumento.localizacao.rua}</b></div>
          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">Estante: <b>{mockDocumento.localizacao.estante}</b></div>
          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">Andar: <b>{mockDocumento.localizacao.andar}</b></div>
          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">Posição: <b>{mockDocumento.localizacao.posicao}</b></div>
        </div>
        <div className="flex gap-2 mt-4">
          <button className="flex-1 px-4 py-2 rounded-lg bg-gray-100 dark:bg-[#23272f] text-gray-700 dark:text-gray-100 font-medium hover:bg-gray-200 dark:hover:bg-[#232837] flex items-center gap-2"> <FaArrowLeft /> Voltar</button>
          <button className="flex-1 px-4 py-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 font-medium hover:bg-blue-200 dark:hover:bg-blue-800 flex items-center gap-2"><FaEdit /> Editar</button>
        </div>
        <div className="flex gap-2 mt-2">
          <button className="flex-1 px-4 py-2 rounded-lg bg-gray-100 dark:bg-[#23272f] text-gray-700 dark:text-gray-100 font-medium hover:bg-gray-200 dark:hover:bg-[#232837] flex items-center gap-2"><FaDownload /> Baixar PDF</button>
          <button className="flex-1 px-4 py-2 rounded-lg bg-[#2563eb] text-white font-medium hover:bg-[#1e40af] flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2 focus:ring-offset-gray-900 dark:focus:ring-offset-[#181f2a]"><FaPrint /> Imprimir</button>
        </div>
      </aside>
    </div>
  );
};

export default VisualizacaoDocumento; 