import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BaseLayout from './components/BaseLayout';
import Home from './components/Home';
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
import Ujson from './components/Ujson';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ujson" element={<Ujson />} />
        <Route path="/" element={<BaseLayout />}>
          <Route path="description" element={<Description />} />
          <Route path="pinfo" element={<Pinfo />} />
          <Route path="work" element={<Work />} />
          <Route path="education" element={<Education />} />
          <Route path="project" element={<Project />} />
          <Route path="eactivities" element={<EActivities />} />
          <Route path="vdata" element={<VData />} />
          <Route path="certificates" element={<Certificates />} />
          <Route path="awards" element={<Awards />} />
          <Route path="skills" element={<Skills />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
