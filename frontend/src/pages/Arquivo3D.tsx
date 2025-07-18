import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';

// Mock de dados para filtros e caixas
const ruas = ['A', 'B', 'C', 'D'];
const estantes = ['1', '2', '3', '4'];
const andares = ['1', '2', '3'];
const posicoes = ['1', '2', '3', '4', '5', '6'];

const mockCaixas = [
  // Cada caixa tem rua, estante, andar, posicao, status
  { id: 1, rua: 'A', estante: '1', andar: '1', posicao: '1', status: 'vazio' },
  { id: 2, rua: 'A', estante: '1', andar: '1', posicao: '2', status: 'cheio' },
  { id: 3, rua: 'A', estante: '1', andar: '1', posicao: '3', status: 'parcial' },
  { id: 4, rua: 'B', estante: '2', andar: '2', posicao: '1', status: 'cheio' },
  { id: 5, rua: 'B', estante: '2', andar: '2', posicao: '2', status: 'vazio' },
  { id: 6, rua: 'C', estante: '3', andar: '3', posicao: '4', status: 'parcial' },
  { id: 7, rua: 'D', estante: '4', andar: '1', posicao: '5', status: 'cheio' },
  { id: 8, rua: 'D', estante: '4', andar: '2', posicao: '6', status: 'vazio' },
];

const statusColor = {
  vazio: '#22c55e', // verde
  parcial: '#facc15', // amarelo
  cheio: '#ef4444', // vermelho
};

function Caixa3D({ x, y, z, status, id, onClick, selected }: any) {
  return (
    <mesh position={[x, y, z]} onClick={onClick} scale={selected ? 1.15 : 1}>
      <boxGeometry args={[0.9, 0.9, 0.9]} />
      <meshStandardMaterial color={statusColor[status]} opacity={selected ? 0.7 : 1} transparent />
      <Html center distanceFactor={8} style={{ pointerEvents: 'none' }}>
        <div style={{ color: '#222', fontWeight: 'bold', fontSize: 12 }}>{id}</div>
      </Html>
    </mesh>
  );
}

const Arquivo3D: React.FC = () => {
  const [filtros, setFiltros] = useState({ rua: '', estante: '', andar: '', posicao: '' });
  const [caixaSelecionada, setCaixaSelecionada] = useState<any>(null);

  const caixasFiltradas = mockCaixas.filter(caixa =>
    (!filtros.rua || caixa.rua === filtros.rua) &&
    (!filtros.estante || caixa.estante === filtros.estante) &&
    (!filtros.andar || caixa.andar === filtros.andar) &&
    (!filtros.posicao || caixa.posicao === filtros.posicao)
  );

  return (
    <div className="flex flex-col md:flex-row gap-8 min-h-[70vh] p-4">
      {/* Filtros laterais */}
      <aside className="w-full md:w-64 bg-white dark:bg-[#23272f] rounded-2xl shadow-md p-6 flex flex-col gap-4 mb-4 md:mb-0">
        <h2 className="text-lg font-bold text-[#2563eb] mb-2">Filtros de Localização</h2>
        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium">Rua
            <select className="mt-1 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#23272f] text-gray-700 dark:text-gray-100" value={filtros.rua} onChange={e => setFiltros(f => ({ ...f, rua: e.target.value }))}>
              <option value="">Selecione a rua</option>
              {ruas.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </label>
          <label className="text-sm font-medium">Estante
            <select className="mt-1 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#23272f] text-gray-700 dark:text-gray-100" value={filtros.estante} onChange={e => setFiltros(f => ({ ...f, estante: e.target.value }))}>
              <option value="">Selecione a estante</option>
              {estantes.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </label>
          <label className="text-sm font-medium">Andar
            <select className="mt-1 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#23272f] text-gray-700 dark:text-gray-100" value={filtros.andar} onChange={e => setFiltros(f => ({ ...f, andar: e.target.value }))}>
              <option value="">Selecione o andar</option>
              {andares.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </label>
          <label className="text-sm font-medium">Posição
            <select className="mt-1 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#23272f] text-gray-700 dark:text-gray-100" value={filtros.posicao} onChange={e => setFiltros(f => ({ ...f, posicao: e.target.value }))}>
              <option value="">Selecione a posição</option>
              {posicoes.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </label>
        </div>
        <button className="mt-2 bg-[#2563eb] hover:bg-[#1e40af] text-white font-medium py-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2 focus:ring-offset-gray-900 dark:focus:ring-offset-[#181f2a]">Localizar</button>
        {/* Legenda */}
        <div className="mt-6">
          <h3 className="font-semibold text-sm mb-2 text-gray-700 dark:text-gray-200">Legenda</h3>
          <div className="flex flex-col gap-2 text-sm">
            <span className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-[#22c55e] inline-block" /> Vazio</span>
            <span className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-[#facc15] inline-block" /> Parcialmente ocupado</span>
            <span className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-[#ef4444] inline-block" /> Cheio</span>
          </div>
        </div>
        {/* Info caixa selecionada */}
        {caixaSelecionada && (
          <div className="mt-6 p-3 rounded-lg bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700">
            <h4 className="font-semibold text-sm mb-1 text-gray-700 dark:text-gray-200">Informações da Caixa Selecionada</h4>
            <div className="text-xs text-gray-700 dark:text-gray-100">Rua: <b>{caixaSelecionada.rua}</b></div>
            <div className="text-xs text-gray-700 dark:text-gray-100">Estante: <b>{caixaSelecionada.estante}</b></div>
            <div className="text-xs text-gray-700 dark:text-gray-100">Andar: <b>{caixaSelecionada.andar}</b></div>
            <div className="text-xs text-gray-700 dark:text-gray-100">Posição: <b>{caixaSelecionada.posicao}</b></div>
            <div className="text-xs text-gray-700 dark:text-gray-100">Status: <b>{caixaSelecionada.status}</b></div>
          </div>
        )}
      </aside>
      {/* Visualização 3D */}
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full h-[60vh] bg-[#f1f5f9] rounded-2xl shadow-lg p-2">
          <Canvas camera={{ position: [8, 8, 12], fov: 50 }} shadows>
            <ambientLight intensity={0.7} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <OrbitControls enablePan enableZoom enableRotate />
            {/* Renderizar caixas filtradas em grid */}
            {caixasFiltradas.map((caixa, i) => (
              <Caixa3D
                key={caixa.id}
                x={i % 5}
                y={Math.floor(i / 5)}
                z={0}
                status={caixa.status}
                id={caixa.id}
                onClick={() => setCaixaSelecionada(caixa)}
                selected={caixaSelecionada && caixaSelecionada.id === caixa.id}
              />
            ))}
          </Canvas>
        </div>
      </main>
    </div>
  );
};

export default Arquivo3D; 