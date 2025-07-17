import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

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
      navigate('/');
    } else {
      setError('Usuário ou senha inválidos');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e293b] animate-fade-in">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-2xl shadow-2xl w-96 flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-[#2563eb] text-center mb-2">Bem-vindo ao FITO</h2>
        <p className="text-center text-[#64748b] mb-4">Acesso ao Sistema de Arquivo Morto</p>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          className="px-4 py-3 rounded-lg border border-[#e5e7eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb] text-[#1e293b] bg-[#f1f5f9]"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="px-4 py-3 rounded-lg border border-[#e5e7eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb] text-[#1e293b] bg-[#f1f5f9]"
        />
        {error && <div className="text-red-500 text-center text-sm">{error}</div>}
        <button
          type="submit"
          className="bg-[#2563eb] hover:bg-[#1e40af] text-white font-bold py-3 rounded-lg transition-all duration-200 shadow-md disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
      <style>{`
        .animate-fade-in {
          animation: fadeIn 1s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Login; 