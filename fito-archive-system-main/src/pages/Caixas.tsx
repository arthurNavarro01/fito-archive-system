
import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Tooltip,
  LinearProgress,
} from '@mui/material';
import {
  Search,
  FilterList,
  Visibility,
  Edit,
  Delete,
  LocationOn,
} from '@mui/icons-material';
import { dadosIniciais } from '../services/mockData';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Setor, StatusCaixa } from '../types';

const Caixas: React.FC = () => {
  const { caixas } = useMemo(() => dadosIniciais(), []);
  
  // Estados para filtros e paginação
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSetor, setFilterSetor] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');

  // Aplicar filtros
  const caixasFiltradas = useMemo(() => {
    return caixas.filter(caixa => {
      const matchSearch = caixa.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caixa.responsavel.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchSetor = !filterSetor || caixa.setor === filterSetor;
      const matchStatus = !filterStatus || caixa.status === filterStatus;
      
      return matchSearch && matchSetor && matchStatus;
    });
  }, [caixas, searchTerm, filterSetor, filterStatus]);

  // Paginação
  const caixasPaginadas = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return caixasFiltradas.slice(startIndex, startIndex + rowsPerPage);
  }, [caixasFiltradas, page, rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusColor = (status: StatusCaixa) => {
    switch (status) {
      case StatusCaixa.DISPONIVEL:
        return 'success';
      case StatusCaixa.INDISPONIVEL:
        return 'error';
      case StatusCaixa.CHEIA:
        return 'warning';
      case StatusCaixa.EM_MANUTENCAO:
        return 'info';
      default:
        return 'default';
    }
  };

  const getCapacidadePercentual = (documentos: number, capacidade: number) => {
    return Math.min((documentos / capacidade) * 100, 100);
  };

  const getCapacidadeColor = (percentual: number) => {
    if (percentual >= 90) return 'error';
    if (percentual >= 70) return 'warning';
    return 'success';
  };

  return (
    <Box>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Caixas de Arquivo
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Gerencie todas as caixas do arquivo morto e suas localizações
        </Typography>
      </Box>

      {/* Filtros */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", md: "2fr 1fr 1fr auto" }}
          gap={3}
          alignItems="center"
        >
          <TextField
            fullWidth
            placeholder="Buscar caixas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: 'action.active' }} />,
            }}
          />
          
          <FormControl fullWidth>
            <InputLabel>Setor</InputLabel>
            <Select
              value={filterSetor}
              onChange={(e) => setFilterSetor(e.target.value)}
              label="Setor"
            >
              <MenuItem value="">Todos</MenuItem>
              {Object.values(Setor).map((setor) => (
                <MenuItem key={setor} value={setor}>
                  {setor}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value="">Todos</MenuItem>
              {Object.values(StatusCaixa).map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box display="flex" alignItems="center" gap={1}>
            <FilterList color="action" />
            <Typography variant="body2" color="textSecondary">
              {caixasFiltradas.length} de {caixas.length} caixas
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Tabela */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Número</TableCell>
                <TableCell>Setor</TableCell>
                <TableCell>Localização</TableCell>
                <TableCell>Responsável</TableCell>
                <TableCell>Data Abertura</TableCell>
                <TableCell>Capacidade</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {caixasPaginadas.map((caixa) => {
                const capacidadePercentual = getCapacidadePercentual(caixa.documentosCount, caixa.capacidade);
                
                return (
                  <TableRow key={caixa.id} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {caixa.numero}
                      </Typography>
                    </TableCell>
                    <TableCell>{caixa.setor}</TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <LocationOn fontSize="small" color="action" />
                        <Typography variant="body2">
                          {caixa.localizacao.rua}, {caixa.localizacao.estante}, 
                          Andar {caixa.localizacao.andar}, {caixa.localizacao.posicao}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{caixa.responsavel}</TableCell>
                    <TableCell>
                      {format(caixa.dataAbertura, 'dd/MM/yyyy', { locale: ptBR })}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ minWidth: 120 }}>
                        <Box display="flex" justifyContent="space-between" mb={0.5}>
                          <Typography variant="body2">
                            {caixa.documentosCount}/{caixa.capacidade}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {Math.round(capacidadePercentual)}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={capacidadePercentual}
                          color={getCapacidadeColor(capacidadePercentual) as any}
                          sx={{ height: 6, borderRadius: 3 }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={caixa.status}
                        size="small"
                        color={getStatusColor(caixa.status) as any}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Visualizar">
                        <IconButton size="small">
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Editar">
                        <IconButton size="small">
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Excluir">
                        <IconButton size="small" color="error">
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={caixasFiltradas.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Linhas por página:"
          labelDisplayedRows={({ from, to, count }) => 
            `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`
          }
        />
      </Paper>
    </Box>
  );
};

export default Caixas;
