import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function Register () {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPass, setConfirmPass] = React.useState('');
  const navigate = useNavigate();

  // Submits the register form when the enter key is pressed in any of the fields
  function handleKeyDown (event) {
    if (event.key === 'Enter') {
      newUserRequest();
    }
  }

  // POST request for registering a new user
  const newUserRequest = async () => {
    console.log(email, password, confirmPass, name);
    if (password === confirmPass && name !== '' && email !== '' && password !== '' && confirmPass !== '') {
      try {
        const response = await axios.post('http://localhost:5005/admin/auth/register', {
          email,
          password,
          name
        });
        console.log(response.data);
        navigate('/dashboard');
      } catch (err) {
        alert(err.response.data.error);
      }
    } else if (name === '' || email === '' || password === '' || confirmPass === '') {
      alert('Please fill in all fields');
    } else if (password !== confirmPass) {
      alert('Passwords do not match');
    }
  }

  return (
  <>
    <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
      <h1 style={{ font: 'arial' }}>Welcome to Presto!</h1>
      <TextField id="register-name-box" label="Name" variant="outlined" type="text" onChange={e => setName(e.target.value)} value ={name} onKeyDown={handleKeyDown}/> <br /><br />
      <TextField id="register-email-box" label="Email" variant="outlined" type="text" onChange={e => setEmail(e.target.value)} value ={email} onKeyDown={handleKeyDown}/> <br /><br />
      <TextField id="register-pass-box" label="Password" variant="outlined" type="text" onChange={e => setPassword(e.target.value)} value ={password} onKeyDown={handleKeyDown}/> <br /><br />
      <TextField id="register-confirmpass-box" label="Confirm Password" variant="outlined" type="text" onChange={e => setConfirmPass(e.target.value)} value ={confirmPass} onKeyDown={handleKeyDown}/> <br /><br />
      <Button onClick={newUserRequest} variant="contained">Register</Button>
    </Box>
  </>
  );
}

export default Register;
