import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Description from './components/Description';
import Pinfo from './components/Pinfo';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/description" element={<Description />} />
        <Route path="/Pinfo" element={<Pinfo />} />
      </Routes>
    </Router>
  );
}

export default App;
