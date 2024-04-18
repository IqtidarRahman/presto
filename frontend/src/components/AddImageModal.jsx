import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const AddImageModal = ({ open, closeModal }) => {
  const [height, setHeight] = React.useState('');
  const [width, setWidth] = React.useState('');
  const [alt, setAlt] = React.useState('');

  // Check if the state vraiable is set to true or not
  if (!open) {
    return null;
  }

  return (
    <>
      <div id='overlay' onClick={closeModal} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '2' }}>
        <div id='modal-container' onClick={(e) => { e.stopPropagation() }} style={{ backgroundColor: 'white', position: 'fixed', width: '20%', height: '60%', zIndex: '3', textAlign: 'center', borderRadius: '15px' }}>
            <h2 style={{ fontFamily: 'arial' }}>Add Image</h2>

            {/* Input such as height, width, img src and alt text */}
            <TextField id="set-height" label="Height" variant="outlined" type='text' onChange={e => setHeight(e.target.value)} value ={height}/>
            <TextField id="set-width" label="Width" variant="outlined" type='text' onChange={e => setWidth(e.target.value)} value ={width}/>
            <TextField id="set-text" label="Alt Text" variant="outlined" type='text' onChange={e => setAlt(e.target.value)} value ={alt}/><br/>
            <Button onClick={closeModal} variant="contained">Back</Button>
        </div>
      </div>
    </>
  );
}

export default AddImageModal;
