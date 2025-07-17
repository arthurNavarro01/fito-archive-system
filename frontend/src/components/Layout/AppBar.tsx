
import React from 'react';
import { FaBell, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AppBar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-16 bg-[#2563eb] flex items-center px-4 sm:px-8 shadow text-white fixed w-full z-20">
      <h1 className="text-xl font-bold tracking-tight flex-1">Sistema Arquivo Morto - FITO</h1>
      <div className="flex items-center gap-2">
        {/* Notificações */}
        <div className="relative">
          <FaBell size={20} />
        </div>
        {/* Perfil do usuário */}
        <button className="p-2 rounded hover:bg-[#1e40af] transition" aria-label="Perfil">
          <FaUserCircle size={22} />
        </button>
        {/* Botão de logout */}
        {isAuthenticated && (
          <button
            className="flex items-center gap-1 bg-[#1e293b] hover:bg-[#334155] text-white px-3 py-2 rounded-lg transition text-sm font-semibold"
            onClick={handleLogout}
            title="Sair"
          >
            <FaSignOutAlt /> Sair
          </button>
        )}
      </div>
    </header>
  );
};

export default AppBar;
