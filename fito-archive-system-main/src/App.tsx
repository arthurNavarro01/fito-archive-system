
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeContextProvider } from './contexts/ThemeContext';
import Layout from './components/Layout/Layout';

// Páginas
import Dashboard from './pages/Dashboard';
import Documentos from './pages/Documentos';
import Caixas from './pages/Caixas';
import NovoDocumento from './pages/NovoDocumento';
import NovaCaixa from './pages/NovaCaixa';
import NotFound from './pages/NotFound';

// Cliente React Query para futuras integrações com APIs
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              {/* Redirecionar root para dashboard */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              
              {/* Rotas principais */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/documentos" element={<Documentos />} />
              <Route path="/caixas" element={<Caixas />} />
              <Route path="/novo-documento" element={<NovoDocumento />} />
              <Route path="/nova-caixa" element={<NovaCaixa />} />
              
              {/* Rota 404 - deve ser a última */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeContextProvider>
    </QueryClientProvider>
  );
};

export default App;
