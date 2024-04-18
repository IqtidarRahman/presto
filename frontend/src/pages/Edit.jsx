import React from 'react';
import PresSlide from '../components/PresSlide';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import EditTitleModal from '../components/EditTitleModal';

function Edit ({ token }) {
  const { id, name } = useParams(); // Gets the id and name from parameters
  const navigate = useNavigate();
  const location = useLocation();
  const [confirmModal, setConfirmModal] = React.useState(false); // Modal that says "Are you sure?" when you click delete presentation
  const [editModal, setEditModal] = React.useState(false); // Modal that allows you to edit the presentation title

  // Get the pathname of the page: will be in the form of /edit/(insert name of presentation here)
  const currentUrl = location.pathname;

  // Splits the URL up by '/' and put each components into an array
  // Take index 2 of this array to get the presentation id
  const urlParts = currentUrl.split('/');

  // Function to navigate back to dashboard
  const goBackToDash = () => {
    navigate('/dashboard');
  }

  return (
    <>
      <div style = {{ height: '100vh', backgroundColor: '#dbeafe' }}>
        <div style = {{ float: 'left' }}>
          <ConfirmDeleteModal open={confirmModal} closeModal={() => setConfirmModal(false)} token={token} deleteId={urlParts[2]}/>
          <Button onClick={() => setConfirmModal(true)} variant="contained">Delete</Button>
          <Button onClick={goBackToDash} variant="contained">Back</Button>
        </div>
        <br/><br/><br/>
        <div style = {{ display: 'flex', justifyContent: 'space-between' }}>
          <EditTitleModal open={editModal} closeModal={() => setEditModal(false)} token={token} presId={id}/>
          <h3 style={{ fontFamily: 'arial' }}>{name}</h3>
          <Button onClick={() => setEditModal(true)}>Edit Title</Button>
        </div>
        <PresSlide token={token} id={id} name={name}/>
      </div>
    </>
  );
}

export default Edit;
