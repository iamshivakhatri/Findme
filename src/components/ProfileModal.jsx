import React, { useState } from "react";
import "../css/ProfileModal.css"; // Import your CSS file for styling

const ProfileModal = ({ isOpen, onClose, onSave, profileInfo }) => {
  const [editedProfileInfo, setEditedProfileInfo] = useState({ ...profileInfo });

  const handleSave = () => {
    onSave(editedProfileInfo);
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <input
          type="text"
          placeholder="Name"
          value={editedProfileInfo.name}
          onChange={(e) => setEditedProfileInfo({ ...editedProfileInfo, name: e.target.value })}
        />

        <input
          type="text"
          placeholder="Location"
          value={editedProfileInfo.location}
          onChange={(e) => setEditedProfileInfo({ ...editedProfileInfo, location: e.target.value })}
        />

        <input
          type="text"
          placeholder="Interests"
          value={editedProfileInfo.interests}
          onChange={(e) => setEditedProfileInfo({ ...editedProfileInfo, interests: e.target.value })}
        />

        <input
          type="text"
          placeholder="University"
          value={editedProfileInfo.university}
          onChange={(e) => setEditedProfileInfo({ ...editedProfileInfo, university: e.target.value })}
        />

        <input
          type="text"
          placeholder="Major"
          value={editedProfileInfo.major}
          onChange={(e) => setEditedProfileInfo({ ...editedProfileInfo, major: e.target.value })}
        />

        <input
          type="text"
          placeholder="Graduation Date"
          value={editedProfileInfo.graduationDate}
          onChange={(e) => setEditedProfileInfo({ ...editedProfileInfo, graduationDate: e.target.value })}
        />
        <input
          type="text"
          placeholder="Github url"
          value={editedProfileInfo.github}
          onChange={(e) => setEditedProfileInfo({ ...editedProfileInfo, github: e.target.value })}
        />
        <input
          type="text"
          placeholder="LinkedIn url"
          value={editedProfileInfo.linkedin}
          onChange={(e) => setEditedProfileInfo({ ...editedProfileInfo, linkedin: e.target.value })}
        />

        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default ProfileModal;
