
import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Box,
  Divider,
} from '@mui/material';
import {
  Warning,
  Error,
  Info,
  CheckCircle,
} from '@mui/icons-material';
import { Alerta, TipoAlerta, PrioridadeAlerta } from '../../types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface AlertsListProps {
  alertas: Alerta[];
  maxItems?: number;
}

const AlertsList: React.FC<AlertsListProps> = ({ alertas, maxItems = 5 }) => {
  const getAlertIcon = (tipo: TipoAlerta) => {
    switch (tipo) {
      case TipoAlerta.DESCARTE_VENCIDO:
        return <Error color="error" />;
      case TipoAlerta.DESCARTE_PROXIMO:
        return <Warning color="warning" />;
      case TipoAlerta.CAIXA_CHEIA:
        return <Info color="info" />;
      default:
        return <CheckCircle color="success" />;
    }
  };

  const getPriorityColor = (prioridade: PrioridadeAlerta) => {
    switch (prioridade) {
      case PrioridadeAlerta.ALTA:
        return 'error';
      case PrioridadeAlerta.MEDIA:
        return 'warning';
      case PrioridadeAlerta.BAIXA:
        return 'success';
      default:
        return 'default';
    }
  };

  const alertasExibir = alertas.slice(0, maxItems);

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        title={
          <Typography variant="h6" component="h3" fontWeight={600}>
            Alertas Recentes
          </Typography>
        }
        action={
          <Chip 
            label={`${alertas.length} total`} 
            size="small" 
            color="primary" 
          />
        }
      />
      <CardContent sx={{ pt: 0 }}>
        {alertasExibir.length === 0 ? (
          <Box 
            display="flex" 
            alignItems="center" 
            justifyContent="center" 
            minHeight={200}
            flexDirection="column"
          >
            <CheckCircle color="success" sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant="body1" color="textSecondary">
              Nenhum alerta no momento
            </Typography>
          </Box>
        ) : (
          <List dense>
            {alertasExibir.map((alerta, index) => (
              <React.Fragment key={alerta.id}>
                <ListItem
                  sx={{
                    px: 0,
                    bgcolor: alerta.lido ? 'transparent' : 'action.hover',
                    borderRadius: 1,
                    mb: 1,
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {getAlertIcon(alerta.tipo)}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography 
                          variant="body2" 
                          fontWeight={alerta.lido ? 'normal' : 'bold'}
                          sx={{ flexGrow: 1 }}
                        >
                          {alerta.titulo}
                        </Typography>
                        <Chip
                          label={alerta.prioridade}
                          size="small"
                          color={getPriorityColor(alerta.prioridade) as any}
                          variant="outlined"
                        />
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="textSecondary">
                          {alerta.mensagem}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {format(alerta.data, "dd 'de' MMMM 'às' HH:mm", { locale: ptBR })}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                {index < alertasExibir.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default AlertsList;
