import React, { useState } from 'react';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Avatar, IconButton } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import RegisterAPI from '../apis/RegisterAPI';
import { DeleteToken } from '../authentication/LocalStorageManager';

const Paper = styled('div')({
  marginTop: '2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const AvatarStyled = styled(Avatar)({
  margin: '1rem',
  backgroundColor: 'secondary.main',
});

const Form = styled('form')({
  width: '100%', 
  marginTop: '1rem',
});

const SubmitButton = styled(Button)({
  margin: '1rem 0 0.5rem',
});

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const [errMsg, setErrMsg] = useState("");
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    bio: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      await registration();
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };
  
  async function registration() {
    try {
      const response = await RegisterAPI.registerNewUser(values);
      console.log(response.token);
      localStorage.setItem('jwt', response.token);
      navigate('/login');
      console.log("Registration values:", values);
      // After successful registration, clear the form fields
      setValues({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        bio: "",
      });
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } 
      else if (err.response.status === 400 && err.response.data === "This email is already taken") {
        setErrMsg('This email is already taken');
      }
      else if (err.response?.status === 401) {
        DeleteToken();
        navigate("/login");
      } 
      else {
        setErrMsg('Try again later');
      }
      console.log(errMsg)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper>
        <AvatarStyled>
          <PersonOutlineIcon />
        </AvatarStyled>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Form onSubmit={handleRegistration}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoFocus
            value={values.firstName}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={values.username}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="password"
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <IconButton onClick={togglePasswordVisibility}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ),
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="bio"
            label="Bio"
            name="bio"
            multiline
            rows={4}
            value={values.bio}
            onChange={handleChange}
          />
          <SubmitButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Register
          </SubmitButton>
        </Form>
      </Paper>
    </Container>
  );
}

export default RegisterPage;
