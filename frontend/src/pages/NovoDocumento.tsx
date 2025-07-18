import React, { useState } from 'react';

const NovoDocumento: React.FC = () => {
  const [form, setForm] = useState({
    nome: '',
    setor: '',
    tipo: '',
    data: '',
    arquivo: null as File | null,
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as any;
    setForm(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    setTimeout(() => {
      setLoading(false);
      setSuccess('Documento cadastrado com sucesso!');
      setForm({ nome: '', setor: '', tipo: '', data: '', arquivo: null });
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-8 bg-white dark:bg-[#181f2a] dark:text-gray-100 transition-colors min-h-screen justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-[#181c24] rounded-2xl shadow-2xl p-10 w-full max-w-xl flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-[#2563eb] mb-2">Novo Documento</h2>
        {success && <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-center">{success}</div>}
        {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-center">{error}</div>}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-[#1e293b] dark:text-gray-100">Nome</label>
          <input
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
            className="px-4 py-3 rounded-lg border border-[#e5e7eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb] bg-[#f1f5f9] dark:bg-[#232837] text-[#1e293b] dark:text-gray-100"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-[#1e293b] dark:text-gray-100">Setor</label>
          <select
            name="setor"
            value={form.setor}
            onChange={handleChange}
            required
            className="px-4 py-3 rounded-lg border border-[#e5e7eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb] bg-[#f1f5f9] dark:bg-[#232837] text-[#1e293b] dark:text-gray-100"
          >
            <option value="">Selecione</option>
            <option value="TI">TI</option>
            <option value="RH">RH</option>
            <option value="Financeiro">Financeiro</option>
            <option value="Jurídico">Jurídico</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-[#1e293b] dark:text-gray-100">Tipo</label>
          <select
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            required
            className="px-4 py-3 rounded-lg border border-[#e5e7eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb] bg-[#f1f5f9] dark:bg-[#232837] text-[#1e293b] dark:text-gray-100"
          >
            <option value="">Selecione</option>
            <option value="PDF">PDF</option>
            <option value="DOC">DOC</option>
            <option value="IMG">Imagem</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-[#1e293b] dark:text-gray-100">Data</label>
          <input
            type="date"
            name="data"
            value={form.data}
            onChange={handleChange}
            required
            className="px-4 py-3 rounded-lg border border-[#e5e7eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb] bg-[#f1f5f9] dark:bg-[#232837] text-[#1e293b] dark:text-gray-100"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-[#1e293b] dark:text-gray-100">Arquivo</label>
          <input
            type="file"
            name="arquivo"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={handleChange}
            required
            className="px-4 py-2 rounded-lg border border-[#e5e7eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb] bg-[#f1f5f9] dark:bg-[#232837] text-[#1e293b] dark:text-gray-100"
          />
        </div>
        <button
          type="submit"
          className="bg-[#2563eb] hover:bg-[#1e40af] text-white font-bold py-3 rounded-lg transition-all duration-200 shadow-md disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Salvando...' : 'Salvar Documento'}
        </button>
      </form>
    </div>
  );
};

export default NovoDocumento;