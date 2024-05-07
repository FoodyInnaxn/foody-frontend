import React, { useState, useContext } from 'react';
import { styled } from '@mui/system';
import { TextField, Button, Typography, Container, Card } from '@mui/material';
import { useNavigate } from 'react-router';
import { UserContext } from '../App';
import { jwtDecode } from 'jwt-decode';
import LoginAPI from '../apis/LoginApi';

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  width: '100%',
  maxWidth: 400,
  textAlign: 'center',
}));

const StyledForm = styled('form')(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

function LoginPage() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(event)
    try {
      const response = await LoginAPI.login({ email, password });
      console.log(JSON.stringify(response) + 'resss')
      console.log(response.token);
      setEmail('');
      setPassword('');
      setErrMsg('');
      localStorage.setItem('jwt', response.token);
      const decoded = jwtDecode(response.token);
      console.log(decoded);
      console.log(decoded.userId + "id");
      const cUser = {
        // email: decoded.sub,
        userId: decoded.userId,
        role: decoded.role
      };
      setUser(cUser);
      console.log(cUser);

      navigate('/');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else if (err.response?.status === 404) {
        setErrMsg('Register first!');
      } else {
        setErrMsg('Login Failed');
      }
    }
  };

  return (
    <StyledContainer>
      <StyledCard>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <StyledForm onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
          />
          {errMsg && <Typography color="error">{errMsg}</Typography>}
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign In
          </StyledButton>
        </StyledForm>
      </StyledCard>
    </StyledContainer>
  );
}

export default LoginPage;