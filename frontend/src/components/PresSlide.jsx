import React from 'react';
import Draggable from 'react-draggable';

const PresSlide = ({ token, presId, slideId }) => {
  const nodeRef = React.useRef(null);

  return (
    <>
      <div id="pres-slide" style={{ height: '700px', width: '1000px', backgroundColor: 'white', border: '1px solid black' }}>
        <div style={{ textAlign: 'center' }}>{slideId}</div>
        <Draggable nodeRef={nodeRef} bounds={{ left: 0, top: 0, right: 1000, bottom: 700 }}>
          <div ref={nodeRef}>
            slide
          </div>
        </Draggable>
      </div>
    </>
  );
}

export default PresSlide;
