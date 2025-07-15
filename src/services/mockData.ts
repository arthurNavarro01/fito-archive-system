
import { faker } from '@faker-js/faker';
import { 
  Documento, 
  Caixa, 
  TipoDocumento, 
  Setor, 
  StatusDocumento, 
  StatusCaixa, 
  EstatisticasDashboard,
  Alerta,
  TipoAlerta,
  PrioridadeAlerta,
  Localizacao
} from '../types';
import { addDays, subDays, format } from 'date-fns';

// Configurar faker para português brasileiro
faker.locale = 'pt_BR';

// Função para gerar localização aleatória
const gerarLocalizacao = (): Localizacao => ({
  rua: `Rua ${faker.string.alpha({ length: 1, casing: 'upper' })}`,
  estante: `EST-${faker.number.int({ min: 1, max: 50 }).toString().padStart(2, '0')}`,
  andar: faker.number.int({ min: 1, max: 5 }),
  posicao: `P${faker.number.int({ min: 1, max: 20 }).toString().padStart(2, '0')}`,
});

// Gerar caixas mockadas
export const gerarCaixasMock = (quantidade: number = 50): Caixa[] => {
  const caixas: Caixa[] = [];
  
  for (let i = 0; i < quantidade; i++) {
    const dataAbertura = faker.date.between({ from: '2020-01-01', to: '2024-11-01' });
    const documentosCount = faker.number.int({ min: 0, max: 100 });
    
    caixas.push({
      id: faker.string.uuid(),
      numero: `CX-${(i + 1).toString().padStart(4, '0')}`,
      setor: faker.helpers.enumValue(Setor),
      localizacao: gerarLocalizacao(),
      dataAbertura,
      responsavel: faker.name.fullName(),
      capacidade: 100,
      documentosCount,
      status: documentosCount >= 100 ? StatusCaixa.CHEIA : 
              documentosCount === 0 ? StatusCaixa.DISPONIVEL :
              faker.helpers.enumValue(StatusCaixa),
      observacoes: faker.datatype.boolean() ? faker.lorem.sentence() : undefined,
    });
  }
  
  return caixas;
};

// Gerar documentos mockados
export const gerarDocumentosMock = (caixas: Caixa[], quantidade: number = 200): Documento[] => {
  const documentos: Documento[] = [];
  
  for (let i = 0; i < quantidade; i++) {
    const dataArquivamento = faker.date.between({ from: '2020-01-01', to: '2024-11-01' });
    const dataDescarte = addDays(dataArquivamento, faker.number.int({ min: 365, max: 2555 })); // 1-7 anos
    const caixaAleatoria = faker.helpers.arrayElement(caixas);
    
    documentos.push({
      id: faker.string.uuid(),
      numero: `DOC-${(i + 1).toString().padStart(6, '0')}`,
      tipo: faker.helpers.enumValue(TipoDocumento),
      setor: caixaAleatoria.setor,
      responsavel: faker.name.fullName(),
      dataArquivamento,
      dataDescarte,
      descricao: faker.lorem.sentence(),
      caixaId: caixaAleatoria.id,
      status: dataDescarte < new Date() ? StatusDocumento.DESCARTE_PENDENTE : 
              faker.helpers.enumValue(StatusDocumento),
      observacoes: faker.datatype.boolean() ? faker.lorem.sentence() : undefined,
    });
  }
  
  return documentos;
};

// Gerar estatísticas do dashboard
export const gerarEstatisticasDashboard = (documentos: Documento[], caixas: Caixa[]): EstatisticasDashboard => {
  // Contar documentos por setor
  const documentosPorSetor = Object.values(Setor).map(setor => ({
    setor,
    quantidade: documentos.filter(doc => doc.setor === setor).length,
  }));

  // Contar documentos por tipo
  const documentosPorTipo = Object.values(TipoDocumento).map(tipo => ({
    tipo,
    quantidade: documentos.filter(doc => doc.tipo === tipo).length,
  }));

  return {
    totalDocumentos: documentos.length,
    totalCaixas: caixas.length,
    caixasIndisponiveis: caixas.filter(caixa => caixa.status === StatusCaixa.INDISPONIVEL).length,
    documentosDescartePendente: documentos.filter(doc => doc.status === StatusDocumento.DESCARTE_PENDENTE).length,
    documentosPorSetor,
    documentosPorTipo,
  };
};

// Gerar alertas
export const gerarAlertasMock = (documentos: Documento[], caixas: Caixa[]): Alerta[] => {
  const alertas: Alerta[] = [];
  const hoje = new Date();
  
  // Alertas de descarte próximo (próximos 30 dias)
  const documentosDescarteProximo = documentos.filter(doc => {
    const diasParaDescarte = Math.ceil((doc.dataDescarte.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
    return diasParaDescarte <= 30 && diasParaDescarte > 0;
  });

  documentosDescarteProximo.forEach(doc => {
    alertas.push({
      id: faker.datatype.uuid(),
      tipo: TipoAlerta.DESCARTE_PROXIMO,
      titulo: 'Descarte Próximo',
      mensagem: `Documento ${doc.numero} deve ser descartado em ${format(doc.dataDescarte, 'dd/MM/yyyy')}`,
      data: faker.date.recent(7),
      lido: faker.datatype.boolean(),
      prioridade: PrioridadeAlerta.MEDIA,
    });
  });

  // Alertas de descarte vencido
  const documentosDescarteVencido = documentos.filter(doc => doc.dataDescarte < hoje);
  
  documentosDescarteVencido.slice(0, 10).forEach(doc => { // Limitar a 10 para não sobrecarregar
    alertas.push({
      id: faker.datatype.uuid(),
      tipo: TipoAlerta.DESCARTE_VENCIDO,
      titulo: 'Descarte Vencido',
      mensagem: `Documento ${doc.numero} deveria ter sido descartado em ${format(doc.dataDescarte, 'dd/MM/yyyy')}`,
      data: faker.date.recent(30),
      lido: faker.datatype.boolean(),
      prioridade: PrioridadeAlerta.ALTA,
    });
  });

  // Alertas de caixas cheias
  const caixassCheias = caixas.filter(caixa => caixa.status === StatusCaixa.CHEIA);
  
  caixassCheias.forEach(caixa => {
    alertas.push({
      id: faker.datatype.uuid(),
      tipo: TipoAlerta.CAIXA_CHEIA,
      titulo: 'Caixa Cheia',
      mensagem: `Caixa ${caixa.numero} está cheia e precisa de atenção`,
      data: faker.date.recent(14),
      lido: faker.datatype.boolean(),
      prioridade: PrioridadeAlerta.MEDIA,
    });
  });

  return alertas.sort((a, b) => b.data.getTime() - a.data.getTime());
};

// Dados iniciais para o sistema
export const dadosIniciais = () => {
  const caixas = gerarCaixasMock(50);
  const documentos = gerarDocumentosMock(caixas, 200);
  const estatisticas = gerarEstatisticasDashboard(documentos, caixas);
  const alertas = gerarAlertasMock(documentos, caixas);

  return {
    caixas,
    documentos,
    estatisticas,
    alertas,
  };
};
