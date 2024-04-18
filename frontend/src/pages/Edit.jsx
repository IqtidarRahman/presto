import React from 'react';
import PresSlide from '../components/PresSlide';
import { useLocation } from 'react-router-dom';
// import Button from '@mui/material/Button';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import ResponsiveDrawer from '../components/ResponsiveDrawer';
import Grid from '@mui/material/Grid';

function Edit ({ token }) {
  const location = useLocation();
  const [confirmModal, setConfirmModal] = React.useState(false); // Modal that says "Are you sure?" when you click delete presentation

  // Get the pathname of the page: will be in the form of /edit/(insert name of presentation here)
  const currentUrl = location.pathname;

  // Splits the URL up by '/' and put each components into an array
  // Take index 2 of this array to get the presentation id
  const urlParts = currentUrl.split('/');

  return (
    <>
      <ConfirmDeleteModal open={confirmModal} closeModal={() => setConfirmModal(false)} token={token} deleteId={urlParts[2]}/>
      <Grid container spacing={0} style= {{ height: '100%', backgroundColor: '#dbeafe' }}>
        <Grid item xs={2}>
          <ResponsiveDrawer openModal={() => setConfirmModal(true)} />
        </Grid>
        <Grid item xs={10} style = {{ border: '1px solid grey', overflowX: 'auto' }}>
          <div style = {{ height: '100vh', width: '100%', backgroundColor: '#dbeafe' }}>
            <div style = {{ float: 'left' }}>
              {/* <Button onClick={() => setConfirmModal(true)} variant="contained">Delete</Button>
              <Button onClick={goBackToDash} variant="contained">Back</Button> */}
            </div>
            <br/><br/>
            <PresSlide/>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default Edit;
