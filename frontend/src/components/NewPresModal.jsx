import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const NewPresModal = ({ open, closeModal, setViewSlide }) => {
  const [title, setTitle] = React.useState('');
  console.log(closeModal);
  console.log(open);

  // If the viewModal state from dashboard is false, dont display the Modal
  if (!open) {
    console.log(open);
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
      setViewSlide();
      closeModal();
    } else {
      alert('Please enter name for presentation')
    }
  }

  return (
    <>
      <div id='overlay' onClick={closeModal} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '2' }}>
        <div id='modal-container' onClick={(e) => { e.stopPropagation() }} style={{ backgroundColor: 'white', position: 'fixed', width: '30%', height: '30%', zIndex: '3', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'arial' }}>Name of Presentation</h2>
            <TextField id="new-press-name" label="Name" variant="outlined" type='text' onChange={e => setTitle(e.target.value)} value ={title} onKeyDown={handleKeyDown}/> <br /><br />
            <Button onClick={handleCreateButton} variant="contained">Create</Button>
            <Button onClick={closeModal} variant="contained">Back</Button>
        </div>
      </div>
    </>
  );
}

export default NewPresModal;
