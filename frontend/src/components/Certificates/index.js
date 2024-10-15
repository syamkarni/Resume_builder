import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Certificates = () => {
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState([]);
  const [currentCertificate, setCurrentCertificate] = useState({
    name: '',
    date: '',
    issuer: '',
    url: ''
  });

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/get_certificates');
      const data = await response.json();
      setCertificates(data.certificates.certificates || []);
    } catch (error) {
      console.error('Error fetching certificates:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCertificate((prev) => ({ ...prev, [name]: value }));
  };

  const addCertificate = async () => {
    if (currentCertificate.name) {
      const updatedCertificates = [...certificates, currentCertificate];
      setCertificates(updatedCertificates);
      await saveCertificates(updatedCertificates);

      setCurrentCertificate({
        name: '',
        date: '',
        issuer: '',
        url: ''
      });
    }
  };

  const deleteCertificate = async (index) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      const updatedCertificates = certificates.filter((_, i) => i !== index);
      setCertificates(updatedCertificates);
      await saveCertificates(updatedCertificates);
    }
  };

  const saveCertificates = async (data) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/save_certificates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ certificates: data }),
      });

      if (!response.ok) {
        throw new Error('Failed to save certificates');
      }

      console.log('Certificates saved:', await response.json());
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="section-container" id="certificates">
      <div className="section-main">
        <label htmlFor="name">Certificate Name:</label><br />
        <input
          type="text"
          id="name"
          name="name"
          value={currentCertificate.name}
          onChange={handleInputChange}
          required
        /><br />

        <label htmlFor="date">Date:</label><br />
        <input
          type="date"
          id="date"
          name="date"
          value={currentCertificate.date}
          onChange={handleInputChange}
          required
        /><br />

        <label htmlFor="issuer">Issuer:</label><br />
        <input
          type="text"
          id="issuer"
          name="issuer"
          value={currentCertificate.issuer}
          onChange={handleInputChange}
          required
        /><br />

        <label htmlFor="url">Certificate URL:</label><br />
        <input
          type="url"
          id="url"
          name="url"
          value={currentCertificate.url}
          onChange={handleInputChange}
        /><br />

        <button type="button" onClick={addCertificate}>Add Certificate</button>

        <div className="certificate-list">
          {certificates.map((certificate, index) => (
            <div key={index} className="certificate-entry">
              <h3>{certificate.name}</h3>
              <p>Issued by: {certificate.issuer}</p>
              <p>Date: {certificate.date}</p>
              {certificate.url && (
                <a href={certificate.url} target="_blank" rel="noopener noreferrer">View Certificate</a>
              )}
              <br></br>
              <button
                type="button"
                onClick={() => deleteCertificate(index)}
                style={{ color: 'red', marginTop: '10px' }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      <br />
      <button onClick={() => navigate('/Vdata')}>Back</button>
      <button onClick={() => {
        addCertificate();
        navigate('/Awards');
      }}>Next</button>
    </div>
  );
};

export default Certificates;
