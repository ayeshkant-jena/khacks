// registration.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1120px;
  padding: 40px;
  background-color: #f2f6ff;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  margin: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 67px;
  padding: 10px;
`;

const Title = styled.h1`
  margin: 0;
  font-family: 'Inter, sans-serif';
  font-size: 40px;
  font-weight: 700;
  color: #000000;
  text-align: center;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 440px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  height: 52px;
  padding: 10px 50px 10px 50px;
  background-color: #d9d9d9;
  border: none;
  border-radius: 4px;
  font-size: 24px;
  font-family: 'Inter, sans-serif';
  color: #000000;
  opacity: 0.8;
`;

const Icon = styled.img`
  width: 32px;
  height: 32px;
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
`;

const RegisterButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 21px 64px;
  min-width: 172px;
  height: 58px;
  background-color: #ffed69;
  border-radius: 100px;
  border: 2px solid #000000;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.05);
    background-color: #ffe834;
  }
`;

const RegisterText = styled.span`
  font-family: 'Poppins, sans-serif';
  font-size: 24px;
  font-weight: 500;
  color: #000000;
`;

const RegisterIcon = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    businessName: '',
    role: 'lender', // default role set to 'lender'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Ensure phone contains only numbers
    if (name === 'phone' && value && !/^\d*$/.test(value)) {
      return;
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password, phone, businessName, role } = formData;

    // Basic validation
    if (!name || !email || !password || !phone || !businessName || !role) {
      alert('Please fill in all fields.');
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Password strength validation
    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    // Successful registration simulation
    console.log('Form submitted:', formData);
    alert('Registration successful!');

    // Redirect to login page
    navigate('/');
  };

  return (
    <Container>
      <Header>
        <Title>Register Now</Title>
      </Header>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '1120px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'space-between', width: '100%' }}>
          {[
            { name: 'name', placeholder: 'Name', icon: 'mdi-rena.png' },
            { name: 'email', placeholder: 'Email', icon: 'mdi-emai.png' },
            { name: 'password', placeholder: 'Password', icon: 'carbon-p.png' },
            { name: 'phone', placeholder: 'Phone', icon: 'mdi-ligh.png' },
            { name: 'businessName', placeholder: 'Business Name', icon: 'mdi-busi.png' },
          ].map(({ name, placeholder, icon }) => (
            <InputContainer key={name}>
              <Icon src={`https://dashboard.codeparrot.ai/api/image/Z52_Lg58MnUDluNS/${icon}`} alt={name} />
              <Input
                type={name === 'password' ? 'password' : name === 'email' ? 'email' : 'text'}
                name={name}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleInputChange}
              />
            </InputContainer>
          ))}

          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '18px', marginRight: '10px' }}>Role:</label>
            <label>
              <input
                type="radio"
                name="role"
                value="lender"
                checked={formData.role === 'lender'}
                onChange={handleInputChange}
              />
              Lender
            </label>
            <label style={{ marginLeft: '20px' }}>
              <input
                type="radio"
                name="role"
                value="borrower"
                checked={formData.role === 'borrower'}
                onChange={handleInputChange}
              />
              Borrower
            </label>
          </div>
        </div>
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <RegisterButton type="submit">
            <RegisterText>Register</RegisterText>
            <RegisterIcon src="https://dashboard.codeparrot.ai/api/image/Z52_Lg58MnUDluNS/solar-ar.png" alt="arrow" />
          </RegisterButton>
        </div>
        <p style={{ marginTop: '20px', textAlign: 'center' }}>
          Already have an account? <Link to="/login" style={{ color: 'blue' }}>Login Now</Link>
        </p>
      </form>
    </Container>
  );
};

export default RegistrationPage;
