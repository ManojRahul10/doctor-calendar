// File: src/components/Login.js
import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <Box maxWidth={300} mx="auto" mt={5}>
      <Typography variant="h6" gutterBottom>Clinic Staff Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" fullWidth type="password" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit" variant="contained" fullWidth>Login</Button>
      </form>
    </Box>
  );
};

export default Login;
