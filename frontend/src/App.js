import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Description from './components/Description';
import Pinfo from './components/Pinfo';
import Work from './components/Work';
import Education from './components/Education';
import Project from './components/Project';
import EActivities from './components/EActivities';
import VData from './components/VData';
import Certificates from './components/Certificates';
import Awards from './components/Awards';
import Skills from './components/Skills';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Description" element={<Description />} />
        <Route path="/Pinfo" element={<Pinfo />} />
        <Route path="/Work" element={<Work />} />
        <Route path="/Education" element={<Education />} />
        <Route path="/Project" element={<Project />} />
        <Route path="/EActivities" element={<EActivities />} />
        <Route path="/VData" element={<VData />} />
        <Route path="/Certificates" element={<Certificates />} />
        <Route path="/Awards" element={<Awards />} />
        <Route path="/Skills" element={<Skills />} />
      </Routes>
    </Router>
  );
}

export default App;
