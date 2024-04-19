import React from 'react';
import Draggable from 'react-draggable';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ImageBox = ({ height, width, url, alt, imageId, presId, presTitle, token }) => {
  const navigate = useNavigate();
  const nodeRef = React.useRef(null);

  // Prevents the box from going over the side
  const rightLimit = 1000 - parseInt(width);

  // Prevents the box from going over the bottom
  const bottomLimit = 700 - parseInt(height);

  // Right Click Handler for deleting the textbox
  const handleRightClick = (e) => {
    e.preventDefault(); // Prevent the default context menu
    console.log('Right-clicked!');
    getStore();
  };

  let currentData = ''
  const getStore = async () => {
    axios.get('http://localhost:5005/store', {
      headers: {
        Authorization: token,
      }
    }).then((response) => {
      // Get Current Data
      currentData = response.data.store;
      console.log('text dictionary', currentData[presId].content.slide1.image);

      // Delete textId from current data
      delete currentData[presId].content.slide1.image[imageId];

      console.log(currentData);

      // Put Request to Save the New Data
      savePres(currentData);
    })
  }

  // Save the changes to database
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
    navigate('/edit/' + presId + '/' + presTitle);
  }

  console.log([height, width, url, alt]);
  return (
    <>
      <Draggable nodeRef={nodeRef} bounds={{ left: 0, top: 0, right: rightLimit, bottom: bottomLimit }}>
        <div id="pres-slide" onContextMenu={handleRightClick} style={{ height: `${height}`, width: `${width}`, border: '0.2px solid grey' }}>
            <img ref={nodeRef} src={url} alt={alt} style={{ maxHeight: '100%', maxWidth: '100%' }}></img>
        </div>
      </Draggable>
    </>
  );
}

export default ImageBox;
