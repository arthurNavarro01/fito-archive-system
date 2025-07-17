
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeContextProvider } from './contexts/ThemeContext';
import Layout from './components/Layout/Layout';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';

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

function RequireAuth({ children }: { children: JSX.Element }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  if (loading) return null;
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function ProtectedLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Tela de login isolada */}
              <Route path="/login" element={<Login />} />
              {/* Rotas protegidas com layout */}
              <Route element={<ProtectedLayout />}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
                <Route path="/documentos" element={<RequireAuth><Documentos /></RequireAuth>} />
                <Route path="/caixas" element={<RequireAuth><Caixas /></RequireAuth>} />
                <Route path="/novo-documento" element={<RequireAuth><NovoDocumento /></RequireAuth>} />
                <Route path="/nova-caixa" element={<RequireAuth><NovaCaixa /></RequireAuth>} />
              </Route>
              {/* Rota 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeContextProvider>
    </QueryClientProvider>
  );
};

export default App;
