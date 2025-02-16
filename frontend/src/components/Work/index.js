import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Work = () => {
  const navigate = useNavigate();
  const [workExperiences, setWorkExperiences] = useState([]);
  const [currentWork, setCurrentWork] = useState({
    companyName: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    descriptions: ['']
  });
  const [endDateError, setEndDateError] = useState(false);

  useEffect(() => {
    fetchWorkExperiences();
  }, []);

  const fetchWorkExperiences = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/get_work_experience');
      const data = await response.json();
      console.log("Fetched work experiences:", data);
      setWorkExperiences(data.workExperiences);
    } catch (error) {
      console.error('Error fetching work experiences:', error);
    }
  };

  const handleWorkChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "descriptions") {
      const updatedDescriptions = [...currentWork.descriptions];
      updatedDescriptions[index] = value;
      setCurrentWork({ ...currentWork, descriptions: updatedDescriptions });
    } else if (name === 'endDate') {
      const startDate = new Date(currentWork.startDate);
      const endDate = new Date(value);
      setEndDateError(endDate <= startDate);
      setCurrentWork({ ...currentWork, [name]: value });
    } else {
      setCurrentWork({ ...currentWork, [name]: value });
    }
  };

  const addDescriptionField = () => {
    setCurrentWork({
      ...currentWork,
      descriptions: [...currentWork.descriptions, '']
    });
  };

  const addWorkExperience = async () => {
    if (!endDateError) {
      const updatedWorkExperiences = [...workExperiences, currentWork];
      setWorkExperiences(updatedWorkExperiences);
      
      await saveAllWorkExperiences(updatedWorkExperiences);
      
      setCurrentWork({
        companyName: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        descriptions: ['']
      });
    }
  };

  const deleteWorkExperience = async (index) => {
    if (window.confirm('Are you sure you want to delete this work experience?')) {
      const updatedWorkExperiences = workExperiences.filter((_, i) => i !== index);
      setWorkExperiences(updatedWorkExperiences);
      await saveAllWorkExperiences(updatedWorkExperiences);
    }
  };

  const saveAllWorkExperiences = async (updatedWorkExperiences) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/save_work_experience', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ workExperiences: updatedWorkExperiences }),
      });

      if (!response.ok) throw new Error('Failed to save work experiences');
      console.log('Work experiences saved:', await response.json());
    } catch (error) {
      console.error('Error saving work experiences:', error);
    }
  };

  return (
    <div className="section-container" id="work">
      <div className="section-main">
        <label htmlFor="wname">Company Name:</label><br />
        <input
          type="text"
          id="wname"
          name="companyName"
          value={currentWork.companyName}
          onChange={handleWorkChange}
          required
        /><br />

        <label htmlFor="position">Position:</label><br />
        <input
          type="text"
          id="position"
          name="position"
          value={currentWork.position}
          onChange={handleWorkChange}
          required
        /><br />

        <label htmlFor="wlocation">Location:</label><br />
        <input
          type="text"
          id="wlocation"
          name="location"
          value={currentWork.location}
          onChange={handleWorkChange}
          required
        /><br />

        <label htmlFor="wsdate">Start Date:</label><br />
        <input
          type="date"
          id="wsdate"
          name="startDate"
          value={currentWork.startDate}
          onChange={handleWorkChange}
          required
        /><br />

        <label htmlFor="wedate">End Date:</label><br />
        <input
          type="date"
          id="wedate"
          name="endDate"
          value={currentWork.endDate}
          onChange={handleWorkChange}
          required
        /><br />
        {endDateError && <div className="error">End date must be greater than start date</div>}

        {currentWork.descriptions.map((description, index) => (
          <div key={index} className="work-description">
            <label htmlFor={`wdescription-${index}`}>Description:</label><br />
            <input
              type="text"
              id={`wdescription-${index}`}
              name="descriptions"
              value={description}
              onChange={(e) => handleWorkChange(e, index)}
              required
            /><br />
          </div>
        ))}

        <button type="button" onClick={addDescriptionField}>Add Description</button><br />
        <button type="button" onClick={addWorkExperience}>Add Work</button>

        {workExperiences.map((work, index) => (
          <div key={index}>
            <h3>{work.companyName} - {work.position}</h3>
            <p>{work.location}</p>
            <p>{work.startDate} to {work.endDate}</p>
            {work.descriptions.map((desc, descIndex) => (
              <p key={descIndex}>{desc}</p>
            ))}
            <button
              type="button"
              onClick={() => deleteWorkExperience(index)}
              style={{ color: 'red', marginTop: '10px' }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <br />
      <button onClick={() => navigate('/Pinfo')}>Back</button>
      <button
        onClick={async () => {
          await saveAllWorkExperiences(workExperiences);
          navigate('/Education');
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Work;
