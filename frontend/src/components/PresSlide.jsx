import React from 'react';

const PresSlide = ({ open }) => {
  // Check if PresSlide is meant to be opened
  if (!open) {
    return null;
  }

  return (
    <>
      <div id="pres-slide" style={{ height: '85%', width: '85%', backgroundColor: 'white' }}>slide</div>
    </>
  );
}

export default PresSlide;
