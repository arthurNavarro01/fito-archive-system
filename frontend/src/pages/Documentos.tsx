
import React, { useState } from 'react';
import { FaFilePdf, FaTrash, FaEdit, FaSearch, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '../components/ui/table';

const setores = ['Todos', 'RH', 'Financeiro', 'Jurídico', 'Comercial', 'Marketing', 'Outros'];
const tipos = ['Todos', 'Corrente', 'Intermediário'];
const anos = ['Todos', '2024', '2023', '2022', '2021', '2020'];
const statusList = ['Todos', 'Válido', 'A Vencer', 'Vencido'];

const documentosMock = [
  {
    id: 'DOC-2023-001',
    nome: 'Contrato de Prestação de Serviços',
    responsavel: 'Ana Oliveira',
    setor: 'Jurídico',
    tipo: 'Corrente',
    dataDocumento: '15/01/2023',
    dataDescarte: '15/01/2025',
    status: 'Válido',
  },
  {
    id: 'DOC-2022-045',
    nome: 'Declaração de Imposto de Renda',
    responsavel: 'Roberto Santos',
    setor: 'Contabilidade',
    tipo: 'Intermediário',
    dataDocumento: '20/03/2022',
    dataDescarte: '20/03/2027',
    status: 'Válido',
  },
  {
    id: 'DOC-2023-018',
    nome: 'Folha de Pagamento',
    responsavel: 'Carla Mendes',
    setor: 'Recursos Humanos',
    tipo: 'Corrente',
    dataDocumento: '05/05/2023',
    dataDescarte: '05/05/2024',
    status: 'A Vencer',
  },
  {
    id: 'DOC-2021-102',
    nome: 'Relatório de Auditoria',
    responsavel: 'Paulo Ribeiro',
    setor: 'Financeiro',
    tipo: 'Intermediário',
    dataDocumento: '12/11/2021',
    dataDescarte: '12/11/2023',
    status: 'Vencido',
  },
  {
    id: 'DOC-2022-078',
    nome: 'Contrato de Aluguel',
    responsavel: 'Marcelo Costa',
    setor: 'Jurídico',
    tipo: 'Corrente',
    dataDocumento: '30/06/2022',
    dataDescarte: '30/06/2025',
    status: 'Válido',
  },
  {
    id: 'DOC-2023-032',
    nome: 'Notas Fiscais',
    responsavel: 'Fernanda Lima',
    setor: 'Financeiro',
    tipo: 'Corrente',
    dataDocumento: '18/03/2023',
    dataDescarte: '18/03/2024',
    status: 'A Vencer',
  },
  {
    id: 'DOC-2020-056',
    nome: 'Processos Trabalhistas',
    responsavel: 'Ricardo Gomes',
    setor: 'Jurídico',
    tipo: 'Intermediário',
    dataDocumento: '10/08/2020',
    dataDescarte: '10/08/2023',
    status: 'Vencido',
  },
];

const statusColor = {
  'Válido': 'bg-green-100 text-green-700',
  'A Vencer': 'bg-yellow-100 text-yellow-800',
  'Vencido': 'bg-red-100 text-red-700',
};

const statusBadge = {
  'Válido': 'bg-green-100 text-green-700',
  'A Vencer': 'bg-yellow-100 text-yellow-800',
  'Vencido': 'bg-red-100 text-red-700',
};
const statusBadgeDark = {
  'Válido': 'dark:bg-green-900 dark:text-green-200',
  'A Vencer': 'dark:bg-yellow-900 dark:text-yellow-200',
  'Vencido': 'dark:bg-red-900 dark:text-red-200',
};
const statusBar = {
  'Válido': 'bg-green-500',
  'A Vencer': 'bg-yellow-400',
  'Vencido': 'bg-red-500',
};

const NovoDocumentoForm = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white dark:bg-[#23272f] rounded-2xl shadow-lg p-8 w-full max-w-lg relative">
      <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-xl">×</button>
      <h2 className="text-xl font-bold text-[#2563eb] mb-4">Novo Documento</h2>
      <form className="flex flex-col gap-4">
        <input className="px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#23272f] text-gray-700 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400" placeholder="Nome do Documento" />
        <input className="px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#23272f] text-gray-700 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400" placeholder="Responsável" />
        <input className="px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#23272f] text-gray-700 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400" placeholder="Setor" />
        <input className="px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#23272f] text-gray-700 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400" placeholder="Tipo" />
        <input className="px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#23272f] text-gray-700 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400" placeholder="Data do Documento" />
        <input className="px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#23272f] text-gray-700 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400" placeholder="Data de Descarte" />
        <div className="flex justify-end gap-2 mt-2">
          <button type="button" onClick={onClose} className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#23272f] text-gray-700 dark:text-gray-100 font-medium hover:bg-gray-100 dark:hover:bg-[#232837] transition">Cancelar</button>
          <button type="submit" className="px-6 py-2 rounded-lg bg-[#2563eb] text-white font-semibold hover:bg-[#1e40af] transition focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-[#181f2a]">Salvar</button>
        </div>
      </form>
    </div>
  </div>
);

const Documentos: React.FC = () => {
  const navigate = useNavigate();
  const [filtros, setFiltros] = useState({ setor: 'Todos', tipo: 'Todos', ano: 'Todos', status: 'Todos', busca: '' });
  const [pagina, setPagina] = useState(1);
  const porPagina = 5;
  const [showNovo, setShowNovo] = useState(false);

  const documentosFiltrados = documentosMock.filter(doc => {
    const anoDoc = doc.dataDocumento.split('/')[2];
    return (
      (filtros.setor === 'Todos' || doc.setor === filtros.setor) &&
      (filtros.tipo === 'Todos' || doc.tipo === filtros.tipo) &&
      (filtros.ano === 'Todos' || anoDoc === filtros.ano) &&
      (filtros.status === 'Todos' || doc.status === filtros.status) &&
      (filtros.busca === '' || doc.nome.toLowerCase().includes(filtros.busca.toLowerCase()) || doc.responsavel.toLowerCase().includes(filtros.busca.toLowerCase()))
    );
  });
  const totalPaginas = Math.ceil(documentosFiltrados.length / porPagina);
  const docsPagina = documentosFiltrados.slice((pagina - 1) * porPagina, pagina * porPagina);

  return (
    <div className="min-h-screen bg-[#f7fafd] dark:bg-[#181f2a] flex flex-col px-2 py-10">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto mb-6">
        <h1 className="text-3xl font-bold text-[#2563eb]">Listagem de Documentos</h1>
        <button onClick={() => navigate('/novo-documento')} className="bg-[#2563eb] hover:bg-[#1e40af] text-white px-6 py-2 rounded-lg font-semibold transition-all shadow focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-[#181f2a]">+ Novo Documento</button>
      </div>
      <div className="w-full max-w-7xl mx-auto bg-white dark:bg-[#23272f] rounded-2xl shadow-lg p-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">Documentos Cadastrados</h2>
        <div className="flex flex-wrap gap-4 mb-6 items-end">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-200 mb-1">Setor</label>
            <select className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#23272f] text-gray-700 dark:text-gray-100 min-w-[110px]" value={filtros.setor} onChange={e => setFiltros(f => ({ ...f, setor: e.target.value }))}>
              {setores.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-200 mb-1">Tipo</label>
            <select className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#23272f] text-gray-700 dark:text-gray-100 min-w-[110px]" value={filtros.tipo} onChange={e => setFiltros(f => ({ ...f, tipo: e.target.value }))}>
              {tipos.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-200 mb-1">Ano</label>
            <select className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#23272f] text-gray-700 dark:text-gray-100 min-w-[110px]" value={filtros.ano} onChange={e => setFiltros(f => ({ ...f, ano: e.target.value }))}>
              {anos.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-200 mb-1">Status</label>
            <select className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#23272f] text-gray-700 dark:text-gray-100 min-w-[110px]" value={filtros.status} onChange={e => setFiltros(f => ({ ...f, status: e.target.value }))}>
              {statusList.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex-1 min-w-[180px]">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-200 mb-1">Buscar</label>
            <input type="text" className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#23272f] text-gray-700 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400 w-full" placeholder="Buscar por nome, código ou responsável..." value={filtros.busca} onChange={e => setFiltros(f => ({ ...f, busca: e.target.value }))} />
          </div>
          <button className="bg-[#2563eb] hover:bg-[#1e40af] text-white px-6 py-2 rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-[#181f2a]">Filtrar</button>
        </div>
        <div className="overflow-x-auto rounded-2xl">
          <table className="w-full rounded-2xl overflow-hidden shadow bg-white dark:bg-[#23272f] text-gray-900 dark:text-gray-100">
            <thead>
              <tr className="bg-gray-100 dark:bg-[#232837] text-gray-700 dark:text-gray-200">
                <th className="py-3 px-4 text-left">ID/Código</th>
                <th className="py-3 px-4 text-left">Nome do Documento</th>
                <th className="py-3 px-4 text-left">Responsável</th>
                <th className="py-3 px-4 text-left">Setor</th>
                <th className="py-3 px-4 text-left">Tipo</th>
                <th className="py-3 px-4 text-left">Data do Documento</th>
                <th className="py-3 px-4 text-left">Data de Descarte</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {docsPagina.map((doc, i) => (
                <tr key={doc.id} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4 font-medium">{doc.id}</td>
                  <td className="py-3 px-4">{doc.nome}</td>
                  <td className="py-3 px-4">{doc.responsavel}</td>
                  <td className="py-3 px-4">{doc.setor}</td>
                  <td className="py-3 px-4">{doc.tipo}</td>
                  <td className="py-3 px-4">{doc.dataDocumento}</td>
                  <td className="py-3 px-4">{doc.dataDescarte}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadge[doc.status as keyof typeof statusBadge]} ${statusBadgeDark[doc.status as keyof typeof statusBadgeDark]}`}>{doc.status}</span>
                  </td>
                  <td className="py-3 px-4 flex gap-2 justify-center">
                    <button className="p-2 rounded-full hover:bg-[#e0e7ef] dark:hover:bg-[#232837] transition" title="Ver" onClick={() => navigate(`/documento/${doc.id}`)}><FaEye /></button>
                    <button className="p-2 rounded-full hover:bg-[#fef3c7] dark:hover:bg-yellow-900 transition" title="Editar"><FaEdit /></button>
                    <button className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition" title="Excluir"><FaTrash /></button>
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
        <div className="text-xs text-gray-500 dark:text-gray-300 mt-2 text-center">Mostrando 1-6 de {documentosFiltrados.length} resultados</div>
      </div>
    </div>
  );
};

export default Documentos;
