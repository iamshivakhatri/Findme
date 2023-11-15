import React, { useState, forwardRef } from 'react';
import '../css/EditPostModal.css';  // Import your CSS file for styling

const EditPostModal = ({id, isOpen, onClose, onSave, initialMessage }) => {
  const [editedMessage, setEditedMessage] = useState(initialMessage);

  const handleSave = () => {
    onSave(editedMessage);
    console.log("This is the id", id);
    onClose();
  };

  return (
    <>
      {/* Overlay to cover the background when the modal is open */}
      <div className={`overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
      
      {/* Main modal container */}
      <div className={`edit-post-modal ${isOpen ? 'open' : ''}`}>
        <div className="modal-content">
          {/* Editable textarea */}
          <textarea
            className="edit-textarea"
            value={editedMessage}
            onChange={(e) => setEditedMessage(e.target.value)}
            placeholder="Edit your post..."
          />
          
          {/* Save button */}
          <button className="save-button" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
};

export default EditPostModal;
