import React from "react";
import CreditScoreHero from "../components/CreditScoreHero";
import InfoSection from "../components/InfoSection";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import './LandingPage.css'

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Navbar/>
      <CreditScoreHero />
      <InfoSection />
      <Footer/>
    </div>
  );
};

export default LandingPage;
