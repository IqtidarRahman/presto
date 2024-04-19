import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCodeModal = ({ open, closeModal, token, presId, presTitle }) => {
  const navigate = useNavigate();
  const [height, setHeight] = React.useState('');
  const [width, setWidth] = React.useState('');
  const [code, setCode] = React.useState('');
  const [fontSize, setFontSize] = React.useState('');

  // Check if the state vraiable is set to true or not
  if (!open) {
    return null;
  }

  const saveCodeBox = () => {
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

      // Create codebox id
      // If no items in dictionary, then give id 1, else get the last items id and add 1
      const dictLength = Object.keys(currentData[presId].content.slide1.code).length;
      let newId = 1
      if (dictLength !== 0) {
        const keysArray = Object.keys(currentData[presId].content.slide1.code);

        // Keys in the code dictionary given as a string e.g "code1", filter out "code" then parse integer
        newId = parseInt(keysArray[keysArray.length - 1].slice(4)) + 1;
      }

      // Create the codebox Id, by concatenating the "code" and ID number
      const codeId = 'code' + newId.toString();

      // Add new item to the code dictionary inside of slide
      store = {
        ...currentData,
        [presId]: {
          ...currentData[presId],
          content: {
            ...currentData[presId].content,
            slide1: {
              ...currentData[presId].content.slide1,
              code: {
                ...currentData[presId].content.slide1.code,
                [codeId]: {
                  height: height,
                  width: width,
                  code: code,
                  fontSize: fontSize
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

    // Save the codebox into data
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
      navigate('/dashboard');
      navigate('/edit/' + presId + '/' + presTitle);
    }
  }

  return (
    <>
      <div id='overlay' onClick={closeModal} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '2' }}>
        <div id='modal-container' onClick={(e) => { e.stopPropagation() }} style={{ backgroundColor: 'white', position: 'fixed', width: '20%', height: '60%', zIndex: '3', textAlign: 'center', borderRadius: '15px' }}>
            <h2 style={{ fontFamily: 'arial' }}>Add Code</h2>

            {/* Input such as height, width, img src and alt text */}
            <TextField id="set-height" label="Height" variant="outlined" type='text' onChange={e => setHeight(e.target.value)} value ={height}/>
            <TextField id="set-width" label="Width" variant="outlined" type='text' onChange={e => setWidth(e.target.value)} value ={width}/>
            <TextField id="set-code" label="Code" variant="outlined" type='text' onChange={e => setCode(e.target.value)} value ={code} multiline rows={4}/>
            <TextField id="set-font-size" label="Font Size" variant="outlined" type='text' onChange={e => setFontSize(e.target.value)} value ={fontSize}/> <br/>
            <Button onClick={saveCodeBox} variant="contained">Confirm</Button>
            <Button onClick={closeModal} variant="contained">Back</Button>
        </div>
      </div>
    </>
  );
}

export default AddCodeModal;
