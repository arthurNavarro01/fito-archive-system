
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
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import {
  Save,
  Cancel,
  Archive,
  LocationOn,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Setor, StatusCaixa } from '../types';

interface FormData {
  numero: string;
  setor: Setor | '';
  responsavel: string;
  dataAbertura: string;
  capacidade: number;
  observacoes: string;
  // Localização
  rua: string;
  estante: string;
  andar: number;
  posicao: string;
}

const NovaCaixa: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    numero: '',
    setor: '',
    responsavel: '',
    dataAbertura: new Date().toISOString().split('T')[0],
    capacidade: 100,
    observacoes: '',
    rua: '',
    estante: '',
    andar: 1,
    posicao: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof FormData) => (
    event: React.ChangeEvent<HTMLInputElement | { value: unknown }>
  ) => {
    const value = event.target.value;
    setFormData(prev => ({ 
      ...prev, 
      [field]: field === 'capacidade' || field === 'andar' ? Number(value) : value 
    }));
    
    // Limpar erro do campo quando ele for preenchido
    if (errors[field] && value) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.numero.trim()) newErrors.numero = 'Número é obrigatório';
    if (!formData.setor) newErrors.setor = 'Setor é obrigatório';
    if (!formData.responsavel.trim()) newErrors.responsavel = 'Responsável é obrigatório';
    if (!formData.dataAbertura) newErrors.dataAbertura = 'Data de abertura é obrigatória';
    if (!formData.capacidade || formData.capacidade <= 0) newErrors.capacidade = 'Capacidade deve ser maior que zero';
    if (!formData.rua.trim()) newErrors.rua = 'Rua é obrigatória';
    if (!formData.estante.trim()) newErrors.estante = 'Estante é obrigatória';
    if (!formData.andar || formData.andar <= 0) newErrors.andar = 'Andar deve ser maior que zero';
    if (!formData.posicao.trim()) newErrors.posicao = 'Posição é obrigatória';

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
      
      console.log('Caixa criada:', {
        ...formData,
        id: Date.now().toString(),
        status: StatusCaixa.DISPONIVEL,
        documentosCount: 0,
        localizacao: {
          rua: formData.rua,
          estante: formData.estante,
          andar: formData.andar,
          posicao: formData.posicao,
        },
      });

      // Redirecionar para lista de caixas
      navigate('/caixas');
    } catch (error) {
      console.error('Erro ao criar caixa:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/caixas');
  };

  return (
    <Box>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Nova Caixa de Arquivo
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Cadastre uma nova caixa para armazenar documentos
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Formulário Principal */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Box display="flex" alignItems="center" gap={2} mb={3}>
                <Archive color="primary" />
                <Typography variant="h6" fontWeight={600}>
                  Dados da Caixa
                </Typography>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Número da Caixa"
                    value={formData.numero}
                    onChange={handleChange('numero')}
                    error={!!errors.numero}
                    helperText={errors.numero}
                    placeholder="Ex: CX-0001"
                  />
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
                    label="Data de Abertura"
                    type="date"
                    value={formData.dataAbertura}
                    onChange={handleChange('dataAbertura')}
                    error={!!errors.dataAbertura}
                    helperText={errors.dataAbertura}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Capacidade"
                    type="number"
                    value={formData.capacidade}
                    onChange={handleChange('capacidade')}
                    error={!!errors.capacidade}
                    helperText={errors.capacidade || 'Número máximo de documentos'}
                    inputProps={{ min: 1, max: 1000 }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Observações (opcional)"
                    multiline
                    rows={3}
                    value={formData.observacoes}
                    onChange={handleChange('observacoes')}
                    placeholder="Observações adicionais sobre a caixa"
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Localização */}
            <Paper sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" gap={2} mb={3}>
                <LocationOn color="primary" />
                <Typography variant="h6" fontWeight={600}>
                  Localização Física
                </Typography>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Rua"
                    value={formData.rua}
                    onChange={handleChange('rua')}
                    error={!!errors.rua}
                    helperText={errors.rua}
                    placeholder="Ex: Rua A"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Estante"
                    value={formData.estante}
                    onChange={handleChange('estante')}
                    error={!!errors.estante}
                    helperText={errors.estante}
                    placeholder="Ex: EST-01"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Andar"
                    type="number"
                    value={formData.andar}
                    onChange={handleChange('andar')}
                    error={!!errors.andar}
                    helperText={errors.andar}
                    inputProps={{ min: 1, max: 10 }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Posição"
                    value={formData.posicao}
                    onChange={handleChange('posicao')}
                    error={!!errors.posicao}
                    helperText={errors.posicao}
                    placeholder="Ex: P01"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            {/* Preview da Caixa */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  Preview da Caixa
                </Typography>
                <Divider sx={{ my: 2 }} />
                
                <Box mb={2}>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Número:</strong> {formData.numero || 'Não informado'}
                  </Typography>
                </Box>
                
                <Box mb={2}>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Setor:</strong> {formData.setor || 'Não informado'}
                  </Typography>
                </Box>
                
                <Box mb={2}>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Capacidade:</strong> {formData.capacidade} documentos
                  </Typography>
                </Box>
                
                <Box mb={2}>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Localização:</strong>
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
                    {formData.rua && formData.estante 
                      ? `${formData.rua}, ${formData.estante}, Andar ${formData.andar}, ${formData.posicao}`
                      : 'Não informada'
                    }
                  </Typography>
                </Box>
              </CardContent>
            </Card>

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
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Salvando...' : 'Salvar Caixa'}
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

export default NovaCaixa;
