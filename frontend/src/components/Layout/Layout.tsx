
import React from 'react';
import Sidebar from './Sidebar';
import AppBar from './AppBar';
import { useAuth } from '../../contexts/AuthContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#f1f5f9] dark:bg-[#181f2a] dark:text-gray-100 transition-colors">
      <AppBar />
      <Sidebar />
      {/* Espaço para AppBar fixo e Sidebar fixa */}
      <div className="pt-16 ml-64">
        <main className="p-4 sm:p-8">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
