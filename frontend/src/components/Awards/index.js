import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Awards = () => {
  const navigate = useNavigate();
  const [awards, setAwards] = useState([]);
  const [currentAward, setCurrentAward] = useState({
    title: '',
    date: '',
    issuer: '',
    url: '',
    location: '',
    highlights: ['']
  });

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'highlights') {
      const updatedHighlights = [...currentAward.highlights];
      updatedHighlights[index] = value;
      setCurrentAward({ ...currentAward, highlights: updatedHighlights });
    } else {
      setCurrentAward((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addHighlightField = () => {
    setCurrentAward((prev) => ({
      ...prev,
      highlights: [...prev.highlights, '']
    }));
  };

  const addAward = () => {
    if (currentAward.title && currentAward.date && currentAward.issuer) {
      setAwards((prev) => [...prev, currentAward]);
      setCurrentAward({
        title: '',
        date: '',
        issuer: '',
        url: '',
        location: '',
        highlights: ['']
      });
    }
  };

  return (
    <div className="section-container" id="awards">
      <div className="section-main">
        <label htmlFor="title">Title:</label><br />
        <input
          type="text"
          id="title"
          name="title"
          value={currentAward.title}
          onChange={handleInputChange}
          required
        /><br />

        <label htmlFor="date">Date:</label><br />
        <input
          type="date"
          id="date"
          name="date"
          value={currentAward.date}
          onChange={handleInputChange}
          required
        /><br />

        <label htmlFor="issuer">Issuer:</label><br />
        <input
          type="text"
          id="issuer"
          name="issuer"
          value={currentAward.issuer}
          onChange={handleInputChange}
          required
        /><br />

        <label htmlFor="url">URL:</label><br />
        <input
          type="url"
          id="url"
          name="url"
          value={currentAward.url}
          onChange={handleInputChange}
        /><br />

        <label htmlFor="location">Location:</label><br />
        <input
          type="text"
          id="location"
          name="location"
          value={currentAward.location}
          onChange={handleInputChange}
          required
        /><br />

        {currentAward.highlights.map((highlight, index) => (
          <div key={index}>
            <label htmlFor={`highlight-${index}`}>Highlight:</label><br />
            <input
              type="text"
              id={`highlight-${index}`}
              name="highlights"
              value={highlight}
              onChange={(e) => handleInputChange(e, index)}
            /><br />
          </div>
        ))}
        <button type="button" onClick={addHighlightField}>Add Highlight</button><br />

        <button type="button" onClick={addAward}>Add Award</button>

        <div className="award-list">
          {awards.map((award, index) => (
            <div key={index} className="award-entry">
              <h3>{award.title}</h3>
              <p>Issued by: {award.issuer}</p>
              <p>Date: {award.date}</p>
              <p>Location: {award.location}</p>
              {award.url && <a href={award.url} target="_blank" rel="noopener noreferrer">View Award</a>}
              {award.highlights.map((highlight, highlightIndex) => (
                <p key={highlightIndex}>{highlight}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
      <br />
      <button onClick={() => navigate('/Certificates')}>Back</button>
      <button onClick={() => navigate('/Skills')}>Next</button>
    </div>
  );
};

export default Awards;
