
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaFileAlt, FaBox, FaPlus, FaArchive } from 'react-icons/fa';

const sidebarLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: <FaHome /> },
  { to: '/documentos', label: 'Documentos', icon: <FaFileAlt /> },
  { to: '/caixas', label: 'Caixas', icon: <FaBox /> },
  { to: '/novo-documento', label: 'Novo Documento', icon: <FaPlus /> },
  { to: '/nova-caixa', label: 'Nova Caixa', icon: <FaArchive /> },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-[#1e293b] dark:bg-[#101624] text-white dark:text-gray-100 flex flex-col z-30 shadow-lg transition-colors">
      <div className="text-2xl font-bold mb-10 tracking-tight text-[#60a5fa]">FITO</div>
      <nav className="flex-1 space-y-2">
        {sidebarLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all hover:bg-[#2563eb] ${location.pathname.startsWith(link.to) ? 'bg-[#2563eb]' : ''}`}
          >
            {link.icon}
            <span className="font-medium">{link.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
