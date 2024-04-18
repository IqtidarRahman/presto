import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const AddVideoModal = ({ open, closeModal }) => {
  const [height, setHeight] = React.useState('');
  const [width, setWidth] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [autoplay, setAutoplay] = React.useState(true);

  console.log([height, width, url, autoplay]);

  // Check if the state vraiable is set to true or not
  if (!open) {
    return null;
  }

  return (
    <>
      <div id='overlay' onClick={closeModal} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '2' }}>
        <div id='modal-container' onClick={(e) => { e.stopPropagation() }} style={{ backgroundColor: 'white', position: 'fixed', width: '20%', height: '60%', zIndex: '3', textAlign: 'center', borderRadius: '15px' }}>
            <h2 style={{ fontFamily: 'arial' }}>Add Video</h2>

            {/* Input such as height, width, img src and alt text */}
            <TextField id="set-height" label="Height" variant="outlined" type='text' onChange={e => setHeight(e.target.value)} value ={height}/>
            <TextField id="set-width" label="Width" variant="outlined" type='text' onChange={e => setWidth(e.target.value)} value ={width}/>
            <TextField id="set-url" label="Url" variant="outlined" type='text' onChange={e => setUrl(e.target.value)} value ={url}/>
            <FormGroup>
              <FormControlLabel control={<Checkbox defaultChecked onChange={e => setAutoplay(e.target.checked)} value ={autoplay}/>} label="Autoplay" />
            </FormGroup>
            <Button onClick={closeModal} variant="contained">Back</Button>
        </div>
      </div>
    </>
  );
}

export default AddVideoModal;
