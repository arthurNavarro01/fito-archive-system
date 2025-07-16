
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
  Grid,
} from '@mui/material';
import {
  Search,
  FilterList,
  Visibility,
  Edit,
  Delete,
} from '@mui/icons-material';
import { dadosIniciais } from '../services/mockData';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Setor, TipoDocumento, StatusDocumento } from '../types';

const Documentos: React.FC = () => {
  const { documentos } = useMemo(() => dadosIniciais(), []);
  
  // Estados para filtros e paginação
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSetor, setFilterSetor] = useState<string>('');
  const [filterTipo, setFilterTipo] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');

  // Aplicar filtros
  const documentosFiltrados = useMemo(() => {
    return documentos.filter(doc => {
      const matchSearch = doc.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.responsavel.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchSetor = !filterSetor || doc.setor === filterSetor;
      const matchTipo = !filterTipo || doc.tipo === filterTipo;
      const matchStatus = !filterStatus || doc.status === filterStatus;
      
      return matchSearch && matchSetor && matchTipo && matchStatus;
    });
  }, [documentos, searchTerm, filterSetor, filterTipo, filterStatus]);

  // Paginação
  const documentosPaginados = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return documentosFiltrados.slice(startIndex, startIndex + rowsPerPage);
  }, [documentosFiltrados, page, rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusColor = (status: StatusDocumento) => {
    switch (status) {
      case StatusDocumento.ARQUIVADO:
        return 'success';
      case StatusDocumento.DESCARTE_PENDENTE:
        return 'error';
      case StatusDocumento.DESCARTADO:
        return 'default';
      case StatusDocumento.CONSULTADO:
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Documentos
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Gerencie todos os documentos do arquivo morto
        </Typography>
      </Box>

      {/* Filtros */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", md: "3fr 2fr 2fr 2fr 3fr" }}
          gap={3}
          alignItems="center"
        >
          <TextField
            fullWidth
            placeholder="Buscar documentos..."
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
            <InputLabel>Tipo</InputLabel>
            <Select
              value={filterTipo}
              onChange={(e) => setFilterTipo(e.target.value)}
              label="Tipo"
            >
              <MenuItem value="">Todos</MenuItem>
              {Object.values(TipoDocumento).map((tipo) => (
                <MenuItem key={tipo} value={tipo}>
                  {tipo}
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
              {Object.values(StatusDocumento).map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box display="flex" alignItems="center" gap={1}>
            <FilterList color="action" />
            <Typography variant="body2" color="textSecondary">
              {documentosFiltrados.length} de {documentos.length} documentos
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
                <TableCell>Tipo</TableCell>
                <TableCell>Setor</TableCell>
                <TableCell>Responsável</TableCell>
                <TableCell>Data Arquivo</TableCell>
                <TableCell>Data Descarte</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {documentosPaginados.map((documento) => (
                <TableRow key={documento.id} hover>
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {documento.numero}
                    </Typography>
                  </TableCell>
                  <TableCell>{documento.tipo}</TableCell>
                  <TableCell>{documento.setor}</TableCell>
                  <TableCell>{documento.responsavel}</TableCell>
                  <TableCell>
                    {format(documento.dataArquivamento, 'dd/MM/yyyy', { locale: ptBR })}
                  </TableCell>
                  <TableCell>
                    {format(documento.dataDescarte, 'dd/MM/yyyy', { locale: ptBR })}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={documento.status}
                      size="small"
                      color={getStatusColor(documento.status) as any}
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={documentosFiltrados.length}
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

export default Documentos;
