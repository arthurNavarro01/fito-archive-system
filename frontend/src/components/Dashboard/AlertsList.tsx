
import React from 'react';
import { FaExclamationTriangle, FaTimesCircle, FaInfoCircle, FaCheckCircle } from 'react-icons/fa';
import { Alerta, TipoAlerta, PrioridadeAlerta } from '../../types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface AlertsListProps {
  alertas: Alerta[];
  maxItems?: number;
}

const getAlertIcon = (tipo: TipoAlerta) => {
  switch (tipo) {
    case TipoAlerta.DESCARTE_VENCIDO:
      return <FaTimesCircle className="text-red-500 text-xl" />;
    case TipoAlerta.DESCARTE_PROXIMO:
      return <FaExclamationTriangle className="text-yellow-500 text-xl" />;
    case TipoAlerta.CAIXA_CHEIA:
      return <FaInfoCircle className="text-blue-500 text-xl" />;
    default:
      return <FaCheckCircle className="text-green-500 text-xl" />;
  }
};

const getPriorityColor = (prioridade: PrioridadeAlerta) => {
  switch (prioridade) {
    case PrioridadeAlerta.ALTA:
      return 'border-red-500 text-red-500';
    case PrioridadeAlerta.MEDIA:
      return 'border-yellow-500 text-yellow-500';
    case PrioridadeAlerta.BAIXA:
      return 'border-green-500 text-green-500';
    default:
      return 'border-gray-400 text-gray-500';
  }
};

const AlertsList: React.FC<AlertsListProps> = ({ alertas, maxItems = 5 }) => {
  const alertasExibir = alertas.slice(0, maxItems);

  return (
    <div className="h-full border rounded-2xl shadow-md bg-white dark:bg-[#232b3a] dark:border-gray-700 dark:text-gray-100 transition-colors p-4 flex flex-col">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#2563eb]">Alertas Recentes</h3>
        <span className="bg-[#2563eb] text-white text-xs font-bold rounded-full px-3 py-1">{alertas.length} total</span>
      </div>
      <div className="flex-1">
        {alertasExibir.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[200px] gap-2">
            <FaCheckCircle className="text-green-500 text-4xl mb-2" />
            <span className="text-gray-400">Nenhum alerta no momento</span>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {alertasExibir.map((alerta, index) => (
              <li
                key={alerta.id}
                className={`flex items-start gap-3 py-3 px-1 rounded-lg ${!alerta.lido ? 'bg-blue-50' : ''}`}
              >
                <div className="mt-1">{getAlertIcon(alerta.tipo)}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-semibold flex-1 ${!alerta.lido ? 'text-[#2563eb]' : 'text-gray-700'}`}>{alerta.titulo}</span>
                    <span className={`border px-2 py-0.5 rounded-full text-xs font-bold ${getPriorityColor(alerta.prioridade)}`}>{alerta.prioridade}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{alerta.mensagem}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">
                    {format(alerta.data, "dd 'de' MMMM 'às' HH:mm", { locale: ptBR })}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AlertsList;
