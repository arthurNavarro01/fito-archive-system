
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
    <div className={`rounded-xl shadow-md p-6 flex flex-col items-center bg-white dark:bg-[#232b3a] dark:border dark:border-gray-700 dark:text-gray-100 transition-colors`}>
      <div className="mb-2 text-3xl">{icon}</div>
      <div className="text-lg font-semibold mb-1">{title}</div>
      <div className="text-4xl font-bold">{value}</div>
    </div>
  );
};

export default StatCard;
