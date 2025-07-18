
import React from 'react';
import { FaBox, FaFileAlt, FaExclamationTriangle } from 'react-icons/fa';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import StatCard from '../components/Dashboard/StatCard';
import ChartCard from '../components/Dashboard/ChartCard';
import AlertsList from '../components/Dashboard/AlertsList';
import Arquivo3D from './Arquivo3D';
import { TipoAlerta, PrioridadeAlerta } from '../types';

const stats = [
  { label: 'Documentos', value: 128, icon: <FaFileAlt />, color: '#2563eb' },
  { label: 'Caixas', value: 32, icon: <FaBox />, color: '#60a5fa' },
];

const pieData = [
  { name: 'TI', value: 40 },
  { name: 'RH', value: 24 },
  { name: 'Financeiro', value: 18 },
  { name: 'Jurídico', value: 12 },
];
const pieColors = ['#2563eb', '#60a5fa', '#64748b', '#1e293b'];

const alertas = [
  {
    id: '1',
    tipo: TipoAlerta.DESCARTE_PROXIMO,
    titulo: 'Documentos próximos do descarte',
    mensagem: '3 documentos estão próximos do prazo de descarte',
    data: new Date(),
    lido: false,
    prioridade: PrioridadeAlerta.ALTA,
  },
  {
    id: '2',
    tipo: TipoAlerta.CAIXA_CHEIA,
    titulo: 'Caixa atingiu capacidade máxima',
    mensagem: '2 caixas atingiram a capacidade máxima',
    data: new Date(),
    lido: false,
    prioridade: PrioridadeAlerta.MEDIA,
  },
];

const prioridadeColor = {
  alta: 'bg-red-500',
  media: 'bg-yellow-400',
  baixa: 'bg-green-500',
};

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 bg-white dark:bg-[#181f2a] dark:text-gray-100 transition-colors min-h-screen">
      {/* Cards principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard title="Documentos" value={128} icon={<i className="fas fa-file-alt" />} color="primary" />
        <StatCard title="Caixas" value={32} icon={<i className="fas fa-box" />} color="info" />
        <ChartCard title="Documentos por Setor" type="pie" data={pieData} dataKey="value" nameKey="name" />
      </div>
      {/* Alertas */}
      <div>
        <AlertsList alertas={alertas} />
      </div>
    </div>
  );
};

export default Dashboard;
