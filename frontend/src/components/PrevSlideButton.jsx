import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const PrevSlideButton = ({ token, presId, slideId, setSlideId, slidePrev, setSlidePrev, presTitle }) => {
  console.log('a');
  const clickPrev = () => {
    setSlideId(slidePrev);
    console.log('c');
  };

  console.log('d');

  return (
    <>
      <ListItem key={'Prev slide'} disablePadding>
        <ListItemButton onClick={clickPrev}>
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary={'Prev slide'} />
        </ListItemButton>
      </ListItem>
    </>
  );
}

export default PrevSlideButton;
