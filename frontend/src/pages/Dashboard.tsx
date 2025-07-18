
import React from 'react';
import { FaFileAlt, FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';
import StatCard from '../components/Dashboard/StatCard';
import ChartCard from '../components/Dashboard/ChartCard';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '../components/ui/table';

const statCards = [
  {
    title: 'Total de Documentos',
    value: 1248,
    icon: <FaFileAlt className="text-blue-600" />,
    color: 'primary' as const,
  },
  {
    title: 'Documentos Válidos',
    value: 876,
    icon: <FaCheckCircle className="text-green-600" />,
    color: 'success' as const,
  },
  {
    title: 'Documentos Vencidos',
    value: 124,
    icon: <FaTimesCircle className="text-red-500" />,
    color: 'error' as const,
  },
  {
    title: 'A Vencer (30 dias)',
    value: 248,
    icon: <FaClock className="text-purple-500" />,
    color: 'warning' as const,
  },
];

const statusTipoData = [
  { name: 'Corrente', value: 65 },
  { name: 'Intermediário', value: 35 },
];

const setorData = [
  { setor: 'RH', quantidade: 320 },
  { setor: 'Financeiro', quantidade: 280 },
  { setor: 'Jurídico', quantidade: 240 },
  { setor: 'Comercial', quantidade: 200 },
  { setor: 'Marketing', quantidade: 160 },
  { setor: 'Outros', quantidade: 48 },
];

const documentosRecentes = [
  {
    nome: 'Contrato de Prestação de Serviços',
    setor: 'Jurídico',
    vencimento: '15/12/2023',
    status: 'Válido',
    localizacao: 'A-12-B3',
    acao: '',
  },
  {
    nome: 'Folha de Pagamento 2023',
    setor: 'RH',
    vencimento: '05/06/2023',
    status: 'A vencer',
    localizacao: 'B-05-C2',
    acao: '',
  },
  {
    nome: 'Declaração de Imposto de Renda',
    setor: 'Financeiro',
    vencimento: '30/04/2023',
    status: 'Vencido',
    localizacao: 'C-08-A1',
    acao: '',
  },
  {
    nome: 'Relatório de Vendas 2023',
    setor: 'Comercial',
    vencimento: '22/07/2023',
    status: 'Válido',
    localizacao: 'D-03-B5',
    acao: '',
  },
  {
    nome: 'Plano de Marketing 2023',
    setor: 'Marketing',
    vencimento: '10/05/2023',
    status: 'A vencer',
    localizacao: 'A-01-C4',
    acao: '',
  },
];

const statusColor = {
  'Válido': 'bg-green-100 text-green-700',
  'A vencer': 'bg-yellow-100 text-yellow-800',
  'Vencido': 'bg-red-100 text-red-700',
};

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 p-6 md:p-10 bg-[#f7fafd] dark:bg-[#181f2a] min-h-screen">
      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => (
          <StatCard key={i} title={card.title} value={card.value} icon={card.icon} color={card.color} />
        ))}
      </div>
      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard title="Status por Tipo" type="pie" data={statusTipoData} dataKey="value" nameKey="name" height={260} />
        <ChartCard title="Documentos por Setor" type="bar" data={setorData} dataKey="quantidade" nameKey="setor" height={260} />
      </div>
      {/* Documentos Recentes */}
      <div className="bg-white dark:bg-[#23272f] rounded-2xl shadow-md p-6 mt-2">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Documentos Recentes</h3>
          <a href="#" className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">Ver todos</a>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome do Documento</TableHead>
              <TableHead>Setor</TableHead>
              <TableHead>Data de Vencimento</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Localização</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documentosRecentes.map((doc, i) => (
              <TableRow key={i}>
                <TableCell>{doc.nome}</TableCell>
                <TableCell>{doc.setor}</TableCell>
                <TableCell>{doc.vencimento}</TableCell>
                <TableCell>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor[doc.status]}`}>{doc.status}</span>
                </TableCell>
                <TableCell>{doc.localizacao}</TableCell>
                <TableCell>
                  <button className="text-blue-600 hover:underline text-xs mr-2">Ver</button>
                  <button className="text-gray-500 hover:text-blue-600 text-xs">Editar</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Dashboard;
