import React, { useState, useEffect } from 'react';
import { Button, Box, TextField, Typography, MenuItem, Grid, Card, CardContent, Paper } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6F61',
    },
    secondary: {
      main: '#4caf50',
    },
  },
  typography: {
    fontFamily: 'Nunito, Arial, sans-serif',
  },
});

const VoiceToTextApp = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [recognition, setRecognition] = useState(null);

  const languages = [
    { code: 'en-US', label: 'English' },
    { code: 'ta-IN', label: 'Tamil' },
    { code: 'ar-SA', label: 'Arabic' }
  ];

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser. Please use Google Chrome or another modern browser.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = selectedLanguage;

    recognitionInstance.onstart = () => setIsListening(true);
    recognitionInstance.onend = () => setIsListening(false);
    recognitionInstance.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        interimTranscript += transcript;
      }
      setTranscript(interimTranscript);
    };

    setRecognition(recognitionInstance);

    return () => {
      recognitionInstance.stop();
      recognitionInstance.onend = null;
    };
  }, [selectedLanguage]);

  const startListening = () => {
    if (recognition) {
      recognition.lang = selectedLanguage;
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    stopListening();
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: '#FF6F61' }}>
          🎙️ Voice-to-Text Web Application
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              select
              fullWidth
              label="🌐 Select Language"
              value={selectedLanguage}
              onChange={handleLanguageChange}
              variant="outlined"
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px',
                },
              }}
            >
              {languages.map((language) => (
                <MenuItem key={language.code} value={language.code}>
                  {language.label}
                </MenuItem>
              ))}
            </TextField>

            <Card sx={{ mb: 2, borderRadius: '20px', boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#555' }}>
                  🎉 Live Transcript
                </Typography>
                <Paper
                  elevation={3}
                  sx={{
                    p: 2,
                    minHeight: '150px',
                    backgroundColor: '#F9F9F9',
                    borderRadius: '15px',
                    fontFamily: 'Nunito, sans-serif',
                    fontSize: '16px',
                    overflowY: 'auto',
                  }}
                >
                  {transcript || 'Start speaking to see the transcript...'}
                </Paper>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3 }}>
          {isListening ? (
            <Button
              variant="contained"
              onClick={stopListening}
              startIcon={<StopIcon />}
              sx={{
                background: 'linear-gradient(to right, #ff4d4d, #ff6f61)',
                '&:hover': { backgroundColor: '#ff4d4d' },
                borderRadius: '50px',
                px: 4,
              }}
            >
              Stop Listening
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={startListening}
              startIcon={<MicIcon />}
              sx={{
                background: 'linear-gradient(to right, #4caf50, #81c784)',
                '&:hover': { backgroundColor: '#388e3c' },
                borderRadius: '50px',
                px: 4,
              }}
            >
              Start Listening
            </Button>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default VoiceToTextApp;
