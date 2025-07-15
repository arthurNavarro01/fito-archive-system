
import React, { useMemo } from 'react';
import {
  Grid,
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
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total de Documentos"
            value={estatisticas.totalDocumentos.toLocaleString()}
            icon={<Description />}
            color="primary"
            subtitle="documentos arquivados"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total de Caixas"
            value={estatisticas.totalCaixas.toLocaleString()}
            icon={<Archive />}
            color="info"
            subtitle="caixas cadastradas"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Caixas Indisponíveis"
            value={estatisticas.caixasIndisponiveis.toLocaleString()}
            icon={<Warning />}
            color="warning"
            subtitle="precisam de atenção"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Descarte Pendente"
            value={estatisticas.documentosDescartePendente.toLocaleString()}
            icon={<TrendingUp />}
            color="error"
            subtitle="documentos para descartar"
          />
        </Grid>
      </Grid>

      {/* Gráficos */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} lg={8}>
          <ChartCard
            title="Documentos por Setor"
            type="bar"
            data={dadosGraficoSetor}
            dataKey="quantidade"
            nameKey="setor"
            height={350}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <ChartCard
            title="Documentos por Tipo"
            type="pie"
            data={dadosGraficoTipo}
            dataKey="quantidade"
            nameKey="tipo"
            height={350}
          />
        </Grid>
      </Grid>

      {/* Alertas e Tabelas */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={4}>
          <AlertsList alertas={alertas} maxItems={8} />
        </Grid>
        
        <Grid item xs={12} lg={4}>
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
        </Grid>

        <Grid item xs={12} lg={4}>
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
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
