import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeleteSlide = ({ token, presId, slideId, setSlideId, slideNext, setSlideNext, presTitle }) => {
  const navigate = useNavigate();
  const clickDelete = () => {
    getStore();
  };

  const getStore = async () => {
    try {
      const response = await axios.get('http://localhost:5005/store', {
        headers: {
          Authorization: token,
        }
      });
      const currentData = response.data.store;
      const slides = currentData[presId].content;
      const keys = Object.keys(slides);
      const currentIndex = keys.indexOf(slideId);
      if (currentIndex !== -1) {
        // Delete the slideId key from the slides object
        delete slides[slideId];
      } else {
        console.log('slideId does not exist');
      }
      savePres(currentData);
    } catch (error) {
      console.error('Error fetching store:', error);
    }
  };

  const savePres = async (store) => {
    console.log(store);
    try {
      await axios.put('http://localhost:5005/store', { store },
        {
          headers: {
            Authorization: token,
          }
        });
    } catch (err) {
      alert(err.response.data.error);
    }

    navigate('/dashboard');
  }

  return (
    <>
      <ListItem key={'Delete slide'} disablePadding>
        <ListItemButton onClick={clickDelete}>
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary={'Delete slide'} />
        </ListItemButton>
      </ListItem>
    </>
  );
}

export default DeleteSlide;
