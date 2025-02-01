import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; // Importing axios for API requests
import userIcon from './user.png'; // Adjust the path as needed
import userPass from './padlock.png';

// Styled components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f6f9;
  padding: 20px;
`;

const LoginCard = styled.div`
  display: flex;
  width: 900px;
  height: 550px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

const LeftImage = styled.div`
  width: 50%;
  background: url('https://dashboard.codeparrot.ai/api/image/Z5vNXuxZjZ9DnB_c/image.png') center/cover;
`;

const RightSection = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #eef2f5;
  padding: 12px 15px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const InputIcon = styled.img`
  width: 25px;
  margin-right: 10px;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  background: transparent;
  font-size: 16px;
  outline: none;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #FFED69;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background: #ffdb4d;
  }
`;

const RegisterText = styled.p`
  margin-top: 15px;
  font-size: 14px;
  color: #666;
  text-align: center;
  a {
    color: #007bff;
    text-decoration: none;
    font-weight: bold;
  }
`;

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    if (!username || !password) {
      setErrorMessage('Please enter both username and password.');
      return;
    }

    try {
      // Send login request to Django API
      const response = await axios.post('http://localhost:8000/auth/login/', {
        username: username,
        password: password,
      });

      // Handle successful login
      if (response.status === 200) {
        alert('Login successful!');
        // Redirect to the dashboard
        navigate('/dashboard');
      }
    } catch (error) {
      // Handle errors (e.g., invalid credentials)
      if (error.response && error.response.status === 400) {
        setErrorMessage('Invalid username or password. Please try again.');
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <Container>
      <LoginCard>
        <LeftImage />
        <RightSection>
          <Title>Login</Title>
          <Subtitle>Sign in to your account</Subtitle>

          <form onSubmit={handleLogin}>
            <InputWrapper>
              <InputIcon src={userIcon} alt="user" />
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </InputWrapper>

            <InputWrapper>
              <InputIcon src={userPass} alt="password" />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputWrapper>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message */}

            <LoginButton type="submit">Login</LoginButton>
          </form>

          <RegisterText>
            Don't have an account? <Link to="/TermsAndConditions">Register Now</Link>
          </RegisterText>
        </RightSection>
      </LoginCard>
    </Container>
  );
};

export default LoginPage;
