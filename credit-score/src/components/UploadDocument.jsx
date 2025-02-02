import React, { useState } from "react";
import { uploadBusinessDocument } from "../services/Api";

const UploadDocument = ({ businessId, token }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    try {
      const response = await uploadBusinessDocument(businessId, file, token);
      alert("File uploaded successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Upload error:", error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} accept=".csv,.pdf" />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadDocument;
