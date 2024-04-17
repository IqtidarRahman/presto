import React from 'react';
import PresSlide from '../components/PresSlide';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

function Edit () {
  const navigate = useNavigate();

  const goBackToDash = () => {
    navigate('/dashboard');
  }

  return (
    <>
      <div style = {{ height: '100vh', backgroundColor: '#dbeafe' }}>
        <Button onClick={goBackToDash} variant="contained">Back</Button>
        <PresSlide/>
      </div>
    </>
  );
}

export default Edit;
