import React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

function LogoutButton ({ token, setTokenFunc }) {
  const logout = async () => {
    try {
      console.log(token);
      await axios.post('http://localhost:5005/admin/auth/logout', {}, {
        headers: {
          Authorization: token,
        }
      });
      setTokenFunc(null);
    } catch (err) {
      console.log(err);
      alert(err.response.data.error);
    }
  }

  return (
      <Button onClick={logout} variant="contained">Logout</Button>
  );
}

export default LogoutButton;
