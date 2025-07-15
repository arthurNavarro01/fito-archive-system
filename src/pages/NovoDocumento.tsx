
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Alert,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import {
  Save,
  Cancel,
  Description,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { TipoDocumento, Setor, StatusDocumento } from '../types';
import { dadosIniciais } from '../services/mockData';

interface FormData {
  numero: string;
  tipo: TipoDocumento | '';
  setor: Setor | '';
  responsavel: string;
  dataArquivamento: string;
  dataDescarte: string;
  descricao: string;
  caixaId: string;
  observacoes: string;
}

const NovoDocumento: React.FC = () => {
  const navigate = useNavigate();
  const { caixas } = dadosIniciais();
  
  // Filtrar apenas caixas disponíveis para seleção
  const caixasDisponiveis = caixas.filter(caixa => 
    caixa.status === 'Disponível' && caixa.documentosCount < caixa.capacidade
  );

  const [formData, setFormData] = useState<FormData>({
    numero: '',
    tipo: '',
    setor: '',
    responsavel: '',
    dataArquivamento: new Date().toISOString().split('T')[0],
    dataDescarte: '',
    descricao: '',
    caixaId: '',
    observacoes: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof FormData) => (
    event: React.ChangeEvent<HTMLInputElement | { value: unknown }>
  ) => {
    const value = event.target.value as string;
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpar erro do campo quando ele for preenchido
    if (errors[field] && value) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.numero.trim()) newErrors.numero = 'Número é obrigatório';
    if (!formData.tipo) newErrors.tipo = 'Tipo é obrigatório';
    if (!formData.setor) newErrors.setor = 'Setor é obrigatório';
    if (!formData.responsavel.trim()) newErrors.responsavel = 'Responsável é obrigatório';
    if (!formData.dataArquivamento) newErrors.dataArquivamento = 'Data de arquivamento é obrigatória';
    if (!formData.dataDescarte) newErrors.dataDescarte = 'Data de descarte é obrigatória';
    if (!formData.descricao.trim()) newErrors.descricao = 'Descrição é obrigatória';
    if (!formData.caixaId) newErrors.caixaId = 'Caixa é obrigatória';

    // Validar se data de descarte é posterior à data de arquivamento
    if (formData.dataArquivamento && formData.dataDescarte) {
      const dataArq = new Date(formData.dataArquivamento);
      const dataDesc = new Date(formData.dataDescarte);
      if (dataDesc <= dataArq) {
        newErrors.dataDescarte = 'Data de descarte deve ser posterior à data de arquivamento';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simular envio para API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Documento criado:', {
        ...formData,
        id: Date.now().toString(),
        status: StatusDocumento.ARQUIVADO,
      });

      // Redirecionar para lista de documentos
      navigate('/documentos');
    } catch (error) {
      console.error('Erro ao criar documento:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/documentos');
  };

  const caixaSelecionada = caixas.find(caixa => caixa.id === formData.caixaId);

  return (
    <Box>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Novo Documento
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Cadastre um novo documento no arquivo morto
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Formulário Principal */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" gap={2} mb={3}>
                <Description color="primary" />
                <Typography variant="h6" fontWeight={600}>
                  Dados do Documento
                </Typography>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Número do Documento"
                    value={formData.numero}
                    onChange={handleChange('numero')}
                    error={!!errors.numero}
                    helperText={errors.numero}
                    placeholder="Ex: DOC-001234"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth error={!!errors.tipo}>
                    <InputLabel>Tipo de Documento</InputLabel>
                    <Select
                      value={formData.tipo}
                      onChange={handleChange('tipo')}
                      label="Tipo de Documento"
                    >
                      {Object.values(TipoDocumento).map((tipo) => (
                        <MenuItem key={tipo} value={tipo}>
                          {tipo}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.tipo && (
                      <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                        {errors.tipo}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth error={!!errors.setor}>
                    <InputLabel>Setor</InputLabel>
                    <Select
                      value={formData.setor}
                      onChange={handleChange('setor')}
                      label="Setor"
                    >
                      {Object.values(Setor).map((setor) => (
                        <MenuItem key={setor} value={setor}>
                          {setor}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.setor && (
                      <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                        {errors.setor}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Responsável"
                    value={formData.responsavel}
                    onChange={handleChange('responsavel')}
                    error={!!errors.responsavel}
                    helperText={errors.responsavel}
                    placeholder="Nome do responsável"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Data de Arquivamento"
                    type="date"
                    value={formData.dataArquivamento}
                    onChange={handleChange('dataArquivamento')}
                    error={!!errors.dataArquivamento}
                    helperText={errors.dataArquivamento}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Data de Descarte"
                    type="date"
                    value={formData.dataDescarte}
                    onChange={handleChange('dataDescarte')}
                    error={!!errors.dataDescarte}
                    helperText={errors.dataDescarte}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Descrição"
                    multiline
                    rows={3}
                    value={formData.descricao}
                    onChange={handleChange('descricao')}
                    error={!!errors.descricao}
                    helperText={errors.descricao}
                    placeholder="Descreva o conteúdo do documento"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Observações (opcional)"
                    multiline
                    rows={2}
                    value={formData.observacoes}
                    onChange={handleChange('observacoes')}
                    placeholder="Observações adicionais"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Sidebar com Seleção de Caixa */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Seleção de Caixa
              </Typography>
              
              <FormControl fullWidth error={!!errors.caixaId}>
                <InputLabel>Caixa de Arquivo</InputLabel>
                <Select
                  value={formData.caixaId}
                  onChange={handleChange('caixaId')}
                  label="Caixa de Arquivo"
                >
                  {caixasDisponiveis.map((caixa) => (
                    <MenuItem key={caixa.id} value={caixa.id}>
                      {caixa.numero} - {caixa.setor}
                    </MenuItem>
                  ))}
                </Select>
                {errors.caixaId && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                    {errors.caixaId}
                  </Typography>
                )}
              </FormControl>

              {caixaSelecionada && (
                <Card sx={{ mt: 2 }}>
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Detalhes da Caixa
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="body2" color="textSecondary">
                      <strong>Setor:</strong> {caixaSelecionada.setor}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Localização:</strong> {caixaSelecionada.localizacao.rua}, {caixaSelecionada.localizacao.estante}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Capacidade:</strong> {caixaSelecionada.documentosCount}/{caixaSelecionada.capacidade}
                    </Typography>
                  </CardContent>
                </Card>
              )}

              {caixasDisponiveis.length === 0 && (
                <Alert severity="warning" sx={{ mt: 2 }}>
                  Nenhuma caixa disponível. Crie uma nova caixa primeiro.
                </Alert>
              )}
            </Paper>

            {/* Botões de Ação */}
            <Paper sx={{ p: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    startIcon={<Save />}
                    disabled={isSubmitting || caixasDisponiveis.length === 0}
                  >
                    {isSubmitting ? 'Salvando...' : 'Salvar Documento'}
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    fullWidth
                    size="large"
                    startIcon={<Cancel />}
                    onClick={handleCancel}
                    disabled={isSubmitting}
                  >
                    Cancelar
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default NovoDocumento;
