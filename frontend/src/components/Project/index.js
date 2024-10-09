import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Project = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);  
  const [currentProject, setCurrentProject] = useState({
    projectName: '',
    url: '',
    subtitle: '',
    startDate: '',
    endDate: '',
    descriptions: ['']
  });

  const [endDateError, setEndDateError] = useState(false);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'descriptions') {
        const updatedDescriptions = [...currentProject.descriptions];
        updatedDescriptions[index] = value;
        setCurrentProject({ ...currentProject, descriptions: updatedDescriptions });
    } else if (name === "endDate") {
        const startDate = new Date(currentProject.startDate);
        const endDate = new Date(value);
        if (endDate <= startDate) {
            setEndDateError(true);
        } else {
            setEndDateError(false);
            setCurrentProject({ ...currentProject, [name]: value });
        }
    } else {
        setCurrentProject({ ...currentProject, [name]: value });
    }
  };

  const addDescriptionField = () => {
    setCurrentProject({
      ...currentProject,
      descriptions: [...currentProject.descriptions, '']
    });
  };

  const addProject = () => {
    if (!endDateError && currentProject.startDate) {
        setProjects([...projects, currentProject]);
        setCurrentProject({
            projectName: '',
            url: '',
            subtitle: '',
            startDate: '',
            endDate: '',
            descriptions: ['']
        });
    }
  };

  const saveAllProjects = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/save_projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projects }),
      });

      if (!response.ok) {
        throw new Error('Failed to save projects');
      }

      const data = await response.json();
      console.log('Projects saved:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="section-container" id="project">
      <div className="section-main">
        <label htmlFor="projectName">Project Name:</label><br />
        <input
          type="text"
          id="projectName"
          name="projectName"
          value={currentProject.projectName}
          onChange={handleInputChange}
          required
        /><br />

        <label htmlFor="url">URL:</label><br />
        <input
          type="text"
          id="url"
          name="url"
          value={currentProject.url}
          onChange={handleInputChange}
        /><br />

        <label htmlFor="subtitle">Subtitle:</label><br />
        <input
          type="text"
          id="subtitle"
          name="subtitle"
          value={currentProject.subtitle}
          onChange={handleInputChange}
          required
        /><br />

        <label htmlFor="startDate">Start Date:</label><br />
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={currentProject.startDate}
          onChange={handleInputChange}
          required
        /><br />

        <label htmlFor="endDate">End Date:</label><br />
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={currentProject.endDate}
          onChange={handleInputChange}
        /><br />
        {endDateError && <div className="error">End date must be greater than start date.</div>}

        {currentProject.descriptions.map((description, index) => (
          <div key={index}>
            <label htmlFor={`description-${index}`}>Description:</label><br />
            <input
              type="text"
              id={`description-${index}`}
              name="descriptions"
              value={description}
              onChange={(e) => handleInputChange(e, index)}
              required
            /><br />
          </div>
        ))}

        <button type="button" onClick={addDescriptionField}>Add Description</button><br />
        <button type="button" onClick={addProject}>Add Project</button>

        {projects.map((project, index) => (
          <div key={index}>
            <h3>{project.projectName}</h3>
            <p>{project.subtitle}</p>
            <p>URL: <a href={project.url} target="_blank" rel="noopener noreferrer">{project.url}</a></p>
            <p>{project.startDate} to {project.endDate}</p>
            {project.descriptions.map((desc, descIndex) => (
              <p key={`desc-${descIndex}`}>{desc}</p>
            ))}
          </div>
        ))}
      </div>
      <br />
      <button onClick={() => navigate('/Education')}>Back</button>
      <button
        onClick={() => {
          saveAllProjects(); 
          navigate('/Eactivities');
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Project;
