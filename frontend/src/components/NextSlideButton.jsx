import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import { useNavigate } from 'react-router-dom';

const NextSlideButton = ({ token, presId, slideId, setSlideId, slideNext, setSlideNext, presTitle }) => {
  const clickNext = () => {
    setSlideId(slideNext);
  };

  return (
    <>
      <ListItem key={'Next slide'} disablePadding>
        <ListItemButton onClick={clickNext}>
          <ListItemIcon>
            <p>→</p>
          </ListItemIcon>
          <ListItemText primary={'Next slide'} />
        </ListItemButton>
      </ListItem>
    </>
  );
}

export default NextSlideButton;
