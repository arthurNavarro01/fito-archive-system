
import React, { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import AppBar from './AppBar';
import Sidebar from './Sidebar';
import { dadosIniciais } from '../../services/mockData';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // Simular dados de alertas para mostrar count na AppBar
  const { alertas } = dadosIniciais();
  const alertasNaoLidas = alertas.filter(alerta => !alerta.lido).length;

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar 
        open={drawerOpen} 
        onDrawerToggle={handleDrawerToggle}
        alertasCount={alertasNaoLidas}
      />
      
      <Sidebar 
        open={drawerOpen} 
        onClose={handleDrawerClose}
      />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          transition: (theme) => theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          marginLeft: { 
            xs: 0, 
            sm: drawerOpen ? '240px' : 0 
          },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
