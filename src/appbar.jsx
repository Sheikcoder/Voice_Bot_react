import React from 'react';
// Import Voice component
import Voice from './voice'; // Relative path to Voice.jsx file
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const App = () => {
  return (
    <>
      <AppBar 
        position="static" 
        sx={{ 
          background: 'linear-gradient(90deg, #FF6F61, #FF9068)',
          mb: 3 
        }}
      >
        <Toolbar>
          <IconButton 
            edge="start" 
            color="inherit" 
            aria-label="menu" 
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ flexGrow: 1, fontWeight: 'bold', fontFamily: 'Nunito, Arial, sans-serif' }}
          >
            🎙️ Voice-to-Text App
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 2 }}>
        <h1 style={{ textAlign: 'center', color: '#FF6F61' }}>Welcome to the Voice-to-Text App</h1>
        <Voice />
      </Box>
    </>
  );
}

export default App;
