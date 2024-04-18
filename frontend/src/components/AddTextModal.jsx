import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const AddTextModal = ({ open, closeModal }) => {
  const [height, setHeight] = React.useState('');
  const [width, setWidth] = React.useState('');
  const [text, setText] = React.useState('');
  const [fontSize, setFontSize] = React.useState('');
  const [textColour, setTextColor] = React.useState('');

  console.log([height, width, text, fontSize, textColour]);

  // Check if the state vraiable is set to true or not
  if (!open) {
    return null;
  }

  return (
    <>
      <div id='overlay' onClick={closeModal} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '2' }}>
        <div id='modal-container' onClick={(e) => { e.stopPropagation() }} style={{ backgroundColor: 'white', position: 'fixed', width: '20%', height: '60%', zIndex: '3', textAlign: 'center', borderRadius: '15px' }}>
            <h2 style={{ fontFamily: 'arial' }}>Add Text</h2>
            {/* <DeletePresentation token={token} deleteId={deleteId} closeModal={closeModal}/> */}
            {/* Input such as height, width, text, font size and text colour inside of textbox */}
            <TextField id="set-height" label="Height" variant="outlined" type='text' onChange={e => setHeight(e.target.value)} value ={height}/>
            <TextField id="set-width" label="Width" variant="outlined" type='text' onChange={e => setWidth(e.target.value)} value ={width}/>
            <TextField id="set-text" label="Text" variant="outlined" type='text' onChange={e => setText(e.target.value)} value ={text}/>
            <TextField id="set-font-size" label="Font Size" variant="outlined" type='text' onChange={e => setFontSize(e.target.value)} value ={fontSize}/>
            <TextField id="set-colour" label="Font Color" variant="outlined" type='text' onChange={e => setTextColor(e.target.value)} value ={textColour}/> <br/>
            <Button onClick={closeModal} variant="contained">Back</Button>
        </div>
      </div>
    </>
  );
}

export default AddTextModal;
