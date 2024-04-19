import React from 'react';
import PresSlide from '../components/PresSlide';
import { useLocation, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import EditTitleModal from '../components/EditTitleModal';
import AddTextModal from '../components/AddTextModal';
import ResponsiveDrawer from '../components/ResponsiveDrawer';
import Grid from '@mui/material/Grid';
import AddImageModal from '../components/AddImageModal';
import AddVideoModal from '../components/AddVideoModal';
import AddCodeModal from '../components/AddCodeModal';
import NextSlideButton from '../components/NextSlideButton';
import PrevSlideButton from '../components/PrevSlideButton';
import axios from 'axios';

function Edit ({ token }) {
  const { id, name } = useParams(); // Gets the id and name from parameters
  const location = useLocation();
  const [confirmModal, setConfirmModal] = React.useState(false); // Modal that says "Are you sure?" when you click delete presentation
  const [editModal, setEditModal] = React.useState(false); // Modal that allows you to edit the presentation title
  const [addTextModal, setAddTextModal] = React.useState(false); // Modal for making a new textbox
  const [addImageModal, setAddImageModal] = React.useState(false); // Modal for inserting image into presentation
  const [addVideoModal, setAddVideoModal] = React.useState(false); // Modal for inserting video into presentation
  const [addCodeModal, setAddCodeModal] = React.useState(false); // Modal for inserting code into presentation
  const [nextSlideButton, setNextSlideButton] = React.useState(false); // Button for going to next slide in presentation
  const [prevSlideButton, setPrevSlideButton] = React.useState(false); // Button for going to previous slide in presentation
  const [slideId, setSlideId] = React.useState('slide1');

  const [showNext, setShowNext] = React.useState(true);
  const [showPrev, setShowPrev] = React.useState(false);
  const [slideNext, setSlideNext] = React.useState();
  const [slidePrev, setSlidePrev] = React.useState();
  const [slideNumber, setSlideNumber] = React.useState();
  const [slideCount, setSlideCount] = React.useState();

  // Get the pathname of the page: will be in the form of /edit/(insert name of presentation here)
  const currentUrl = location.pathname;

  // Splits the URL up by '/' and put each components into an array
  // Take index 2 of this array to get the presentation id
  const urlParts = currentUrl.split('/');

  React.useEffect(() => {
    const getStore = async () => {
      try {
        const response = await axios.get('http://localhost:5005/store', {
          headers: {
            Authorization: token,
          }
        });
        const currentData = response.data.store;
        const slides = currentData[id].content;
        const keys = Object.keys(slides);
        setSlideCount(keys.length);
        const currentIndex = keys.indexOf(slideId);
        setSlideNumber(currentIndex + 1);
        const nextIndex = currentIndex + 1;
        const prevIndex = currentIndex - 1;

        if (nextIndex < keys.length) {
          const nextKey = keys[nextIndex];
          console.log('><><>>>><><><><><><><>><><<><><><><', nextKey);
          setSlideNext(nextKey);
          setShowNext(true);
        } else {
          setShowNext(false);
          console.log('No next slide available.');
        }
        if (prevIndex >= 0) {
          const prevKey = keys[prevIndex];
          console.log('PPPPPPPPPPPPPPPPPPPP', prevKey);
          setSlidePrev(prevKey);
          setShowPrev(true);
        } else {
          setShowPrev(false);
          console.log('No previous slide available.');
        }
      } catch (error) {
        console.error('Error fetching store:', error);
      }
    };

    getStore();
  }, [token, id, slideId]);

  return (
    <>
      {/* Modal that pops up when the delete button is pressed */}
      <ConfirmDeleteModal open={confirmModal} closeModal={() => setConfirmModal(false)} token={token} deleteId={urlParts[2]}/>
      <div style = {{ display: 'flex', justifyContent: 'right' }}>
          <EditTitleModal open={editModal} closeModal={() => setEditModal(false)} token={token} presId={id}/>
          <h3 style={{ fontFamily: 'arial' }}>{name}</h3>
          <Button onClick={() => setEditModal(true)}>Edit Title</Button>
      </div>
      <NextSlideButton open={nextSlideButton} closeModal={() => setNextSlideButton(false)} token={token} presId={id}/>
      <PrevSlideButton open={prevSlideButton} closeModal={() => setPrevSlideButton(false)} token={token} presId={id}/>

      <AddTextModal open={addTextModal} closeModal={() => setAddTextModal(false)} token={token} presId={id} presTitle={name}/>
      <AddImageModal open={addImageModal} closeModal={() => setAddImageModal(false)} token={token} presId={id} presTitle={name}/>
      <AddVideoModal open={addVideoModal} closeModal={() => setAddVideoModal(false)} token={token} presId={id} presTitle={name}/>
      <AddCodeModal open={addCodeModal} closeModal={() => setAddCodeModal(false)} token={token} presId={id} presTitle={name}/>
      <Grid container spacing={0} style= {{ height: '100%', backgroundColor: '#dbeafe' }}>
        <Grid item xs={2}>
          {/* <ResponsiveDrawer token={token} presId={id} openModal={() => setConfirmModal(true)} setAddTextModal={() => setAddTextModal(true)} setAddImageModal={() => setAddImageModal(true)} setAddVideoModal={() => setAddVideoModal(true)} setAddCodeModal={() => setAddCodeModal(true)} setNextSlideButton={() => setNextSlideButton(true)} setPrevSlideButton={() => setPrevSlideButton(true)}/> */}
          <ResponsiveDrawer token={token} presId={id} slideId={slideId} setSlideId={setSlideId} openModal={() => setConfirmModal(true)} setAddTextModal={() => setAddTextModal(true)} setAddImageModal={() => setAddImageModal(true)} setAddVideoModal={() => setAddVideoModal(true)} setAddCodeModal={() => setAddCodeModal(true)} setNextSlideButton={() => setNextSlideButton(true)} setPrevSlideButton={() => setPrevSlideButton(true)} slideNumber={slideNumber} slideCount={slideCount} showNext={showNext} showPrev={showPrev} slideNext={slideNext} slidePrev={slidePrev} presTitle={name}/>
        </Grid>
        <Grid item xs={10} style = {{ border: '1px solid grey', overflowX: 'auto' }}>
          <div style = {{ height: '100vh', width: '100%', backgroundColor: '#dbeafe' }}>
            <div style = {{ float: 'left' }}>
              {/* <Button onClick={() => setConfirmModal(true)} variant="contained">Delete</Button>
              <Button onClick={goBackToDash} variant="contained">Back</Button> */}
            </div>
            <br/><br/>
            <PresSlide token={token} presId={id} presTitle={name} slideId={slideId} setSlideId={() => setSlideId}/>
          </div >
        </Grid>
      </Grid>
    </>
  );
}

export default Edit;
