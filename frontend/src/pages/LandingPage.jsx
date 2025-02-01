import React from "react";
import CreditScoreHero from "../components/CreditScoreHero";
import InfoSection from "../components/InfoSection";
import './LandingPage.css'

const LandingPage = () => {
  return (
    <div className="landing-page">
      <CreditScoreHero />
      <InfoSection />
    </div>
  );
};

export default LandingPage;
