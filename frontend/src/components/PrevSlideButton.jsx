import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const PrevSlideButton = ({ open, closeModal, token, presId }) => {
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

  const saveTextBox = () => {
    getStore();
  }

  let currentData = ''
  let store = ''
  const getStore = async () => {
    axios.get('http://localhost:5005/store', {
      headers: {
        Authorization: token,
      }
    }).then((response) => {
      currentData = response.data.store;

      // Create textbox id
      // If no items in dictionary, then give id 1, else get the last items id and add 1
      const dictLength = Object.keys(currentData[presId].content.slide1.text).length;
      let newId = 1
      if (dictLength !== 0) {
        const keysArray = Object.keys(currentData[presId].content.slide1.text);

        // Keys in the text dictionary given as a string e.g "text1", filter out "text" then parse integer
        newId = parseInt(keysArray[keysArray.length - 1].slice(4)) + 1;
      }

      // Create the textbox Id, by concatenating the "text" and ID number
      const textId = 'text' + newId.toString();

      // Add new item to the text dictionary inside of slide
      store = {
        ...currentData,
        [presId]: {
          ...currentData[presId],
          content: {
            ...currentData[presId].content,
            slide1: {
              ...currentData[presId].content.slide1,
              text: {
                ...currentData[presId].content.slide1.text,
                [textId]: {
                  height: height,
                  width: width,
                  text: text,
                  fontSize: fontSize,
                  textColour: textColour
                },
              }
            }
          }
        }
      }
      console.log(store);
      // Put Request to Save the New Data
      savePres(store);
    })

    // Save the textbox into data
    const savePres = async (store) => {
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
    }
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
            <Button onClick={saveTextBox} variant="contained">Confirm</Button>
            <Button onClick={closeModal} variant="contained">Back</Button>
        </div>
      </div>
    </>
  );
}

export default PrevSlideButton;
