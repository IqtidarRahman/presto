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
        <div style = {{ float: 'right' }}>
          <Button onClick={goBackToDash} variant="contained">Back</Button>
        </div>
        <br/><br/><br/>
        <PresSlide/>
      </div>
    </>
  );
}

export default Edit;
