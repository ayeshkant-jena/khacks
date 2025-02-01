import React from "react";
import RegisterBusiness from "./components/RegisterBusiness";
import UploadDocument from "./components/UploadDocument";
import CreditScoreForm from "./components/CreditScoreForm";

const ScorePrediction = () => {
  const token = "your_jwt_token"; // Fetch from auth state or localStorage
  const businessId = 1; // Replace with the actual business ID after registration

  return (
    <div>
      <h1>Business Registration</h1>
      <RegisterBusiness token={token} />

      <h1>Upload Business Documents</h1>
      <UploadDocument businessId={businessId} token={token} />

      <h1>Predict Credit Score</h1>
      <CreditScoreForm token={token} />
    </div>
  );
};

export default ScorePrediction;
