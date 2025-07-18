import React, { useState } from 'react';
import { FaUserCircle, FaCamera } from 'react-icons/fa';

const mockUser = {
  nome: 'Maria Silva',
  email: 'maria.silva@empresa.com.br',
  cargo: 'Analista de Documentação',
  departamento: 'Recursos Humanos',
};

const departamentos = ['Recursos Humanos', 'Financeiro', 'Jurídico', 'Comercial', 'Marketing', 'TI', 'Outros'];

const Configuracoes: React.FC = () => {
  const [aba, setAba] = useState<'perfil' | 'seguranca' | 'preferencias'>('perfil');
  const [form, setForm] = useState({ ...mockUser });
  const [foto, setFoto] = useState<string | null>(null);
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = ev => setFoto(ev.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('Alterações salvas com sucesso!');
    setTimeout(() => setSuccess(''), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f7fafd] dark:bg-[#181f2a] flex flex-col px-2 py-10">
      <div className="w-full max-w-5xl mx-auto">
        <div className="bg-white dark:bg-[#23272f] rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-[#2563eb] mb-8">Configurações de Usuário</h2>
          {/* Abas */}
          <div className="flex gap-6 border-b mb-6">
            <button className={`pb-2 px-2 font-medium text-sm border-b-2 transition ${aba === 'perfil' ? 'border-[#2563eb] text-[#2563eb]' : 'border-transparent text-gray-500'}`} onClick={() => setAba('perfil')}>Perfil</button>
            <button className={`pb-2 px-2 font-medium text-sm border-b-2 transition ${aba === 'seguranca' ? 'border-[#2563eb] text-[#2563eb]' : 'border-transparent text-gray-500'}`} onClick={() => setAba('seguranca')}>Segurança</button>
            <button className={`pb-2 px-2 font-medium text-sm border-b-2 transition ${aba === 'preferencias' ? 'border-[#2563eb] text-[#2563eb]' : 'border-transparent text-gray-500'}`} onClick={() => setAba('preferencias')}>Preferências</button>
          </div>
          {/* Conteúdo das Abas */}
          {aba === 'perfil' && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {success && <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-center">{success}</div>}
              <div className="flex items-center gap-6 mb-4">
                <div className="relative w-20 h-20">
                  {foto ? (
                    <img src={foto} alt="Foto de perfil" className="w-20 h-20 rounded-full object-cover border-2 border-[#2563eb]" />
                  ) : (
                    <FaUserCircle className="w-20 h-20 text-gray-300" />
                  )}
                  <label className="absolute bottom-0 right-0 bg-[#2563eb] text-white rounded-full p-2 cursor-pointer border-2 border-white shadow-lg" title="Carregar nova foto">
                    <FaCamera />
                    <input type="file" accept="image/*" className="hidden" onChange={handleFoto} />
                  </label>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-semibold text-lg">{form.nome}</span>
                  <span className="text-sm text-gray-500">JPG, PNG ou GIF. Tamanho máximo de 2MB.</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Nome completo</label>
                  <input name="nome" value={form.nome} onChange={handleChange} className="px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#23272f] text-gray-700 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">E-mail</label>
                  <input name="email" value={form.email} onChange={handleChange} className="px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#23272f] text-gray-700 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Cargo</label>
                  <input name="cargo" value={form.cargo} onChange={handleChange} className="px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#23272f] text-gray-700 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Departamento</label>
                  <select name="departamento" value={form.departamento} onChange={handleChange} className="px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#23272f] text-gray-700 dark:text-gray-100">
                    {departamentos.map(dep => <option key={dep} value={dep}>{dep}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-2">
                <button type="button" className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#23272f] text-gray-700 dark:text-gray-100 font-medium hover:bg-gray-100 dark:hover:bg-[#232837] transition">Cancelar</button>
                <button type="submit" className="px-6 py-2 rounded-lg bg-[#2563eb] text-white font-semibold hover:bg-[#1e40af] transition focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2 focus:ring-offset-gray-900 dark:focus:ring-offset-[#181f2a]">Salvar alterações</button>
              </div>
            </form>
          )}
          {aba === 'seguranca' && (
            <div className="flex flex-col gap-6 items-center justify-center min-h-[200px] text-gray-500">
              <span className="text-lg">Funcionalidade de segurança (mock)</span>
              <span className="text-sm">Aqui você poderá alterar sua senha e configurar autenticação em duas etapas.</span>
            </div>
          )}
          {aba === 'preferencias' && (
            <div className="flex flex-col gap-6 items-center justify-center min-h-[200px] text-gray-500">
              <span className="text-lg">Funcionalidade de preferências (mock)</span>
              <span className="text-sm">Aqui você poderá configurar preferências de notificação, idioma, etc.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Configuracoes; 