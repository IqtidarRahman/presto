import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

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

  // CSS Properties for the background
  const BackgroundContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center', /* Center horizontally */
    alignItems: 'center', /* Center vertically */
    minHeight: '100vh', /* Ensures the container takes up at least the full viewport height */
    // paddingTop: '50px',
  });

  // Box surrounding the input elements
  const OutsideBox = styled('div')({
    width: '400px',
    textAlign: 'center',
    border: '1px solid grey',
  });

  return (
  <>
    {/* <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}> */}
    <BackgroundContainer>
      <OutsideBox>
        <h1 style={{ fontFamily: 'arial' }}>Login to Presto</h1>
        <TextField id="login-email-box" label="Email" variant="outlined" type="text" onChange={e => setEmail(e.target.value)} value ={email} onKeyDown={handleKeyDown}/> <br /><br />
        <TextField id="login-pass-box" label="Password" variant="outlined" type="text" onChange={e => setPassword(e.target.value)} value ={password} onKeyDown={handleKeyDown}/> <br /><br />
        <Button onClick={newUserRequest} variant="contained">Login</Button>
        <Button onClick={goToRegister} variant="contained">Register</Button> <br /><br />
      </OutsideBox>
    </BackgroundContainer>
    {/* </Box> */}
  </>
  );
}

export default Login;
