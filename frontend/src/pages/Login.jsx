import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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

  // Register button directs to register
  function goToRegister () {
    navigate('/register');
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
    <div id='background-container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#dbeafe' }}>
      <div id='outside-box' style={{ width: '400px', textAlign: 'center', backgroundColor: '#bfdbfe', borderRadius: '15px' }}>
        <h1 style={{ fontFamily: 'arial', color: '#1e3a8a' }}>Login to Presto</h1>
        <TextField id="login-email-box" label="Email" variant="outlined" type='text' onChange={e => setEmail(e.target.value)} value ={email} onKeyDown={handleKeyDown} style={{ backgroundColor: '#eff6ff' }}/> <br /><br />
        <TextField id="login-pass-box" label="Password" variant="outlined" type='password' onChange={e => setPassword(e.target.value)} value ={password} onKeyDown={handleKeyDown} style={{ backgroundColor: '#eff6ff' }}/> <br /><br />
        <Button onClick={newUserRequest} variant="contained">Login</Button>
        <Button onClick={goToRegister} variant="contained">Register</Button> <br /><br />
      </div>
    </div>
  </>
  );
}

export default Login;
