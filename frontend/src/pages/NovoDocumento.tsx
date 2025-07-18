import React, { useState } from 'react';
import { FaUpload, FaMapMarkerAlt } from 'react-icons/fa';

const setores = ['RH', 'Financeiro', 'Jurídico', 'Comercial', 'Marketing', 'Outros'];

const NovoDocumento: React.FC = () => {
  const [form, setForm] = useState({
    responsavel: '',
    setor: '',
    tipo: 'Corrente',
    dataDocumento: '',
    anosDescarte: 5,
    dataDescarte: '12/05/2029',
    arquivo: null as File | null,
    rua: '',
    estante: '',
    andar: '',
    posicao: '',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [limite, setLimite] = useState(32); // mock: 32 documentos na caixa
  const maxLimite = 50;

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
      setForm({
        responsavel: '', setor: '', tipo: 'Corrente', dataDocumento: '', anosDescarte: 5, dataDescarte: '12/05/2029', arquivo: null, rua: '', estante: '', andar: '', posicao: ''
      });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#f7fafd] dark:bg-[#181f2a] flex flex-col px-2 py-10">
      <div className="w-full max-w-7xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-[#23272f] rounded-2xl shadow-lg p-2 sm:p-4 md:p-8 flex flex-col gap-8">
          <h2 className="text-3xl font-bold text-[#2563eb] mb-8">Cadastro de Documento</h2>
          {success && <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-center">{success}</div>}
          {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-center">{error}</div>}
          {/* Informações Básicas */}
          <section className="bg-gray-50 dark:bg-[#232837] rounded-xl p-4 md:p-6 flex flex-col gap-4 border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-lg text-[#2563eb] mb-2">Informações Básicas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2 w-full">
                <label className="font-medium">Nome do Responsável</label>
                <input name="responsavel" value={form.responsavel} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-[#2563eb] bg-white dark:bg-[#23272f] text-gray-700 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400" />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label className="font-medium">Setor</label>
                <select name="setor" value={form.setor} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-[#2563eb] bg-white dark:bg-[#23272f] text-gray-700 dark:text-gray-100">
                  <option value="">Selecione o setor</option>
                  {setores.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-6 mt-2">
              <label className="flex items-center gap-2">
                <input type="radio" name="tipo" value="Corrente" checked={form.tipo === 'Corrente'} onChange={handleChange} className="accent-blue-600" /> Corrente
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="tipo" value="Intermediário" checked={form.tipo === 'Intermediário'} onChange={handleChange} className="accent-blue-600" /> Intermediário
              </label>
            </div>
          </section>
          {/* Datas e Prazos */}
          <section className="bg-gray-50 dark:bg-[#232837] rounded-xl p-4 md:p-6 flex flex-col gap-4 border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-lg text-[#2563eb] mb-2">Datas e Prazos</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-2 w-full">
                <label>Data do Documento</label>
                <input type="date" name="dataDocumento" value={form.dataDocumento} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-[#2563eb] bg-white dark:bg-[#23272f] text-gray-700 dark:text-gray-100" />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label>Anos para Descarte</label>
                <input type="number" name="anosDescarte" value={form.anosDescarte} min={1} max={20} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-[#2563eb] bg-white dark:bg-[#23272f] text-gray-700 dark:text-gray-100" />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label>Data de Descarte</label>
                <input type="text" name="dataDescarte" value={form.dataDescarte} readOnly className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-[#23272f] text-gray-500 dark:text-gray-300" />
              </div>
            </div>
          </section>
          {/* Upload do Documento */}
          <section className="bg-gray-50 dark:bg-[#232837] rounded-xl p-4 md:p-6 flex flex-col gap-4 border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-lg text-[#2563eb] mb-2">Upload do Documento</h3>
            <div className="flex flex-col items-center border-2 border-dashed border-blue-200 rounded-xl p-8 bg-white dark:bg-[#23272f]">
              <FaUpload className="text-blue-400 text-3xl mb-2" />
              <p className="mb-2 text-gray-500 dark:text-gray-300">Arraste e solte o arquivo PDF aqui ou</p>
              <label className="inline-block cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium px-4 py-2 rounded-lg border border-blue-200 transition">
                Selecionar Arquivo
                <input type="file" name="arquivo" accept=".pdf" onChange={handleChange} className="hidden" />
              </label>
              {form.arquivo && <span className="mt-2 text-sm text-gray-700 dark:text-gray-100">{(form.arquivo as File).name}</span>}
            </div>
          </section>
          {/* Localização Física */}
          <section className="bg-gray-50 dark:bg-[#232837] rounded-xl p-4 md:p-6 flex flex-col gap-4 border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-lg text-[#2563eb] mb-2 flex items-center gap-2"><FaMapMarkerAlt /> Localização Física</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col gap-2 w-full">
                <label>Rua</label>
                <input name="rua" value={form.rua} onChange={handleChange} placeholder="Ex: A" className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-[#2563eb] bg-white dark:bg-[#23272f] text-gray-700 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400" />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label>Estante</label>
                <input name="estante" value={form.estante} onChange={handleChange} placeholder="Ex: 05" className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-[#2563eb] bg-white dark:bg-[#23272f] text-gray-700 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400" />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label>Andar</label>
                <input name="andar" value={form.andar} onChange={handleChange} placeholder="Ex: 2" className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-[#2563eb] bg-white dark:bg-[#23272f] text-gray-700 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400" />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label>Posição</label>
                <input name="posicao" value={form.posicao} onChange={handleChange} placeholder="Ex: 5B" className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-[#2563eb] bg-white dark:bg-[#23272f] text-gray-700 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400" />
              </div>
            </div>
          </section>
          {/* Limite de Documentos na Caixa */}
          <section className="bg-gray-50 dark:bg-[#232837] rounded-xl p-4 md:p-6 flex flex-col gap-2 border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-lg text-[#2563eb] mb-2">Limite de Documentos na Caixa</h3>
            <div className="flex items-center gap-4">
              <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
                <div className="bg-blue-500 h-3 rounded-full" style={{ width: `${(limite / maxLimite) * 100}%` }} />
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-100">{limite} documentos</span>
              <span className="text-xs text-gray-400 dark:text-gray-300 ml-2">Máximo: {maxLimite} documentos</span>
            </div>
          </section>
          {/* Botões */}
          <div className="flex justify-end gap-4 mt-2">
            <button type="button" className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#23272f] text-gray-700 dark:text-gray-100 font-medium hover:bg-gray-100 dark:hover:bg-[#232837] transition">Cancelar</button>
            <button type="submit" className="px-6 py-2 rounded-lg bg-[#2563eb] text-white font-semibold hover:bg-[#1e40af] transition disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2 focus:ring-offset-gray-900 dark:focus:ring-offset-[#181f2a]" disabled={loading}>{loading ? 'Salvando...' : 'Salvar'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NovoDocumento;