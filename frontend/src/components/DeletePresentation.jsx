import React from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DeletePresentation ({ token, deleteId, closeModal }) {
  const navigate = useNavigate();
  console.log(deleteId);

  const deletePres = () => {
    getStore();
  }

  const getStore = async () => {
    axios.get('http://localhost:5005/store', {
      headers: {
        Authorization: token,
      }
    }).then((response) => {
      // Get current data
      const currentData = response.data.store;

      // Delete the specifc presentation id from data
      delete currentData[deleteId];

      // Put Request to Save changes to Data
      savePres(currentData);
    })
  }

  // Save the presentation to database
  const savePres = async (store) => {
    console.log(store);
    try {
      await axios.put('http://localhost:5005/store', { store },
        {
          headers: {
            Authorization: token,
          }
        });
    } catch (err) {
      alert(err.response.data.error);
    }

    closeModal();
    navigate('/dashboard');
  }

  return (
    <>
      <Button onClick={deletePres} variant="contained">Yes</Button>
    </>
  );
}

export default DeletePresentation;
