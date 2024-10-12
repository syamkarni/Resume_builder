import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './index.css';
import { useNavigate } from 'react-router-dom';

const BaseLayout = () => {
  const navigate = useNavigate();
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Resume Builder</Link> {/* Change this asap! */}


          <div className="navbar-options">
            <Link to="/description">Description</Link>
            <Link to="/pinfo">Personal Info</Link>
            <Link to="/work">Work Experience</Link>
            <Link to="/education">Education</Link>
            <Link to="/project">Projects</Link>
            <Link to="/eactivities">Extracurricular</Link>
            <Link to="/vdata">Volunteer Data</Link>
            <Link to="/certificates">Certificates</Link>
            <Link to="/awards">Awards</Link>
            <Link to="/skills">Skills</Link>
          </div>


          <div className="navbar-buttons">
            <button className="btn btn-light" onClick={() => navigate('/Ujson')}>
              Upload JSON {/* configure these later */}
            </button>
            <button className="btn btn-success" onClick={() => alert("Build Resume clicked!")}>
              Preview your Resume {/* configure this one too later */}
            </button>
          </div>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>

      {/* Commented out footer
      <footer>
        <p>&copy; Footer here</p>
      </footer>
      */}
    </div>
  );
}

export default BaseLayout;
