// EditProjectModal.js

import React from 'react';
import "../css/EditProjectModal.css";

const EditProjectModal = ({ isOpen, onInputChange, onSave, onCancel, editedProject }) => {
  if (!isOpen || !editedProject) {
    return null;
  }

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="edit-modal">
        <h3>Edit Project</h3>
        <label>
          Title:
          <input type="text" name="title" value={editedProject.title} onChange={onInputChange} />
        </label>
        <label>
          Description:
          <textarea name="description" value={editedProject.description} onChange={onInputChange} />
        </label>
        <button onClick={onSave}>Save Changes</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default EditProjectModal;
