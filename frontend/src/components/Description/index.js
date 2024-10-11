import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Description = () => {
  const navigate = useNavigate();
  const [about, setAbout] = useState('');

  useEffect(() => {
    fetchDescription();
  }, []);

  const handleInputChange = (e) => {
    setAbout(e.target.value);
  };

  const fetchDescription = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/get_description');
      const data = await response.json();
      setAbout(data.description);
    } catch (error) {
      console.error('Error fetching description:', error);
    }
  };

  const saveDescription = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/save_description', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: about }), 
      });

      if (!response.ok) {
        throw new Error('Failed to save description');
      }

      const data = await response.json();
      console.log(data);  
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="section-container" id="description">
      <div className="section-main">
        <label htmlFor="about">About: </label><br />
        <textarea
          id="about"
          name="about"
          rows="4"
          cols="50"
          value={about}
          onChange={handleInputChange}
        /><br />
      </div>
      <button
        onClick={() => {
          saveDescription();  
          navigate('/Pinfo'); 
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Description;
