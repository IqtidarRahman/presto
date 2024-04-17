import React from 'react';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

const PresentationCards = ({ name, description, slideCount }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = React.useState(false);
  console.log([name, description, slideCount]);

  console.log(name);

  // Goes to Edit Page upon clicking
  const goToEdit = () => {
    navigate('/edit');
  }

  return (
  // <div className="presentation-card" style = {{ border: '1px solid black', width: '250px', height: '125px' }}>
  //     {/* <div className="thumbnail">{thumbnail ? <img src={thumbnail} alt="Thumbnail" /> : <div className="empty-thumbnail">No Thumbnail</div>}</div> */}
  //     <div className="info">
  //         <h3>{name[0]}</h3>
  //         <p>{description}</p>
  //         <span>Slides: {slideCount}</span>
  //     </div>
  // </div>
    <div onClick = {goToEdit}>
      <Grid container spacing={0} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} style = {{ width: '400px', height: '200px', backgroundColor: 'white', borderRadius: '15px', fontFamily: 'Helvetica', marginLeft: '10px', marginRight: '10px', border: isHovered ? '2px solid #1e40af' : 'none' }}>
        <Grid item xs={12} style = {{ height: '70%', backgroundColor: '#f3f4f6', borderRadius: '15px 15px 0 0' }}>
        </Grid>
        <Grid item xs={6} style = {{ height: '15%' }}>
          <b>Name:</b> {name}
        </Grid>
        <Grid item xs={6} style = {{ height: '15%' }}>
          <b>Slides:</b> {slideCount}
        </Grid>
        <Grid item xs={12} style = {{ height: '15%' }}>
          <b>Description:</b> {description}
        </Grid>
      </Grid>
    </div>
  );
};

export default PresentationCards;
