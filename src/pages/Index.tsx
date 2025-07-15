
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';

const Index: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirecionar para o dashboard após um breve delay
    const timer = setTimeout(() => {
      navigate('/dashboard', { replace: true });
    }, 500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      minHeight="100vh"
      gap={3}
    >
      <CircularProgress size={48} />
      <Typography variant="h6" color="textSecondary">
        Carregando Sistema Arquivo Morto FITO...
      </Typography>
    </Box>
  );
};

export default Index;
