
import React from 'react';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  subtitle?: string;
}

const colorMap = {
  primary: 'bg-blue-100 text-blue-700 border-blue-200',
  secondary: 'bg-gray-100 text-gray-700 border-gray-200',
  success: 'bg-green-100 text-green-700 border-green-200',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  error: 'bg-red-100 text-red-700 border-red-200',
  info: 'bg-cyan-100 text-cyan-700 border-cyan-200',
};

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  color = 'primary',
  subtitle 
}) => {
  const colorClass = colorMap[color] || colorMap.primary;
  return (
    <div
      className={`h-full border rounded-2xl p-6 shadow-md transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg bg-white flex flex-col justify-between ${colorClass}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-gray-500 mb-1">{title}</div>
          <div className={`text-3xl font-bold mb-1 ${colorClass.split(' ')[1]}`}>{value}</div>
          {subtitle && (
            <div className="text-xs text-gray-400 mt-1">{subtitle}</div>
          )}
        </div>
        <div className={`rounded-full p-3 flex items-center justify-center text-2xl bg-opacity-20 ${colorClass.split(' ')[0]} ${colorClass.split(' ')[1]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
