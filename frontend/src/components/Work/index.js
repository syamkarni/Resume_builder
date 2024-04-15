import React, { useState } from 'react';

const Work = () => {
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

  const handleWorkChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "descriptions") {
      const updatedDescriptions = [...currentWork.descriptions];
      updatedDescriptions[index] = value;
      setCurrentWork({ ...currentWork, descriptions: updatedDescriptions });
    } else if (name === "endDate") {
      const startDate = new Date(currentWork.startDate);
      const endDate = new Date(value);
      if (endDate <= startDate) {
        setEndDateError(true);
      } else {
        setEndDateError(false);
        setCurrentWork({ ...currentWork, [name]: value });
      }
    } else {
      setCurrentWork({ ...currentWork, [name]: value });
    }
  };

  const addDescriptionField = () => {
    setCurrentWork({ ...currentWork, descriptions: [...currentWork.descriptions, ''] });
  };

  const addWorkExperience = () => {
    if (!endDateError) {
      setWorkExperiences([...workExperiences, currentWork]);
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
        {/* add styling for the error and make sure that the text is smaller and in red */}

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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;