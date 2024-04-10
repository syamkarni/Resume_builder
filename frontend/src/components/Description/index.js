import React from 'react';

const Description = () => {
  return (
    <div className="section-container" id="description">
      <div className="section-main">
        <label htmlFor="about">About: </label><br />
        <textarea id="about" name="about" rows="4" cols="50"></textarea><br />
      </div>
    </div>
  );
}

export default Description;
