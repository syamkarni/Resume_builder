import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Description from './components/Description';
import Pinfo from './components/Pinfo';
import Work from './components/Work';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Description" element={<Description />} />
        <Route path="/Pinfo" element={<Pinfo />} />
        <Route path="/Work" element={<Work />} />
      </Routes>
    </Router>
  );
}

export default App;
