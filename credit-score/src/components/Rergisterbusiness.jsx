import React, { useState } from "react";
import { registerBusiness } from "../services/Api";

const RegisterBusiness = ({ token }) => {
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    revenue: "",
    employees: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerBusiness(formData, token);
      alert("Business Registered Successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Business Name" onChange={handleChange} />
      <input type="text" name="industry" placeholder="Industry" onChange={handleChange} />
      <input type="number" name="revenue" placeholder="Annual Revenue" onChange={handleChange} />
      <input type="number" name="employees" placeholder="Number of Employees" onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterBusiness;
