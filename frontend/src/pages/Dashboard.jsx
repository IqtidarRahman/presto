import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import NewPresModal from '../components/NewPresModal';
import PresSlide from '../components/PresSlide';
import PresentationCards from '../components/PresentationCards';

import axios from 'axios';

function Dashboard ({ token, setTokenFunc }) {
  const navigate = useNavigate();
  const [viewModal, setViewModal] = React.useState(false);
  const [viewSlide, setViewSlide] = React.useState(false);
  const [pressies, setPressieData] = React.useState({});

  if (token === null) {
    navigate('/login');
  }

  React.useEffect(() => {
    axios.get('http://localhost:5005/store', {
      headers: {
        Authorization: token,
      }
    }).then((response) => {
      setPressieData(response.data.store);
    })
  }, []);

  console.log(pressies);

  return (
    <>
      <NewPresModal open = {viewModal} closeModal={() => setViewModal(false)} setViewSlide={() => setViewSlide(true)} token={token}/>
      <Grid container spacing={0}>
        <Grid item xs={12} style= {{ border: '1px solid grey', height: '10vh', backgroundColor: '#1e3a8a' }}>
            <div id="logout-button-div"style= {{ float: 'right' }}>
              <LogoutButton token = {token} setTokenFunc = {setTokenFunc}/>
            </div>
            <h1 id="Presto-Logo" style= {{ float: 'left', fontFamily: 'Arial', color: 'white' }}>Presto</h1>
        </Grid>
        <Grid item xs={3} style= {{ border: '1px solid grey', height: '85vh', backgroundColor: '#e4e4e7', textAlign: 'center', alignItems: 'center' }}>
          <Button variant="contained" onClick={() => setViewModal(true)}>+ New Presentation</Button>
          {pressies && Object.entries(pressies).map(pressie => (
            <PresentationCards
                key={pressie.id}
                name={pressie[1].name}
                // thumbnail={pressie.thumbnail}
                description={pressie[1].description}
                slideCount={Object.keys(pressie[1].content).length}
            />
          ))}
          2
        </Grid>
        <Grid item xs={9} style= {{ border: '1px solid grey', height: '85vh', backgroundColor: '#e4e4e7' }}>
          <div style= {{ float: 'right' }}>
            <Button onClick={() => setViewSlide(false)} variant="contained">Back</Button>
          </div>
          <div style= {{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '92%', width: '100%' }}>
            <PresSlide open = {viewSlide}/>
          </div>
        </Grid>
        <Grid item xs={12} style= {{ border: '1px solid grey', height: '5vh', backgroundColor: '#e4e4e7' }}>
          Created by Jerry Lin and Iqtidar Rahman
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;
