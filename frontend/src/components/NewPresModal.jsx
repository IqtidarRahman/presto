import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewPresModal = ({ open, closeModal, token }) => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const navigate = useNavigate();

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

      // Create new Id (get the id number of the last presentation, then add 1, this will make all ids unique)
      const dictLength = Object.keys(currentData).length;
      let newId = 1
      if (dictLength !== 0) {
        const keysArray = Object.keys(currentData);
        newId = parseInt(keysArray[keysArray.length - 1]) + 1;
      }

      // Update the old data and add in the new presentation to the data
      store = Object.assign({}, currentData, {
        [newId]: {
          name: title,
          description: description,
          defaultColor: null,
          content: {
            slide1: {
              text: {},
              image: {},
              video: {},
              code: {}
            }
          }
        }
      });

      // Put Request to Save the New Data
      savePres(newId.toString());
    })
  }

  // Save the presentation to database
  const savePres = async (id) => {
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

    // New route for presentation, taking into account of the presentation id and the title of presentation
    navigate('/edit/' + id + '/' + title);
  }

  return (
    <>
      <div id='overlay' onClick={closeModal} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '2' }}>
        <div id='modal-container' onClick={(e) => { e.stopPropagation() }} style={{ backgroundColor: 'white', position: 'fixed', width: '30%', height: '50%', zIndex: '3', textAlign: 'center', borderRadius: '15px' }}>
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
