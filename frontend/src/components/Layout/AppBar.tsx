
import React from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Badge,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Brightness4,
  Brightness7,
  Notifications,
  AccountCircle,
} from '@mui/icons-material';
import { useThemeContext } from '../../contexts/ThemeContext';

interface AppBarProps {
  open: boolean;
  onDrawerToggle: () => void;
  alertasCount?: number;
}

const AppBar: React.FC<AppBarProps> = ({ open, onDrawerToggle, alertasCount = 0 }) => {
  const { isDarkMode, toggleTheme } = useThemeContext();

  return (
    <MuiAppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        transition: (theme) => theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="toggle drawer"
          onClick={onDrawerToggle}
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Sistema Arquivo Morto - FITO
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Toggle tema */}
          <IconButton color="inherit" onClick={toggleTheme}>
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          {/* Notificações */}
          <IconButton color="inherit">
            <Badge badgeContent={alertasCount} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          {/* Perfil do usuário */}
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
