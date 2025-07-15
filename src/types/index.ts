
// Tipos principais do sistema de arquivo morto

export interface Documento {
  id: string;
  numero: string;
  tipo: TipoDocumento;
  setor: Setor;
  responsavel: string;
  dataArquivamento: Date;
  dataDescarte: Date;
  descricao: string;
  caixaId: string;
  status: StatusDocumento;
  observacoes?: string;
}

export interface Caixa {
  id: string;
  numero: string;
  setor: Setor;
  localizacao: Localizacao;
  dataAbertura: Date;
  responsavel: string;
  capacidade: number;
  documentosCount: number;
  status: StatusCaixa;
  observacoes?: string;
}

export interface Localizacao {
  rua: string;
  estante: string;
  andar: number;
  posicao: string;
}

export enum TipoDocumento {
  CONTRATO = 'Contrato',
  FATURA = 'Fatura',
  RECIBO = 'Recibo',
  CORRESPONDENCIA = 'Correspondência',
  RELATORIO = 'Relatório',
  PLANILHA = 'Planilha',
  PROCESSO = 'Processo',
  OUTROS = 'Outros'
}

export enum Setor {
  ADMINISTRACAO = 'Administração',
  FINANCEIRO = 'Financeiro',
  RECURSOS_HUMANOS = 'Recursos Humanos',
  COMERCIAL = 'Comercial',
  JURIDICO = 'Jurídico',
  TI = 'Tecnologia da Informação',
  OPERACIONAL = 'Operacional',
  DIRETORIA = 'Diretoria'
}

export enum StatusDocumento {
  ARQUIVADO = 'Arquivado',
  DESCARTE_PENDENTE = 'Descarte Pendente',
  DESCARTADO = 'Descartado',
  CONSULTADO = 'Consultado'
}

export enum StatusCaixa {
  DISPONIVEL = 'Disponível',
  INDISPONIVEL = 'Indisponível',
  CHEIA = 'Cheia',
  EM_MANUTENCAO = 'Em Manutenção'
}

// Tipos para estatísticas do dashboard
export interface EstatisticasDashboard {
  totalDocumentos: number;
  totalCaixas: number;
  caixasIndisponiveis: number;
  documentosDescartePendente: number;
  documentosPorSetor: { setor: string; quantidade: number }[];
  documentosPorTipo: { tipo: string; quantidade: number }[];
}

// Tipos para alertas
export interface Alerta {
  id: string;
  tipo: TipoAlerta;
  titulo: string;
  mensagem: string;
  data: Date;
  lido: boolean;
  prioridade: PrioridadeAlerta;
}

export enum TipoAlerta {
  DESCARTE_PROXIMO = 'Descarte Próximo',
  DESCARTE_VENCIDO = 'Descarte Vencido',
  CAIXA_CHEIA = 'Caixa Cheia',
  MANUTENCAO = 'Manutenção'
}

export enum PrioridadeAlerta {
  ALTA = 'Alta',
  MEDIA = 'Média',
  BAIXA = 'Baixa'
}
