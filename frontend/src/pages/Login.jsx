import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function Login ({ setTokenFunc }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  // Submits the login form when the enter key is pressed in any of the fields
  function handleKeyDown (event) {
    if (event.key === 'Enter') {
      newUserRequest();
    }
  }

  // POST request for logging in a new user
  const newUserRequest = async () => {
    console.log(email, password);
    if (email !== '' && password !== '') {
      try {
        const response = await axios.post('http://localhost:5005/admin/auth/login', {
          email,
          password
        });
        setTokenFunc(response.data.token);
        console.log(response.data);
        navigate('/dashboard');
      } catch (err) {
        alert(err.response.data.error);
      }
    } else if (email === '' || password === '') {
      alert('Please fill in all fields');
    }
  }

  return (
  <>
    <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
      <h1 style={{ font: 'arial' }}>Welcome to Presto!</h1>
      <TextField id="login-email-box" label="Email" variant="outlined" type="text" onChange={e => setEmail(e.target.value)} value ={email} onKeyDown={handleKeyDown}/> <br /><br />
      <TextField id="login-pass-box" label="Password" variant="outlined" type="text" onChange={e => setPassword(e.target.value)} value ={password} onKeyDown={handleKeyDown}/> <br /><br />
      <Button onClick={newUserRequest} variant="contained">Login</Button>
    </Box>
  </>
  );
}

export default Login;
