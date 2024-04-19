import React from 'react';

const SlideNumber = ({ slideNumber, slideCount }) => {
  return (
  <>
    <div style={{ borderRadius: '20px', fontSize: '1em', height: '50px', width: '50px', textAlign: 'center', backgroundColor: '#48CAE4', margin: 'auto' }}>
      {slideNumber}/{slideCount}
    </div>
  </>
  );
}

export default SlideNumber;
