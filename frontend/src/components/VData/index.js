import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VData = () => {
  const navigate = useNavigate();
  const [volunteerData, setVolunteerData] = useState([]);
  const [currentVolunteer, setCurrentVolunteer] = useState({
    organization: '',
    position: '',
    location: '',
    url: '',
    startDate: '',
    endDate: '',
    highlights: ['']
  });
  const [endDateError, setEndDateError] = useState(false);
  useEffect(() => {
    fetchVolunteerData();
  }, []);
  const fetchVolunteerData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/get_volunteer_data');
      const data = await response.json();
      setVolunteerData(data.volunteer_data.volunteerData || []);
    } catch (error) {
      console.error('Error fetching volunteer data:', error);
    }
  };
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'highlights') {
      const updatedHighlights = [...currentVolunteer.highlights];
      updatedHighlights[index] = value;
      setCurrentVolunteer({ ...currentVolunteer, highlights: updatedHighlights });
    } else if (name === "endDate") {
      const startDate = new Date(currentVolunteer.startDate);
      const endDate = new Date(value);
      if (endDate < startDate) {
        setEndDateError(true);
      } else {
        setEndDateError(false);
        setCurrentVolunteer({ ...currentVolunteer, [name]: value });
      }
    } else {
      setCurrentVolunteer({ ...currentVolunteer, [name]: value });
    }
  };

  const addHighlightField = () => {
    setCurrentVolunteer(current => ({
      ...current,
      highlights: [...current.highlights, '']
    }));
  };

  const addVolunteerEntry = async () => {
    if (!endDateError) {
      setVolunteerData(current => [...current, currentVolunteer]);

      try {
        const response = await fetch('http://127.0.0.1:5000/save_volunteer_data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ volunteerData: [...volunteerData, currentVolunteer] }),
        });

        if (!response.ok) {
          throw new Error('Failed to save volunteer data');
        }

        const data = await response.json();
        console.log('Volunteer data saved:', data);
      } catch (error) {
        console.error('Error:', error);
      }

      setCurrentVolunteer({
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

  return (
    <div className="section-container" id="vdata">
      <div className="section-main">
        <label htmlFor="organization">Organization:</label><br />
        <input
          type="text"
          id="organization"
          name="organization"
          value={currentVolunteer.organization}
          onChange={handleInputChange}
          required
        /><br />

        <label htmlFor="position">Position:</label><br />
        <input
          type="text"
          id="position"
          name="position"
          value={currentVolunteer.position}
          onChange={handleInputChange}
          required
        /><br />

        <label htmlFor="location">Location:</label><br />
        <input
          type="text"
          id="location"
          name="location"
          value={currentVolunteer.location}
          onChange={handleInputChange}
          required
        /><br />

        <label htmlFor="url">URL:</label><br />
        <input
          type="text"
          id="url"
          name="url"
          value={currentVolunteer.url}
          onChange={handleInputChange}
        /><br />

        <label htmlFor="startDate">Start Date:</label><br />
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={currentVolunteer.startDate}
          onChange={handleInputChange}
          required
        /><br />

        <label htmlFor="endDate">End Date:</label><br />
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={currentVolunteer.endDate}
          onChange={handleInputChange}
          required
        />
        {endDateError && <div className="error">End date must be after the start date.</div>}
        <br />
        {currentVolunteer.highlights.map((highlight, index) => (
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
        <button type="button" onClick={addVolunteerEntry}>Add Volunteer Entry</button>

        {volunteerData.map((volunteer, index) => (
          <div key={index}>
            <h3>{volunteer.organization} - {volunteer.position}</h3>
            <p>{volunteer.location}</p>
            {volunteer.url && <p>URL: <a href={volunteer.url} target="_blank" rel="noopener noreferrer">{volunteer.url}</a></p>}
            <p>{volunteer.startDate} to {volunteer.endDate}</p>
            {volunteer.highlights.map((highlight, highlightIndex) => (
              <p key={highlightIndex}>{highlight}</p>
            ))}
          </div>
        ))}
      </div>
      <br />
      <button onClick={() => navigate('/EActivities')}>Back</button>
      <button onClick={() => {
        addVolunteerEntry();
        navigate('/Certificates');
      }}>Next</button>
    </div>
  );
};

export default VData;