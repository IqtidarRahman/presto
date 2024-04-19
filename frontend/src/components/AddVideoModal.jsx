import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddVideoModal = ({ open, closeModal, token, presId, presTitle, slideId }) => {
  const navigate = useNavigate();
  const [height, setHeight] = React.useState('');
  const [width, setWidth] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [autoplay, setAutoplay] = React.useState(true);

  console.log([height, width, url, autoplay]);

  // Check if the state vraiable is set to true or not
  if (!open) {
    return null;
  }

  const saveVideoBox = () => {
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

      // Create videobox id
      // If no items in dictionary, then give id 1, else get the last items id and add 1
      const dictLength = Object.keys(currentData[presId].content[slideId].video).length;
      let newId = 1
      if (dictLength !== 0) {
        const keysArray = Object.keys(currentData[presId].content[slideId].video);

        // Keys in the video dictionary given as a string e.g "video1", filter out "video" then parse integer
        newId = parseInt(keysArray[keysArray.length - 1].slice(5)) + 1;
      }

      // Create the video Id, by concatenating the "video" and ID number
      const videoId = 'video' + newId.toString();

      // Add new item to the video dictionary inside of slide
      store = {
        ...currentData,
        [presId]: {
          ...currentData[presId],
          content: {
            ...currentData[presId].content,
            [slideId]: {
              ...currentData[presId].content[slideId],
              video: {
                ...currentData[presId].content[slideId].video,
                [videoId]: {
                  height: height,
                  width: width,
                  url: url,
                  autoplay: autoplay
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

    // Save the videobox into data
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
            <h2 style={{ fontFamily: 'arial' }}>Add Video</h2>

            {/* Input such as height, width, img src and alt text */}
            <TextField id="set-height" label="Height" variant="outlined" type='text' onChange={e => setHeight(e.target.value)} value ={height}/>
            <TextField id="set-width" label="Width" variant="outlined" type='text' onChange={e => setWidth(e.target.value)} value ={width}/>
            <TextField id="set-url" label="Url" variant="outlined" type='text' onChange={e => setUrl(e.target.value)} value ={url}/>
            <FormGroup>
              <FormControlLabel control={<Checkbox defaultChecked onChange={e => setAutoplay(e.target.checked)} value ={autoplay}/>} label="Autoplay" />
            </FormGroup>
            <Button onClick={saveVideoBox} variant="contained">Confirm</Button>
            <Button onClick={closeModal} variant="contained">Back</Button>
        </div>
      </div>
    </>
  );
}

export default AddVideoModal;
