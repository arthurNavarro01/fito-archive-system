
import React from 'react';
import { FaBell, FaUserCircle, FaSignOutAlt, FaMoon, FaSun } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useThemeContext } from '../../contexts/ThemeContext';

const AppBar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useThemeContext();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-16 bg-[#2563eb] dark:bg-[#181f2a] flex items-center px-4 sm:px-8 shadow text-white dark:text-gray-100 fixed w-full z-20 transition-colors">
      <div className="flex-1" />
      <div className="flex items-center gap-2">
        {/* Toggle dark mode */}
        <button
          className="p-2 rounded hover:bg-[#1e40af] dark:hover:bg-[#232837] transition"
          aria-label="Alternar tema"
          onClick={toggleTheme}
          title={isDarkMode ? 'Modo claro' : 'Modo escuro'}
        >
          {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
        {/* Notificações */}
        <div className="relative">
          <FaBell size={20} />
        </div>
        {/* Perfil do usuário */}
        <button className="p-2 rounded hover:bg-[#1e40af] dark:hover:bg-[#232837] transition" aria-label="Perfil">
          <FaUserCircle size={22} />
        </button>
        {/* Botão de logout */}
        {isAuthenticated && (
          <button
            className="flex items-center gap-1 bg-[#1e293b] dark:bg-[#232837] hover:bg-[#334155] dark:hover:bg-[#232837] text-white px-3 py-2 rounded-lg transition text-sm font-semibold"
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
