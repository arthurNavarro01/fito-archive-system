
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirecionar para o dashboard após um breve delay
    const timer = setTimeout(() => {
      navigate('/dashboard', { replace: true });
    }, 500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-[#f1f5f9]">
      <span className="w-12 h-12 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin block" />
      <span className="text-lg text-gray-500 font-medium">Carregando Sistema Arquivo Morto FITO...</span>
    </div>
  );
};

export default Index;
