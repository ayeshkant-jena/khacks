// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
// import CreditScoreForm from './components/pages/CreditScoreForm';
import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';

function App() {
  return (
    
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        {/* <Route path="/credit-score-form" element={<CreditScoreForm />} /> */}
        <Route path="/landing-page" element={<LandingPage />} />

      </Routes>
    </Router>
  );
}

export default App;
