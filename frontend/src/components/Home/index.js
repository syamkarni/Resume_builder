import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Welcome to the Resume Builder</h1>
      <p>Get started by uploading your existing resume or create a new one!</p>

      {/* Upload JSON button */}
      <button
        className="btn btn-light"
        onClick={() => alert("Upload JSON clicked!")}
        style={{ marginRight: '20px' }}  
      >
        Upload JSON
      </button>

      {/* Start creating resume button */}
      <button
        className="btn btn-success"
        onClick={() => navigate('/description')}  
      >
        Start creating your resume now!
      </button>
    </div>
  );
}

export default Home;
