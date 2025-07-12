// File: src/App.js
import React, { useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box, IconButton, Typography } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import Login from './components/Login';
import CalendarView from './components/CalendarView';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Load from localStorage on first render
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('appointments');
    return saved ? JSON.parse(saved) : {};
  });

  // MUI theme based on darkMode toggle
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode]
  );

  // Toggle light/dark mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Simple login
  const handleLogin = (email, password) => {
    if (email === 'staff@clinic.com' && password === '123456') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  // Add/edit/delete appointments and save to localStorage
  const updateAppointments = (newAppointments) => {
    setAppointments(newAppointments);
    localStorage.setItem('appointments', JSON.stringify(newAppointments));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box p={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Clinic Appointment Calendar</Typography>
          
        </Box>

        {!isLoggedIn ? (
          <Login onLogin={handleLogin} />
        ) : (
          <CalendarView
            appointments={appointments}
            updateAppointments={updateAppointments}
          />
        )}
      </Box>
    </ThemeProvider>
  );
};

export default App;
