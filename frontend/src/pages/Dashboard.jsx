import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import NewPresModal from '../components/NewPresModal';

function Dashboard ({ token, setTokenFunc }) {
  const navigate = useNavigate();
  const [viewModal, setViewModal] = React.useState(false);

  if (token === null) {
    navigate('/login');
  }

  return (
    <>
      <NewPresModal open = {viewModal} closeModal={() => setViewModal(false)}/>
      <Grid container spacing={0}>
        <Grid item xs={12} style= {{ border: '1px solid grey', height: '10vh', backgroundColor: '#1e3a8a' }}>
            <div style= {{ float: 'right' }}>
              <LogoutButton token = {token} setTokenFunc = {setTokenFunc}/>
            </div>
            <h1 style= {{ float: 'left', fontFamily: 'Arial', color: 'white' }}>Presto</h1>
        </Grid>
        <Grid item xs={3} style= {{ border: '1px solid grey', height: '85vh', backgroundColor: '#e4e4e7' }}>
          <Button variant="contained" onClick={() => setViewModal(true)}>+ New Presentation</Button>
          2
        </Grid>
        <Grid item xs={9} style= {{ border: '1px solid grey', height: '85vh', backgroundColor: '#e4e4e7' }}>
          3
        </Grid>
        <Grid item xs={12} style= {{ border: '1px solid grey', height: '5vh', backgroundColor: '#e4e4e7' }}>
          Created by Jerry Lin and Iqtidar Rahman
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;
