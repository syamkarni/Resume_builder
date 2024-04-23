import React, { useState } from 'react';

const Education = () => {
  const [education, setEducation] = useState([]);
  const [currentEducation, setCurrentEducation] = useState({
    instituteName: '',
    url: '',
    area: '',
    studyType: '',
    startDate: '',
    endDate: '',
    location: ''
  });
  const [endDateError, setEndDateError] = useState(false);

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
    if (!endDateError && currentEducation.startDate && currentEducation.endDate) {
      setEducation(current => [...current, currentEducation]);
      setCurrentEducation({
        instituteName: '',
        url: '',
        area: '',
        studyType: '',
        startDate: '',
        endDate: '',
        location: ''
      });
      setEndDateError(false); // Resetting the end date error as well
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

      {/* Display the list of educations */}
      {education.map((edu, index) => (
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
