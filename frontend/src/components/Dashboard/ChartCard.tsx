
import React from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface ChartCardProps {
  title: string;
  type: 'bar' | 'pie';
  data: any[];
  dataKey?: string;
  nameKey?: string;
  height?: number;
}

const COLORS = [
  '#2563eb', // azul principal
  '#60a5fa', // azul claro
  '#22d3ee', // ciano
  '#facc15', // amarelo
  '#f87171', // vermelho
  '#34d399', // verde
  '#a78bfa', // roxo
  '#fbbf24', // laranja
];

const ChartCard: React.FC<ChartCardProps> = ({ 
  title, 
  type, 
  data, 
  dataKey = 'quantidade',
  nameKey = 'setor',
  height = 300
}) => {
  const renderChart = () => {
    if (type === 'bar') {
      return (
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey={nameKey} 
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar 
              dataKey={dataKey} 
              fill="#2563eb"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      );
    }
    if (type === 'pie') {
      return (
        <ResponsiveContainer width="100%" height={height}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#2563eb"
              dataKey={dataKey}
              nameKey={nameKey}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      );
    }
    return null;
  };

  return (
    <div className="h-full border rounded-2xl shadow-md bg-white p-4 flex flex-col">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#2563eb]">{title}</h3>
      </div>
      <div className="flex-1 flex items-center justify-center">
        {renderChart()}
      </div>
    </div>
  );
};

export default ChartCard;
