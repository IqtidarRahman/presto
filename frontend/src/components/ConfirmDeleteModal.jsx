import React from 'react';
import Button from '@mui/material/Button';
import DeletePresentation from '../components/DeletePresentation';

const ConfirmDeleteModal = ({ open, closeModal, token, deleteId }) => {
  // Check if the state vraiable is set to true or not
  if (!open) {
    return null;
  }

  return (
    <>
      <div id='overlay' onClick={closeModal} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '2' }}>
        <div id='modal-container' onClick={(e) => { e.stopPropagation() }} style={{ backgroundColor: 'white', position: 'fixed', width: '20%', height: '20%', zIndex: '3', textAlign: 'center', borderRadius: '15px' }}>
            <h2 style={{ fontFamily: 'arial' }}>Are you sure?</h2>
            <DeletePresentation token={token} deleteId={deleteId} closeModal={closeModal}/>
            <Button onClick={closeModal} variant="contained">No</Button>
        </div>
      </div>
    </>
  );
}

export default ConfirmDeleteModal;
