import React, { useState } from 'react';
import '../css/BioEditModal.css';

const BioEditModal = ({ isOpen, onClose, onSave, initialBio }) => {
  const [editedBio, setEditedBio] = useState(initialBio);

  const handleSave = () => {
    onSave(editedBio);
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <textarea
          value={editedBio}
          onChange={(e) => setEditedBio(e.target.value)}
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default BioEditModal;
