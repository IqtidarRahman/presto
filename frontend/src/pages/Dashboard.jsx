import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';
import Grid from '@mui/material/Grid';

function Dashboard ({ token, setTokenFunc }) {
  const navigate = useNavigate();

  if (token === null) {
    navigate('/login');
  }

  return <>
    <Grid container spacing={0}>
      <Grid item xs={12} style= {{ border: '1px solid grey', height: '10vh' }}>
          Presto
          <LogoutButton token = {token} setTokenFunc = {setTokenFunc}/>
      </Grid>
      <Grid item xs={3} style= {{ border: '1px solid grey', height: '85vh' }}>
        2
      </Grid>
      <Grid item xs={9} style= {{ border: '1px solid grey', height: '85vh' }}>
        3
      </Grid>
      <Grid item xs={12} style= {{ border: '1px solid grey', height: '5vh' }}>
        Created by Jerry Lin and Iqtidar Rahman
      </Grid>
    </Grid>
  </>;
}

export default Dashboard;
