
import React, { useState } from "react"
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaFileAlt, FaBox, FaPlus, FaArchive, FaBars } from 'react-icons/fa';
import { FaCog } from 'react-icons/fa';

const sidebarLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: <FaHome /> },
  { to: '/documentos', label: 'Documentos', icon: <FaFileAlt /> },
  { to: '/caixas', label: 'Caixas', icon: <FaBox /> },
  { to: '/novo-documento', label: 'Novo Documento', icon: <FaPlus /> },
  { to: '/nova-caixa', label: 'Nova Caixa', icon: <FaArchive /> },
  { to: '/arquivo-3d', label: 'Arquivo 3D', icon: <FaBox /> },
  { to: '/configuracoes', label: 'Configurações', icon: <FaCog /> },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [open, setOpen] = useState(true);

  return (
    <aside
      className={`fixed top-0 left-0 h-full z-30 shadow-lg transition-all duration-300 flex flex-col
        ${open ? 'w-64' : 'w-20'}
        bg-gray-200 dark:bg-[#101624] text-gray-900 dark:text-gray-100
      `}
    >
      <button
        className="mt-4 mb-8 ml-4 p-2 rounded hover:bg-[#2563eb] dark:hover:bg-[#232837] transition self-start"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Recolher menu' : 'Expandir menu'}
      >
        <FaBars size={22} />
      </button>
      <div className={`text-2xl font-bold mb-10 tracking-tight text-[#60a5fa] transition-all ${open ? 'ml-4 opacity-100' : 'ml-0 opacity-0 pointer-events-none w-0 h-0 overflow-hidden'}`}>FITO</div>
      <nav className="flex-1 space-y-2">
        {sidebarLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all hover:bg-[#2563eb] dark:hover:bg-[#232837] ${location.pathname.startsWith(link.to) ? 'bg-[#2563eb] dark:bg-[#232837]' : ''}`}
          >
            <span className="text-xl">{link.icon}</span>
            <span className={`font-medium transition-all duration-200 ${open ? 'opacity-100 ml-2 text-gray-900 dark:text-gray-100' : 'opacity-0 w-0 ml-0 pointer-events-none h-0 overflow-hidden'}`}>{link.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
