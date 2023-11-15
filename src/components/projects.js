/* projects.js */
import React, { useState } from 'react';
import "../css/projects.css";

const Projects = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "E-commerce Website",
      description: "Develop a fully functional e-commerce website with product listings, shopping cart, and secure payment processing.",
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Create a task management application where users can add, edit, and delete tasks. Implement features such as task prioritization and due dates.",
    },
    {
      id: 3,
      title: "Weather App",
      description: "Build a weather application that fetches real-time weather data based on user input or geolocation. Display temperature, conditions, and a forecast.",
    },
    {
      id: 4,
      title: "Fitness Tracker",
      description: "Develop a fitness tracking app that allows users to log their workouts, track progress, and set fitness goals. Include features like exercise categories and duration.",
    },
    {
      id: 5,
      title: "Recipe Book",
      description: "Design a recipe book application where users can search for recipes, save their favorite ones, and create shopping lists based on selected recipes.",
    },
  ]);
  

  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
  });

  const [editMode, setEditMode] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (editMode) {
      const updatedProjects = projects.map((project) =>
        project.id === projectForm.id ? { ...project, ...projectForm } : project
      );
      setProjects(updatedProjects);
      setEditMode(false);
    } else {
      setProjects([...projects, { id: Date.now(), ...projectForm }]);
    }

    setProjectForm({ title: "", description: "" });
  };

  const handleDeleteProject = (projectId) => {
    const updatedProjects = projects.filter((project) => project.id !== projectId);
    setProjects(updatedProjects);
  };

  const handleEditProject = (project) => {
    setProjectForm(project);
    setEditMode(true);
  };

  return (
    <div className="projects">
      <div className="main__container">
        <h2>Projects</h2>

        <form onSubmit={handleFormSubmit}>
          <label>
            Title:
            <input
              type="text"
              value={projectForm.title}
              onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
            />
          </label>
          <label>
            Description:
            <textarea
              value={projectForm.description}
              onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
            />
          </label>
          <button type="submit">{editMode ? "Update Project" : "Add Project"}</button>
        </form>

        <ul>
          {projects.map((project) => (
            <li key={project.id} className="card">
              <div className="card-header">
                <strong>{project.title}</strong>
              </div>
              <div>{project.description}</div>
              <div className="card-actions">
                <button onClick={() => handleEditProject(project)}>Edit</button>
                <button onClick={() => handleDeleteProject(project.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Projects;
