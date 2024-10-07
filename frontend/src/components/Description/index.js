import React from 'react';
import { useNavigate } from 'react-router-dom';

const Description = () => {
  const navigate = useNavigate();

  return (
    <div className="section-container" id="description">
      <div className="section-main">
        <label htmlFor="about">About: </label><br />
        <textarea id="about" name="about" rows="4" cols="50"></textarea><br />
      </div>
      <button onClick={() => navigate('/Pinfo')}>Next</button>
    </div>
  );
}

export default Description;
