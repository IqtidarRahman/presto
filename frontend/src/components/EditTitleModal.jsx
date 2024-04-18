import React from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditTitleModal = ({ open, closeModal, token, presId }) => {
  // Check if the state variable is set to true or not
  if (!open) {
    return null;
  }

  const [presTitle, setPresTitle] = React.useState();
  const navigate = useNavigate();

  console.log(presTitle);

  // Creates new Model when Enter is pressed
  function handleKeyDown (event) {
    if (event.key === 'Enter') {
      handleConfirmButton();
    }
  }

  // Make a new slide appear on dashboard along with close the modal
  const handleConfirmButton = () => {
    if (presTitle !== '') {
      getStore();
    } else {
      alert('Please enter name for presentation')
    }
  }

  let currentData = ''
  let store = ''
  const getStore = async () => {
    axios.get('http://localhost:5005/store', {
      headers: {
        Authorization: token,
      }
    }).then((response) => {
      console.log('>>>>>>', store);
      currentData = response.data.store;
      console.log('>>>>>>', currentData);

      // Update the old data and add in the new presentation to the data
      console.log('>>>>>>', store);

      if (Object.prototype.hasOwnProperty.call(currentData, presId)) {
        store = {
          ...currentData,
          [presId]: {
            ...currentData[presId],
            name: presTitle
          }
        };
        console.log(store);
      } else {
        console.log('Slide not found');
      }

      console.log('>>>>>>', store);

      // Put Request to Save the New Data
      savePres(presTitle);
    })
  }

  // Save the new title
  const savePres = async (newTitle) => {
    try {
      await axios.put('http://localhost:5005/store', {
        store
      },
      {
        headers: {
          Authorization: token,
        }
      });
    } catch (err) {
      alert(err.response.data.error);
    }

    closeModal();
    navigate('/edit/' + presId + '/' + presTitle);
  }

  return (
    <>
      <div id='overlay' onClick={closeModal} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '2' }}>
        <div id='modal-container' onClick={(e) => { e.stopPropagation() }} style={{ backgroundColor: 'white', position: 'fixed', width: '35%', height: '25%', zIndex: '3', textAlign: 'center', borderRadius: '15px' }}>
            <h2 style={{ fontFamily: 'arial' }}>New title:</h2>
            <input type="text" onChange={e => setPresTitle(e.target.value)} onKeyDown={handleKeyDown} style={{ width: '90%' }}/>
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Button onClick={handleConfirmButton} variant="contained">Confirm</Button>
                <Button onClick={closeModal} variant="contained">Back</Button>
            </div>
        </div>
      </div>
    </>
  );
}

export default EditTitleModal;
