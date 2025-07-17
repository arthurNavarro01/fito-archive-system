import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
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
  Description,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { TipoDocumento, Setor, StatusDocumento } from '../types';

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
  arquivo: File | null;
}

const NovoDocumento: React.FC = () => {
  const navigate = useNavigate();

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
    arquivo: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, arquivo: file }));
    
    // Limpar erro do campo quando um arquivo for selecionado
    if (errors.arquivo && file) {
      setErrors(prev => ({ ...prev, arquivo: '' }));
    }
  };

  const handleChange = (field: keyof FormData) => (
    event: any
  ) => {
    const value = event.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpar erro do campo quando ele for preenchido
    if (errors[field] && value) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.numero.trim()) newErrors.numero = 'Número é obrigatório';
    if (!formData.tipo) newErrors.tipo = 'Tipo é obrigatório';
    if (!formData.setor) newErrors.setor = 'Setor é obrigatório';
    if (!formData.responsavel.trim()) newErrors.responsavel = 'Responsável é obrigatório';
    if (!formData.dataArquivamento) newErrors.dataArquivamento = 'Data de arquivamento é obrigatória';
    if (!formData.dataDescarte) newErrors.dataDescarte = 'Data de descarte é obrigatória';
    if (!formData.descricao.trim()) newErrors.descricao = 'Descrição é obrigatória';

    // Validar se data de descarte é posterior à data de arquivamento
    if (formData.dataArquivamento && formData.dataDescarte) {
      if (new Date(formData.dataDescarte) <= new Date(formData.dataArquivamento)) {
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

  const calcularDataDescarte = (anos: number) => {
    if (formData.dataArquivamento) {
      const dataArquivamento = new Date(formData.dataArquivamento);
      dataArquivamento.setFullYear(dataArquivamento.getFullYear() + anos);
      const dataDescarte = dataArquivamento.toISOString().split('T')[0];
      setFormData(prev => ({ ...prev, dataDescarte }));
      
      if (errors.dataDescarte) {
        setErrors(prev => ({ ...prev, dataDescarte: '' }));
      }
    }
  };

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
        <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "2fr 1fr" }} gap={3}>
          {/* Formulário Principal */}
          <Box>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Box display="flex" alignItems="center" gap={2} mb={3}>
                <Description color="primary" />
                <Typography variant="h6" fontWeight={600}>
                  Dados do Documento
                </Typography>
              </Box>

              <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }} gap={3}>
                <TextField
                  fullWidth
                  label="Número do Documento"
                  value={formData.numero}
                  onChange={handleChange('numero')}
                  error={!!errors.numero}
                  helperText={errors.numero}
                  placeholder="Ex: DOC-000001"
                />

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

                <TextField
                  fullWidth
                  label="Responsável"
                  value={formData.responsavel}
                  onChange={handleChange('responsavel')}
                  error={!!errors.responsavel}
                  helperText={errors.responsavel}
                  placeholder="Nome do responsável pelo documento"
                />

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

                <Box gridColumn={{ xs: "1", md: "1 / -1" }}>
                  <TextField
                    fullWidth
                    label="Descrição"
                    value={formData.descricao}
                    onChange={handleChange('descricao')}
                    error={!!errors.descricao}
                    helperText={errors.descricao}
                    placeholder="Descrição detalhada do documento"
                    multiline
                    rows={2}
                  />
                </Box>

                <Box gridColumn={{ xs: "1", md: "1 / -1" }}>
                  <TextField
                    fullWidth
                    label="Observações (opcional)"
                    multiline
                    rows={3}
                    value={formData.observacoes}
                    onChange={handleChange('observacoes')}
                    placeholder="Observações adicionais sobre o documento"
                  />
                </Box>

                <Box gridColumn={{ xs: "1", md: "1 / -1" }}>
                  <Box>
                    <Typography variant="body2" color="textSecondary" mb={1}>
                      Arquivo PDF do Documento
                    </Typography>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      style={{
                        width: '100%',
                        padding: '8px',
                        border: errors.arquivo ? '1px solid #d32f2f' : '1px solid #ccc',
                        borderRadius: '4px',
                        fontSize: '16px',
                      }}
                    />
                    {errors.arquivo && (
                      <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                        {errors.arquivo}
                      </Typography>
                    )}
                    {formData.arquivo && (
                      <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5, display: 'block' }}>
                        Arquivo selecionado: {formData.arquivo.name}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Box>

          {/* Sidebar */}
          <Box>
            {/* Atalhos para Data de Descarte */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  Definir Data de Descarte
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Baseado na data de arquivamento:
                </Typography>
                <Divider sx={{ my: 2 }} />
                
                <Box display="grid" gap={1}>
                  <Button
                    variant="outlined"
                    size="small"
                    fullWidth
                    onClick={() => calcularDataDescarte(1)}
                    disabled={!formData.dataArquivamento}
                  >
                    + 1 ano
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    fullWidth
                    onClick={() => calcularDataDescarte(5)}
                    disabled={!formData.dataArquivamento}
                  >
                    + 5 anos
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    fullWidth
                    onClick={() => calcularDataDescarte(7)}
                    disabled={!formData.dataArquivamento}
                  >
                    + 7 anos
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    fullWidth
                    onClick={() => calcularDataDescarte(10)}
                    disabled={!formData.dataArquivamento}
                  >
                    + 10 anos
                  </Button>
                </Box>
              </CardContent>
            </Card>

            {/* Preview do Documento */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  Preview do Documento
                </Typography>
                <Divider sx={{ my: 2 }} />
                
                <Box mb={2}>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Número:</strong> {formData.numero || 'Não informado'}
                  </Typography>
                </Box>
                
                <Box mb={2}>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Tipo:</strong> {formData.tipo || 'Não informado'}
                  </Typography>
                </Box>
                
                <Box mb={2}>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Setor:</strong> {formData.setor || 'Não informado'}
                  </Typography>
                </Box>
                
                <Box mb={2}>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Responsável:</strong> {formData.responsavel || 'Não informado'}
                  </Typography>
                </Box>
                
                {formData.dataArquivamento && formData.dataDescarte && (
                  <Box mb={2}>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Período de Retenção:</strong>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
                      {Math.round((new Date(formData.dataDescarte).getTime() - new Date(formData.dataArquivamento).getTime()) / (1000 * 60 * 60 * 24 * 365))} anos
                    </Typography>
                  </Box>
                )}
                
                <Box mb={2}>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Arquivo:</strong> {formData.arquivo ? formData.arquivo.name : 'Nenhum arquivo selecionado'}
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Botões de Ação */}
            <Paper sx={{ p: 3 }}>
              <Box display="grid" gap={2}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  startIcon={<Save />}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Salvando...' : 'Salvar Documento'}
                </Button>
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
              </Box>
            </Paper>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default NovoDocumento;