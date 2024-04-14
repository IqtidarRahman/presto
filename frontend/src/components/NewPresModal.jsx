import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const NewPresModal = ({ open, closeModal }) => {
  console.log(closeModal);
  console.log(open);

  // If the viewModal state from dashboard is false, dont display the Modal
  if (!open) {
    console.log(open);
    return null;
  }

  return (
    <>
      <div id='overlay' onClick={closeModal} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '2' }}>
        <div id='modal-container' onClick={(e) => { e.stopPropagation() }} style={{ backgroundColor: 'white', position: 'fixed', width: '30%', height: '30%', zIndex: '3' }}>
            <h2 style={{ fontFamily: 'arial' }}>Name of Presentation</h2>
            <TextField id="new-press-name" label="Name" variant="outlined" type='text'/> <br /><br />
            <Button onClick={closeModal} variant="contained">Create</Button>
            <Button onClick={closeModal} variant="contained">Back</Button>
        </div>
      </div>

      <div>Modal</div>

    </>
  );
}

export default NewPresModal;
