import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EActivities = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [currentActivity, setCurrentActivity] = useState({
    organization: '',
    position: '',
    location: '',
    url: '',
    startDate: '',
    endDate: '',
    highlights: ['']
  });
  const [endDateError, setEndDateError] = useState(false);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'highlights') {
      const updatedHighlights = [...currentActivity.highlights];
      updatedHighlights[index] = value;
      setCurrentActivity({ ...currentActivity, highlights: updatedHighlights });
    } else if (name === "endDate") {
      const startDate = new Date(currentActivity.startDate);
      const endDate = new Date(value);
      if (endDate < startDate) {
        setEndDateError(true);
      } else {
        setEndDateError(false);
        setCurrentActivity(current => ({ ...current, [name]: value }));
      }
    } else {
      setCurrentActivity(current => ({ ...current, [name]: value }));
    }
  };

  const addHighlightField = () => {
    setCurrentActivity(current => ({
      ...current,
      highlights: [...current.highlights, '']
    }));
  };

  const addActivity = () => {
    if (!endDateError && currentActivity.startDate) {
      setActivities(current => [...current, currentActivity]);
      setCurrentActivity({
        organization: '',
        position: '',
        location: '',
        url: '',
        startDate: '',
        endDate: '',
        highlights: ['']
      });
      setEndDateError(false);
    }
  };

  const saveAllActivities = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/save_extracurricular', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ activities }),
      });

      if (!response.ok) {
        throw new Error('Failed to save activities');
      }

      const data = await response.json();
      console.log('Activities saved:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="section-container" id="eactivities">
      <div className="section-main">
        <label htmlFor="organization">Organization:</label><br />
        <input
          type="text"
          id="organization"
          name="organization"
          value={currentActivity.organization}
          onChange={handleInputChange}
          required
        /><br />

        <label htmlFor="position">Position:</label><br />
        <input
          type="text"
          id="position"
          name="position"
          value={currentActivity.position}
          onChange={handleInputChange}
          required
        /><br />

        <label htmlFor="location">Location:</label><br />
        <input
          type="text"
          id="location"
          name="location"
          value={currentActivity.location}
          onChange={handleInputChange}
          required
        /><br />

        <label htmlFor="url">URL:</label><br />
        <input
          type="text"
          id="url"
          name="url"
          value={currentActivity.url}
          onChange={handleInputChange}
        /><br />

        <label htmlFor="startDate">Start Date:</label><br />
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={currentActivity.startDate}
          onChange={handleInputChange}
          required
        /><br />

        <label htmlFor="endDate">End Date:</label><br />
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={currentActivity.endDate}
          onChange={handleInputChange}
          required
        />
        {endDateError && <div className="error">End date must be after the start date.</div>}
        {currentActivity.highlights.map((highlight, index) => (
          <div key={index}>
            <label htmlFor={`highlight-${index}`}>Highlight:</label><br />
            <input
              type="text"
              id={`highlight-${index}`}
              name="highlights"
              value={highlight}
              onChange={(e) => handleInputChange(e, index)}
              required
            /><br />
          </div>
        ))}
        <button type="button" onClick={addHighlightField}>Add Highlight</button><br />
        <button type="button" onClick={addActivity}>Add Activity</button>

        {activities.map((activity, index) => (
          <div key={index}>
            <h3>{activity.organization} - {activity.position}</h3>
            <p>{activity.location}</p>
            {activity.url && <p>URL: <a href={activity.url} target="_blank" rel="noopener noreferrer">{activity.url}</a></p>}
            <p>{activity.startDate} to {activity.endDate}</p>
            {activity.highlights.map((highlight, highlightIndex) => (
              <p key={highlightIndex}>{highlight}</p>
            ))}
          </div>
        ))}
      </div>
      <br />
      <button onClick={() => navigate('/Project')}>Back</button>
      <button
        onClick={() => {
          saveAllActivities();
          navigate('/Vdata');
        }}
      >
        Next
      </button>
    </div>
  );
};

export default EActivities;
