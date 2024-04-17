import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import NewPresModal from '../components/NewPresModal';
import PresentationCards from '../components/PresentationCards';

import axios from 'axios';

function Dashboard ({ token, setTokenFunc }) {
  const navigate = useNavigate();
  const [viewModal, setViewModal] = React.useState(false);
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
      <div id='background' style= {{ height: '100%', width: '100%', padding: '0', margin: '0', backgroundColour: 'red' }}>
        <NewPresModal open = {viewModal} closeModal={() => setViewModal(false)} token={token}/>
        <Grid container spacing={0}>
          <Grid item xs={12} style= {{ height: '10vh', backgroundColor: '#dbeafe' }}>
              <div id="logout-button-div"style= {{ float: 'right' }}>
                <Button variant="contained" onClick={() => setViewModal(true)}>+ New Presentation</Button>
                <LogoutButton token = {token} setTokenFunc = {setTokenFunc}/>
              </div>
              <h1 id="Presto-Logo" style= {{ float: 'left', fontFamily: 'Arial', color: '#1e3a8a' }}>Presto</h1>
          </Grid>
          <Grid item xs={12} style= {{ height: '85vh', backgroundColor: '#bfdbfe', display: 'flex', flexWrap: 'wrap', paddingTop: '1%' }}>
            {pressies && Object.entries(pressies).map(pressie => (
              <PresentationCards
                  key={pressie.id}
                  name={pressie[1].name}
                  // thumbnail={pressie.thumbnail}
                  description={pressie[1].description}
                  slideCount={Object.keys(pressie[1].content).length}
              />
            ))}
          </Grid>
          <Grid item xs={12} style= {{ height: '5vh', backgroundColor: '#bfdbfe' }}>
            Created by Jerry Lin and Iqtidar Rahman
          </Grid>
        </Grid>
      </div>
  );
}

export default Dashboard;
