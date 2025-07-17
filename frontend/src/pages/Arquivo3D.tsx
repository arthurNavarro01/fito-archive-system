import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';

// Mock de dados: 2 estantes, cada uma com 5 caixas
const mockEstantes = [
  {
    id: 1,
    caixas: [
      { id: 1, status: 'disponivel' },
      { id: 2, status: 'em_uso' },
      { id: 3, status: 'cheia' },
      { id: 4, status: 'disponivel' },
      { id: 5, status: 'cheia' },
    ],
  },
  {
    id: 2,
    caixas: [
      { id: 6, status: 'em_uso' },
      { id: 7, status: 'disponivel' },
      { id: 8, status: 'cheia' },
      { id: 9, status: 'disponivel' },
      { id: 10, status: 'em_uso' },
    ],
  },
];

const statusColor = {
  disponivel: '#22c55e', // verde
  em_uso: '#facc15',    // amarelo
  cheia: '#ef4444',     // vermelho
};

function Caixa3D({ x, y, z, status, id }: any) {
  return (
    <mesh position={[x, y, z]}>
      <boxGeometry args={[0.9, 0.9, 0.9]} />
      <meshStandardMaterial color={statusColor[status]} />
      <Html center distanceFactor={8} style={{ pointerEvents: 'none' }}>
        <div style={{ color: '#222', fontWeight: 'bold', fontSize: 12 }}>{id}</div>
      </Html>
    </mesh>
  );
}

const Arquivo3D: React.FC = () => {
  return (
    <div className="w-full h-[70vh] bg-[#f1f5f9] rounded-2xl shadow-lg p-2">
      <Canvas camera={{ position: [5, 5, 10], fov: 50 }} shadows>
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <OrbitControls enablePan enableZoom enableRotate />
        {/* Renderizar estantes e caixas */}
        {mockEstantes.map((estante, i) => (
          <group key={estante.id} position={[i * 3, 0, 0]}>
            {/* Base da estante */}
            <mesh position={[0, -0.6, 0]}>
              <boxGeometry args={[1.2, 0.2, 5]} />
              <meshStandardMaterial color="#64748b" />
            </mesh>
            {/* Caixas */}
            {estante.caixas.map((caixa, j) => (
              <Caixa3D
                key={caixa.id}
                x={0}
                y={j - 2}
                z={0}
                status={caixa.status}
                id={caixa.id}
              />
            ))}
          </group>
        ))}
      </Canvas>
      <div className="flex gap-4 mt-4 justify-center">
        <span className="flex items-center gap-1"><span className="w-4 h-4 rounded bg-[#22c55e] inline-block" /> Disponível</span>
        <span className="flex items-center gap-1"><span className="w-4 h-4 rounded bg-[#facc15] inline-block" /> Em uso</span>
        <span className="flex items-center gap-1"><span className="w-4 h-4 rounded bg-[#ef4444] inline-block" /> Cheia</span>
      </div>
    </div>
  );
};

export default Arquivo3D; 