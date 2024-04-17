import React from 'react';
import PresSlide from '../components/PresSlide';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';

function Edit ({ token }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [confirmModal, setConfirmModal] = React.useState(false); // Modal that says "Are you sure?" when you click delete presentation

  // Get the pathname of the page: will be in the form of /edit/(insert name of presentation here)
  const currentUrl = location.pathname;

  // Splits the URL up by '/' and put each components into an array
  // Take index 2 of this array to get the presentation id
  const urlParts = currentUrl.split('/');

  // Function to navigate back to dashboard
  const goBackToDash = () => {
    navigate('/dashboard');
  }

  return (
    <>
      <div style = {{ height: '100vh', backgroundColor: '#dbeafe' }}>
        <div style = {{ float: 'left' }}>
          <ConfirmDeleteModal open={confirmModal} closeModal={() => setConfirmModal(false)} token={token} deleteId={urlParts[2]}/>
          <Button onClick={() => setConfirmModal(true)} variant="contained">Delete</Button>
          <Button onClick={goBackToDash} variant="contained">Back</Button>
        </div>
        <br/><br/><br/>
        <PresSlide/>
      </div>
    </>
  );
}

export default Edit;
