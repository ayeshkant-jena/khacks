// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import CreditScoreForm from './components/CreditScoreForm';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/credit-score-form" element={<CreditScoreForm />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/" element={<LandingPage />} />

      </Routes>
    </Router>
  );
}

export default App;
