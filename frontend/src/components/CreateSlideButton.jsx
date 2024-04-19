import React from 'react';
import axios from 'axios';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const CreateSlideButton = ({ token, presId }) => {
  const clickCreate = () => {
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
      console.log('debug2330', currentData);
      console.log(presId);
      const slidesLength = Object.keys(currentData[presId].content).length;
      let newSlideId = 1
      if (slidesLength !== 0) {
        const keysArray = Object.keys(currentData[presId].content);

        // Keys in the text dictionary given as a string e.g "text1", filter out "text" then parse integer
        console.log(parseInt(keysArray[keysArray.length - 1].slice(5)) + 1);
        newSlideId = parseInt(keysArray[keysArray.length - 1].slice(5)) + 1;
      }

      // Create the textbox Id, by concatenating the "text" and ID number
      console.log('slide' + newSlideId.toString());
      const slideId = 'slide' + newSlideId.toString();

      // Add new item to the text dictionary inside of slide
      store = {
        ...currentData,
        [presId]: {
          ...currentData[presId],
          content: {
            ...currentData[presId].content,
            [slideId]: {
              text: {},
              image: {},
              video: {},
              code: {}
            },
          }
        }
      }
      console.log('<><><><><><><', store);
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
    }
  }

  return (
    <>
      <ListItem key={'Create Slide'} disablePadding >
        <ListItemButton onClick={clickCreate}>
          <ListItemIcon>
            <p>+</p>
          </ListItemIcon>
          <ListItemText primary={'Create Slide'} />
        </ListItemButton>
      </ListItem>
    </>
  );
}

export default CreateSlideButton;
