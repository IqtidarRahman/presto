import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

const NewPresModal = ({ open, closeModal, setViewSlide, token }) => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');

  // If the viewModal state from dashboard is false, dont display the Modal
  if (!open) {
    return null;
  }

  // Creates new Model when Enter is pressed
  function handleKeyDown (event) {
    if (event.key === 'Enter') {
      handleCreateButton();
    }
  }

  // Make a new slide appear on dashboard along with close the modal
  const handleCreateButton = () => {
    if (title !== '') {
      getStore();
      setViewSlide();
      closeModal();
    } else {
      alert('Please enter name for presentation')
    }
  }

  // Get the current presentation database of user (aka store) to append to it
  let currentData = ''
  let store = ''
  const getStore = async () => {
    axios.get('http://localhost:5005/store', {
      headers: {
        Authorization: token,
      }
    }).then((response) => {
      currentData = response.data.store;
      console.log(currentData);

      // Update the old data and add in the new presentation to the data
      store = Object.assign({}, currentData, {
        [title]: {
          name: title,
          description: description,
          defaultColor: null,
          content: {
            slide1: {
              code: {},
              image: {},
            }
          }
        }
      });

      // Put Request to Save the New Data
      savePres();
    })
  }

  // Save the presentation to database
  const savePres = async () => {
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
  }

  return (
    <>
      <div id='overlay' onClick={closeModal} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '2' }}>
        <div id='modal-container' onClick={(e) => { e.stopPropagation() }} style={{ backgroundColor: 'white', position: 'fixed', width: '30%', height: '50%', zIndex: '3', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'arial' }}>Name of Presentation</h2>
            <TextField id="new-press-name" label="Name" variant="outlined" type='text' onChange={e => setTitle(e.target.value)} value ={title} onKeyDown={handleKeyDown}/> <br /><br />
            <TextField id="new-pres-desc" label="Description" placeholder="Placeholder" multiline rows={4} onChange={e => setDescription(e.target.value)} value ={description} onKeyDown={handleKeyDown} /> <br /><br />
            <Button onClick={handleCreateButton} variant="contained">Create</Button>
            <Button onClick={closeModal} variant="contained">Back</Button>
        </div>
      </div>
    </>
  );
}

export default NewPresModal;
