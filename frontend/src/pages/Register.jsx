import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Register ({ setTokenFunc }) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPass, setConfirmPass] = React.useState('');
  const navigate = useNavigate();

  // Submits the register form when the enter key is pressed in any of the fields
  function handleKeyDown (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      newUserRequest();
    }
  }

  // Back button redirects back to Login screen
  function goToLogin () {
    navigate('/login');
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
        setTokenFunc(response.data.token);
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
    <div id='background-container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div id='outside-box' style={{ width: '400px', textAlign: 'center', border: '1px solid grey' }}>
        <h1 style={{ fontFamily: 'arial' }}>Welcome to Presto!</h1>
        <TextField id="register-name-box" label="Name" variant="outlined" type="text" onChange={e => setName(e.target.value)} value ={name} onKeyDown={handleKeyDown}/> <br /><br />
        <TextField id="register-email-box" label="Email" variant="outlined" type="text" onChange={e => setEmail(e.target.value)} value ={email} onKeyDown={handleKeyDown}/> <br /><br />
        <TextField id="register-pass-box" label="Password" variant="outlined" type="password" onChange={e => setPassword(e.target.value)} value ={password} onKeyDown={handleKeyDown}/> <br /><br />
        <TextField id="register-confirmpass-box" label="Confirm Password" variant="outlined" type="password" onChange={e => setConfirmPass(e.target.value)} value ={confirmPass} onKeyDown={handleKeyDown}/> <br /><br />
        <Button onClick={newUserRequest} variant="contained">Register</Button>
        <Button onClick={goToLogin} variant="contained">Back</Button><br /><br />
      </div>
    </div>
  </>
  );
}

export default Register;
