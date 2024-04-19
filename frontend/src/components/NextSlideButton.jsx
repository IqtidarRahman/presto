import React from 'react';
import axios from 'axios';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const NextSlideButton = ({ token, presId, slideId, setSlideId }) => {
  const showNext = true;
  const showPrev = true;
  let slideNumber;
  let slideCount;

  const clickNext = () => {
    getStore();
  }

  let currentData = ''
  const getStore = async () => {
    axios.get('http://localhost:5005/store', {
      headers: {
        Authorization: token,
      }
    }).then((response) => {
      currentData = response.data.store;
      const slides = currentData[presId].content;

      const keys = Object.keys(slides);// ['slide1', 'slide2', 'slide3', 'slide4']
      console.log('keys ', keys);
      slideCount = keys.length;
      const currentKey = slideId;
      console.log('currentKey ', currentKey);
      const currentIndex = keys.indexOf(currentKey);
      slideNumber = currentIndex;
      console.log('currentIndex ', currentIndex);
      const nextIndex = currentIndex + 1;
      if (nextIndex < keys.length) {
        const nextKey = keys[nextIndex];
        console.log('Next key:', nextKey);
        console.log('Next slide content:', slides[nextKey].content);
        setSlideId(nextKey);
        console.log('<><><><><> comparison nextkey slideId', nextKey, slideId);
      } else {
        console.log('No next slide available.');
      }
    })
  }

  return (
    <>
      <ListItem key={'Next slide'} disablePadding style={{ visibility: `${showNext ? 'visible' : 'hidden'}` }}>
        <ListItemButton onClick={clickNext}>
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary={'Next slide'} />
        </ListItemButton>
      </ListItem>
      <ListItem key={'Prev slide'} disablePadding style={{ visibility: `${showPrev ? 'visible' : 'hidden'}` }}>
        <ListItemButton onClick={clickNext}>
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary={'Prev slide'} />
        </ListItemButton>
      </ListItem>
      <ListItem key={'Delete slide'} disablePadding style={{ visibility: `${showNext ? 'visible' : 'hidden'}` }}>
        <ListItemButton onClick={() => {}}>
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary={'Delete slide'} />
        </ListItemButton>
      </ListItem>
      <ListItem key={'Slide numbers'} disablePadding style={{ visibility: `${showNext ? 'visible' : 'hidden'}` }}>
        <ListItemButton onClick={() => {}}>
          <ListItemIcon>
          </ListItemIcon>
          {slideNumber} / {slideCount}
        </ListItemButton>
      </ListItem>
    </>
  );
}

export default NextSlideButton;
