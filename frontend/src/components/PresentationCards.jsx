import React from 'react';
import Grid from '@mui/material/Grid';

const PresentationCards = ({ name, description, slideCount }) => {
  console.log([name, description, slideCount]);

  console.log(name);
  return (
  // <div className="presentation-card" style = {{ border: '1px solid black', width: '250px', height: '125px' }}>
  //     {/* <div className="thumbnail">{thumbnail ? <img src={thumbnail} alt="Thumbnail" /> : <div className="empty-thumbnail">No Thumbnail</div>}</div> */}
  //     <div className="info">
  //         <h3>{name[0]}</h3>
  //         <p>{description}</p>
  //         <span>Slides: {slideCount}</span>
  //     </div>
  // </div>

      <Grid container spacing={0} style = {{ width: '300px', height: '150px', backgroundColor: 'white', borderRadius: '15px', fontFamily: 'Helvetica' }}>
        <Grid item xs={12} style = {{ height: '70%', backgroundColor: '#f3f4f6', borderRadius: '15px 15px 0 0' }}>
        </Grid>
        <Grid item xs={6} style = {{ height: '15%' }}>
          {name}
        </Grid>
        <Grid item xs={6} style = {{ height: '15%' }}>
          Slides: {slideCount}
        </Grid>
        <Grid item xs={12} style = {{ height: '15%' }}>
          {description}
        </Grid>
      </Grid>
  );
};

export default PresentationCards;
