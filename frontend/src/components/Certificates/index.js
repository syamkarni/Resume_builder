import React, { useState } from 'react';

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [currentCertificate, setCurrentCertificate] = useState({
    name: '',
    date: '',
    issuer: '',
    url: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCertificate((prev) => ({ ...prev, [name]: value }));
  };

  const addCertificate = () => {
    if (currentCertificate.name && currentCertificate.date && currentCertificate.issuer) {
      setCertificates((prev) => [...prev, currentCertificate]);
      setCurrentCertificate({
        name: '',
        date: '',
        issuer: '',
        url: ''
      });
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
              {certificate.url && <a href={certificate.url} target="_blank" rel="noopener noreferrer">View Certificate</a>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certificates;
