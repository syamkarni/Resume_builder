import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Description from './components/Description';
import Pinfo from './components/Pinfo';
import Work from './components/Work';
import Education from './components/Education';
import Project from './components/Project';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Description" element={<Description />} />
        <Route path="/Pinfo" element={<Pinfo />} />
        <Route path="/Work" element={<Work />} />
        <Route path="/Education" element={<Education />} />
        <Route path="/Project" element={<Project />} />
      </Routes>
    </Router>
  );
}

export default App;
