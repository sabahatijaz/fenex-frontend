import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Divider } from '@mui/material';
import { FaGoogle, FaFacebook } from 'react-icons/fa'; // Importing Google and Facebook icons
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import styled from 'styled-components';

const SocialButton = styled(Button)`
  width: 100%;
  margin: 10px 0;
  text-transform: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignUpContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  max-width: 400px;
  padding: 40px;
  background-color: #ffffff;
  border-radius: 16px;  /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 50px;
`;

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      await api.post('/auth/signup', { email, password });
      navigate('/signin');
    } catch (error) {
      console.error('Sign Up Error:', error);
    }
  };

  return (
    <SignUpContainer maxWidth="xs">
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSignUp} fullWidth>
        Sign Up
      </Button>
      <Divider style={{ margin: '20px 0', width: '100%' }}>OR</Divider>
      <SocialButton variant="outlined" color="primary" startIcon={<FaGoogle />}>
        Sign up with Google
      </SocialButton>
      <Divider style={{ margin: '20px 0', width: '100%' }}></Divider>
      <SocialButton variant="outlined" color="primary" startIcon={<FaFacebook />}>
        Sign up with Facebook
      </SocialButton>
    </SignUpContainer>
  );
};

export default SignUp;
