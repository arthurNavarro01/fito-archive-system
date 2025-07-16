
import React, { useMemo } from 'react';
import {
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import {
  Description,
  Archive,
  Warning,
  TrendingUp,
} from '@mui/icons-material';
import StatCard from '../components/Dashboard/StatCard';
import ChartCard from '../components/Dashboard/ChartCard';
import AlertsList from '../components/Dashboard/AlertsList';
import { dadosIniciais } from '../services/mockData';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Dashboard: React.FC = () => {
  // Carregar dados mockados (em produção viria de uma API)
  const { documentos, caixas, estatisticas, alertas } = useMemo(() => dadosIniciais(), []);

  // Preparar dados para os gráficos
  const dadosGraficoSetor = estatisticas.documentosPorSetor;
  const dadosGraficoTipo = estatisticas.documentosPorTipo;

  // Últimas caixas cadastradas (5 mais recentes)
  const ultimasCaixas = [...caixas]
    .sort((a, b) => b.dataAbertura.getTime() - a.dataAbertura.getTime())
    .slice(0, 5);

  // Documentos recentes (5 mais recentes)
  const documentosRecentes = [...documentos]
    .sort((a, b) => b.dataArquivamento.getTime() - a.dataArquivamento.getTime())
    .slice(0, 5);

  return (
    <Box>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Dashboard
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Visão geral do sistema de arquivo morto da FITO
        </Typography>
      </Box>

      {/* Cards de Estatísticas */}
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" }}
        gap={3}
        mb={4}
      >
        <StatCard
          title="Total de Documentos"
          value={estatisticas.totalDocumentos.toLocaleString()}
          icon={<Description />}
          color="primary"
          subtitle="documentos arquivados"
        />
        <StatCard
          title="Total de Caixas"
          value={estatisticas.totalCaixas.toLocaleString()}
          icon={<Archive />}
          color="info"
          subtitle="caixas cadastradas"
        />
        <StatCard
          title="Caixas Indisponíveis"
          value={estatisticas.caixasIndisponiveis.toLocaleString()}
          icon={<Warning />}
          color="warning"
          subtitle="precisam de atenção"
        />
        <StatCard
          title="Descarte Pendente"
          value={estatisticas.documentosDescartePendente.toLocaleString()}
          icon={<TrendingUp />}
          color="error"
          subtitle="documentos para descartar"
        />
      </Box>

      {/* Gráficos */}
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", lg: "2fr 1fr" }}
        gap={3}
        mb={4}
      >
        <ChartCard
          title="Documentos por Setor"
          type="bar"
          data={dadosGraficoSetor}
          dataKey="quantidade"
          nameKey="setor"
          height={350}
        />
        <ChartCard
          title="Documentos por Tipo"
          type="pie"
          data={dadosGraficoTipo}
          dataKey="quantidade"
          nameKey="tipo"
          height={350}
        />
      </Box>

      {/* Alertas e Tabelas */}
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", lg: "repeat(3, 1fr)" }}
        gap={3}
      >
        <AlertsList alertas={alertas} maxItems={8} />
        
        {/* Últimas Caixas Cadastradas */}
        <Paper sx={{ p: 2, height: 'fit-content' }}>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Últimas Caixas Cadastradas
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Número</TableCell>
                  <TableCell>Setor</TableCell>
                  <TableCell>Data</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ultimasCaixas.map((caixa) => (
                  <TableRow key={caixa.id}>
                    <TableCell>{caixa.numero}</TableCell>
                    <TableCell>
                      <Typography variant="body2" noWrap>
                        {caixa.setor}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {format(caixa.dataAbertura, 'dd/MM/yy', { locale: ptBR })}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Documentos Recentes */}
        <Paper sx={{ p: 2, height: 'fit-content' }}>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Documentos Recentes
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Número</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {documentosRecentes.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>{doc.numero}</TableCell>
                    <TableCell>
                      <Typography variant="body2" noWrap>
                        {doc.tipo}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={doc.status}
                        size="small"
                        color={doc.status === 'Descarte Pendente' ? 'error' : 'success'}
                        variant="outlined"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
