import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Education = () => {
  const navigate = useNavigate();
  const [educations, setEducations] = useState([]); 
  const [currentEducation, setCurrentEducation] = useState({
    instituteName: '',
    url: '',
    area: '',
    studyType: '',
    startDate: '',
    endDate: '',
    location: ''
  });
  useEffect(() => {
    fetchEducations();
  }, []);
  const [endDateError, setEndDateError] = useState(false);
  const fetchEducations = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/get_education');
      const data = await response.json();
      setEducations(data.education.educations || []);
    } catch (error) {
      console.error('Error fetching educations:', error);
    }
  };
  const handleEChange = (e) => {
    const { name, value } = e.target;
    if (name === "endDate") {
      const startDate = new Date(currentEducation.startDate);
      const endDate = new Date(value);
      if (endDate <= startDate) {
        setEndDateError(true);
      } else {
        setEndDateError(false);
        setCurrentEducation(current => ({ ...current, [name]: value }));
      }
    } else {
      setCurrentEducation(current => ({ ...current, [name]: value }));
    }
  };

  const addEducation = () => {
    if (!endDateError) {
      const newEducation = { ...currentEducation };
      setEducations(current => [...current, newEducation]); 
      console.log("New education added:", newEducation);
      
      setCurrentEducation({
        instituteName: '',
        url: '',
        area: '',
        studyType: '',
        startDate: '',
        endDate: '',
        location: ''
      });

      setEndDateError(false);
    } else {
      console.log("Please fill out all required fields.");
    }
  };

  const saveAllEducations = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/save_education', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ educations }),
      });

      if (!response.ok) {
        throw new Error('Failed to save educations');
      }

      const data = await response.json();
      console.log('Education data saved:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='section-container' id='education'>
      <div className="section-main">
        <label htmlFor="instituteName">Institute Name:</label><br />
        <input
          type="text"
          id="instituteName"
          name="instituteName"
          value={currentEducation.instituteName}
          onChange={handleEChange}
          required
        /><br />

        <label htmlFor="url">URL:</label><br />
        <input
          type="text"
          id="url"
          name="url"
          value={currentEducation.url}
          onChange={handleEChange}
        /><br />

        <label htmlFor="area">Area of Study:</label><br />
        <input
          type="text"
          id="area"
          name="area"
          value={currentEducation.area}
          onChange={handleEChange}
          required
        /><br />

        <label htmlFor="studyType">Type of Study:</label><br />
        <input
          type="text"
          id="studyType"
          name="studyType"
          value={currentEducation.studyType}
          onChange={handleEChange}
          required
        /><br />

        <label htmlFor="startDate">Start Date:</label><br />
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={currentEducation.startDate}
          onChange={handleEChange}
          required
        /><br />

        <label htmlFor="endDate">End Date:</label><br />
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={currentEducation.endDate}
          onChange={handleEChange}
          required
        />
        {endDateError && <p className="error">End date cannot be before the start date.</p>}<br />

        <label htmlFor="location">Location:</label><br />
        <input
          type="text"
          id="location"
          name="location"
          value={currentEducation.location}
          onChange={handleEChange}
          required
        /><br />

        <button type="button" onClick={addEducation}>Add Education</button>
      </div>
      <br />
      <button onClick={() => navigate('/Work')}>Back</button>
      <button
        onClick={() => {
          saveAllEducations(); 
          navigate('/Project');
        }}
      >
        Next
      </button>

      {educations.map((edu, index) => (
        <div key={index} className="education-entry">
          <h3>{edu.instituteName}</h3>
          <p>{edu.area} - {edu.studyType}</p>
          <p>{edu.startDate} to {edu.endDate}</p>
          <p>{edu.location}</p>
          <a href={edu.url} target="_blank" rel="noopener noreferrer">Institute Website</a>
        </div>
      ))}
    </div>
  );
};

export default Education;
