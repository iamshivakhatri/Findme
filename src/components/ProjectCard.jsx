// ProjectCard.js
import React from 'react';
import "../css/ProjectCard.css";

const ProjectCard = ({ project, onEdit, onDelete }) => {
  return (
    <div className="card">
      <div className="card-header">
        <strong>{project.title}</strong>
      </div>
      <div>{project.description}</div>
      <div className="card-actions">
        <button onClick={() => onEdit(project)}>Edit</button>
        <button onClick={() => onDelete(project.id)}>Delete</button>
      </div>
    </div>
  );
};

export default ProjectCard;
