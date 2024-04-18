import React from 'react';
// import CurrentSlide from '../components/CurrentSlide';

import axios from 'axios';

const PresSlide = ({ token }) => {
  const [pressies, setPressieData] = React.useState({});

  React.useEffect(() => {
    axios.get('http://localhost:5005/store', {
      headers: {
        Authorization: token,
      }
    }).then((response) => {
      setPressieData(response.data.store);
      console.log(pressies[1]);
    })
  }, []);

  // useEffect(() => {
  //   if (Object.keys(pressies).length > 0) {
  //     console.log(pressies[1]);
  //   }
  // }, [pressies]);

  // location

  const pathParts = window.location.pathname.split('/');
  const presId = pathParts[3];// Assuming the URL structure is consistent and /edit/ is always at the same position
  console.log(presId);// Output will be '1' for your given URL

  console.log(pressies);
  console.log('1234625134');
  console.log(pressies[1]);
  console.log('9854692734');
  Object.entries(pressies).forEach(([key, value]) => {
    console.log(`Key ${key}: Name ${value.name}`);
    // if
  });

  // console.log(pressies[0].name);
  return (
    <>
      <div id="pres-slide" style={{ height: '85%', width: '85%', backgroundColor: 'white' }}>
      </div>
    </>
  );
}

export default PresSlide;
