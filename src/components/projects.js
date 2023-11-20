import React, { useState, useEffect } from 'react';
import '../css/projects.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import ProjectCard from './ProjectCard';
import { db } from './Firebase';
import { collection, query, where, getDocs, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import EditProjectModal from './EditProjectModal';

const Projects = () => {
  const user = useSelector(selectUser);
  console.log('user at the top', user);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projects, setProjects] = useState([  ]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedProject, setEditedProject] = useState(null);

  const handleEditProject = async (editedProject) => {
    try {
      // Update the project in the 'projects' collection in Firebase
      const projectRef = doc(db, 'projects', editedProject.id);
      await updateDoc(projectRef, {
        title: editedProject.title,
        description: editedProject.description,
      });

      // Update the state to reflect the changes
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === editedProject.id ? { ...project, ...editedProject } : project
        )
      );
    } catch (error) {
      console.error('Error editing project:', error.message);
    }
  };


  const handleDeleteProject = async (projectId) => {
    // Implement delete logic
    console.log('Delete project with ID:', projectId);
  
    try {
      // Delete the project from the 'projects' collection in Firebase
      await deleteDoc(doc(db, 'projects', projectId));
      // Update the state to reflect the deletion
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== projectId)
      );
    } catch (error) {
      console.error('Error deleting project:', error.message);
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
  
    // Add validation if needed
    if (!title || !description) {
      alert('Please fill in all fields');
      return;
    }
  
    // Create a new project object
    const newProject = {
      title,
      description,
      email: user.email, // Include the user's email in the project data
    };
  
    try {
      // Add the new project to the 'projects' collection in Firebase
      const docRef = await addDoc(collection(db, 'projects'), newProject);
      // Update the state with the new project
    setProjects((prevProjects) => [...prevProjects, newProject]);
      // Clear the form fields
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error adding project:', error.message);
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      // Check if user data is available before proceeding
      if (!user) {
        // User data is not available, you can handle this case (e.g., redirect to login)
        console.log('User data not available');
        return;
      }

      // User data is available, you can proceed with your logic
      console.log('User data available:', user);

      try {
        // Fetch projects where userEmail matches the user's email
        const q = query(collection(db, 'projects'), where('email', '==', user.email));
        const snapshot = await getDocs(q);

        const projectsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Update the state with the fetched projects
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching projects:', error.message);
      }
    };

    fetchData(); // Call the asynchronous function to fetch data
  }, [user]);

  const handleEditClick = (project) => {
    setEditedProject(project);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (editedProject) {
      handleEditProject(editedProject);
    }
    setIsEditModalOpen(false);
  };

  const handleCancelEdit = () => {
    setEditedProject(null);
    setIsEditModalOpen(false);
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const [searchTerm, setSearchTerm] = useState('');

  // Filter projects based on the search term
  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="projects">
      <div className="main__container">

        


        <form onSubmit={handleAddProject}>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <button type="submit">Add Project</button>
        </form>
        
        {/* Add a search bar */}
        <input
          type="text"
          placeholder="Search by project title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <h2>Projects</h2>

        <div className="card-list">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={handleEditClick}
              onDelete={handleDeleteProject}
            />
          ))}
        </div>

        <EditProjectModal
          isOpen={isEditModalOpen}
          onInputChange={handleInputChange}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
          editedProject={editedProject}
        />
      </div>
    </div>
  );
};

export default Projects;
