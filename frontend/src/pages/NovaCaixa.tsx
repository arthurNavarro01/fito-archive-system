import React, { useState } from 'react';

const NovaCaixa: React.FC = () => {
  const [form, setForm] = useState({
    numero: '',
    setor: '',
    capacidade: '',
    status: '',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    setTimeout(() => {
      setLoading(false);
      setSuccess('Caixa cadastrada com sucesso!');
      setForm({ numero: '', setor: '', capacidade: '', status: '' });
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-8 bg-white dark:bg-[#181f2a] dark:text-gray-100 transition-colors min-h-screen justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-[#23272f] rounded-2xl shadow-2xl p-10 w-full max-w-xl flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-[#2563eb] mb-2">Nova Caixa</h2>
        {success && <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-center">{success}</div>}
        {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-center">{error}</div>}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-[#1e293b] dark:text-gray-100">Número</label>
          <input
            name="numero"
            value={form.numero}
            onChange={handleChange}
            required
            className="px-4 py-3 rounded-lg border border-[#e5e7eb] dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2563eb] bg-[#f1f5f9] dark:bg-[#23272f] text-[#1e293b] dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-[#1e293b] dark:text-gray-100">Setor</label>
          <select
            name="setor"
            value={form.setor}
            onChange={handleChange}
            required
            className="px-4 py-3 rounded-lg border border-[#e5e7eb] dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2563eb] bg-[#f1f5f9] dark:bg-[#23272f] text-[#1e293b] dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400"
          >
            <option value="">Selecione</option>
            <option value="TI">TI</option>
            <option value="RH">RH</option>
            <option value="Financeiro">Financeiro</option>
            <option value="Jurídico">Jurídico</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-[#1e293b] dark:text-gray-100">Capacidade</label>
          <input
            name="capacidade"
            type="number"
            min="1"
            value={form.capacidade}
            onChange={handleChange}
            required
            className="px-4 py-3 rounded-lg border border-[#e5e7eb] dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2563eb] bg-[#f1f5f9] dark:bg-[#23272f] text-[#1e293b] dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-[#1e293b] dark:text-gray-100">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            required
            className="px-4 py-3 rounded-lg border border-[#e5e7eb] dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2563eb] bg-[#f1f5f9] dark:bg-[#23272f] text-[#1e293b] dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400"
          >
            <option value="">Selecione</option>
            <option value="Disponível">Disponível</option>
            <option value="Cheia">Cheia</option>
            <option value="Indisponível">Indisponível</option>
            <option value="Em Manutenção">Em Manutenção</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-[#2563eb] hover:bg-[#1e40af] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2 focus:ring-offset-gray-900 dark:focus:ring-offset-[#181f2a]"
          disabled={loading}
        >
          {loading ? 'Salvando...' : 'Salvar Caixa'}
        </button>
      </form>
    </div>
  );
};

export default NovaCaixa;