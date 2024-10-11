import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Ujson = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [isJsonValid, setIsJsonValid] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && selectedFile.type === 'application/json') {
      setFile(selectedFile);
      setError('');
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const jsonData = JSON.parse(event.target.result);
          console.log("Parsed JSON data:", jsonData);

          fetch('http://127.0.0.1:5000/upload_resume', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
            mode: 'cors'
          })
          .then(response => response.json())
          .then(data => {
            console.log("Resume data successfully uploaded to backend:", data);
            setIsJsonValid(true);
          })
          .catch(error => {
            console.error("Error uploading resume data to backend:", error);
            setError('Error uploading the JSON data to the server.');
          });          

        } catch (error) {
          console.error("Error parsing JSON file:", error);
          setError('Error parsing the JSON file.');
        }
      };
      reader.readAsText(selectedFile);
    } else {
      setFile(null);
      setError('Please upload a valid JSON file.');
    }
  };

  const handleContinue = () => {
    if (isJsonValid) {

      navigate('/description');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Upload Your JSON File</h2>

      <input
        type="file"
        accept=".json"
        onChange={handleFileChange}
        style={{ marginBottom: '20px' }}
      />


      {error && <p style={{ color: 'red' }}>{error}</p>}


      {isJsonValid && (
        <button className="btn btn-success" onClick={handleContinue}>
          Continue
        </button>
      )}
    </div>
  );
};

export default Ujson;
