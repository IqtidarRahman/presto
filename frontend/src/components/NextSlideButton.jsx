import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const NextSlideButton = ({ token, presId, slideId, setSlideId, slideNext, setSlideNext, presTitle }) => {
  console.log('a');
  const clickNext = () => {
    console.log('b', setSlideId, slideNext, setSlideNext);
    setSlideId(slideNext);
    console.log('c');
  };

  console.log('d');

  return (
    <>
      <ListItem key={'Next slide'} disablePadding>
        <ListItemButton onClick={clickNext}>
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary={'Next slide'} />
        </ListItemButton>
      </ListItem>
    </>
  );
}

export default NextSlideButton;
