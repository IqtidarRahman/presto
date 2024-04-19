import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddImageModal = ({ open, closeModal, token, presId, presTitle, slideId }) => {
  const navigate = useNavigate();
  const [height, setHeight] = React.useState('');
  const [width, setWidth] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [alt, setAlt] = React.useState('');

  // Check if the state vraiable is set to true or not
  if (!open) {
    return null;
  }

  const saveImage = () => {
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
      const dictLength = Object.keys(currentData[presId].content[slideId].image).length;
      let newId = 1
      if (dictLength !== 0) {
        const keysArray = Object.keys(currentData[presId].content[slideId].image);

        // Keys in the text dictionary given as a string e.g "image1", filter out "image" then parse integer
        newId = parseInt(keysArray[keysArray.length - 1].slice(5)) + 1;
      }

      // Create the textbox Id, by concatenating the "text" and ID number
      const imageId = 'image' + newId.toString();

      // Add new item to the image dictionary inside of slide
      store = {
        ...currentData,
        [presId]: {
          ...currentData[presId],
          content: {
            ...currentData[presId].content,
            [slideId]: {
              ...currentData[presId].content[slideId],
              image: {
                ...currentData[presId].content[slideId].image,
                [imageId]: {
                  height: height,
                  width: width,
                  url: url,
                  alt: alt
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
  }

  // Save the image into data
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

  return (
    <>
      <div id='overlay' onClick={closeModal} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '2' }}>
        <div id='modal-container' onClick={(e) => { e.stopPropagation() }} style={{ backgroundColor: 'white', position: 'fixed', width: '20%', height: '60%', zIndex: '3', textAlign: 'center', borderRadius: '15px' }}>
            <h2 style={{ fontFamily: 'arial' }}>Add Image</h2>

            {/* Input such as height, width, img src and alt text */}
            <TextField id="set-height" label="Height" variant="outlined" type='text' onChange={e => setHeight(e.target.value)} value ={height}/>
            <TextField id="set-width" label="Width" variant="outlined" type='text' onChange={e => setWidth(e.target.value)} value ={width}/>
            <TextField id="set-url" label="Image Url" variant="outlined" type='text' onChange={e => setUrl(e.target.value)} value ={url}/>
            <TextField id="set-text" label="Alt Text" variant="outlined" type='text' onChange={e => setAlt(e.target.value)} value ={alt}/><br/>
            <Button onClick={saveImage} variant="contained">Confirm</Button>
            <Button onClick={closeModal} variant="contained">Back</Button>
        </div>
      </div>
    </>
  );
}

export default AddImageModal;
