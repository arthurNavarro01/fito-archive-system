import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const ok = await login(username, password);
    setLoading(false);
    if (ok) {
      navigate('/dashboard');
    } else {
      setError('Usuário ou senha inválidos');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('data:image/svg+xml;utf8,<svg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'><rect width=\'40\' height=\'40\' fill=\'%23f1f5f9\'/><path d=\'M0 0H40V40H0V0Z\' fill=\'none\'/><path d=\'M0 40L40 0M0 0L40 40\' stroke=\'%23e2e8f0\' stroke-width=\'1\'/></svg>')] bg-repeat">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl w-full max-w-md p-10 flex flex-col gap-6">
        <div className="flex flex-col items-center mb-2">
          <div className="bg-[#2563eb] rounded-lg p-2 mb-2">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="5" width="18" height="14" rx="3" fill="white"/>
              <rect x="3" y="5" width="18" height="14" rx="3" fill="#2563eb"/>
              <rect x="7" y="9" width="10" height="2" rx="1" fill="white"/>
            </svg>
          </div>
          <span className="text-2xl font-bold text-[#2563eb]">ArquivoMorto</span>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800">Bem-vindo(a) de volta!</h2>
        <p className="text-center text-gray-500 text-base -mt-3 mb-2">Acesse o sistema para gerenciar seus arquivos físicos de forma digital</p>
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="text-sm font-medium text-gray-700 dark:text-gray-200">Usuário ou e-mail</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300"><FaEnvelope /></span>
            <input
              id="username"
              type="text"
              placeholder="Usuário ou e-mail"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              className="pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2563eb] w-full bg-gray-50 dark:bg-[#23272f] text-gray-700 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-200">Senha</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300"><FaLock /></span>
            <input
              id="password"
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2563eb] w-full bg-gray-50 dark:bg-[#23272f] text-gray-700 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400"
            />
          </div>
        </div>
        {error && <div className="text-red-500 text-center text-sm">{error}</div>}
        <button
          type="submit"
          className="bg-[#2563eb] hover:bg-[#1e40af] text-white font-bold py-3 rounded-lg transition-all duration-200 shadow-md disabled:opacity-60 text-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2 focus:ring-offset-gray-900 dark:focus:ring-offset-[#181f2a]"
          disabled={loading}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
        <div className="text-center mt-2">
          <a href="#" className="text-[#2563eb] text-sm hover:underline">Esqueci minha senha</a>
        </div>
      </form>
    </div>
  );
};

export default Login; 