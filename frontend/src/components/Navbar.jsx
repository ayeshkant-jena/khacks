import React from 'react';

const Navbar = () => {
  const navStyles = {
    width: '100%',
    height: '120px',
    display: 'flex',
    alignItems: 'center',
    padding: '0 80px',
    backgroundColor: '#fff'
  };

  const logoStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  };

  const logoCircleStyles = {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: '#FFED69'
  };

  const logoTextStyles = {
    fontFamily: 'Poppins',
    fontSize: '24px',
    fontWeight: 700,
    color: '#535151'
  };

  const menuStyles = {
    display: 'flex',
    gap: '48px',
    marginLeft: '53px'
  };

  const menuItemStyles = {
    fontFamily: 'Poppins',
    fontSize: '24px',
    fontWeight: 400,
    color: '#000000',
    cursor: 'pointer',
    textDecoration: 'none'
  };

  const loginButtonStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '21px 64px',
    background: '#FFED69',
    borderRadius: '100px',
    border: '2px solid #000000',
    marginLeft: 'auto',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  const loginTextStyles = {
    fontFamily: 'Poppins',
    fontSize: '32px',
    fontWeight: 400,
    color: '#000000'
  };

  const arrowStyles = {
    width: '57px',
    height: '48px'
  };

  const handleLoginHover = (e) => {
    e.currentTarget.style.transform = 'scale(1.05)';
    e.currentTarget.style.backgroundColor = '#FFE435';
  };

  const handleLoginLeave = (e) => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.backgroundColor = '#FFED69';
  };

  return (
    <nav style={navStyles}>
      <div style={logoStyles}>
        <div style={logoCircleStyles}></div>
        <span style={logoTextStyles}>Digital Credit</span>
      </div>

      <div style={menuStyles}>
        <a href="#" style={menuItemStyles}>Product & services</a>
        <a href="#" style={menuItemStyles}>About us</a>
        <a href="#" style={menuItemStyles}>Contact us</a>
        <a href="#" style={menuItemStyles}>Support</a>
      </div>

      <div 
        style={loginButtonStyles}
        onMouseEnter={handleLoginHover}
        onMouseLeave={handleLoginLeave}
        onClick={() => console.log('Login clicked')}
      >
        <span style={loginTextStyles}>Login</span>
        <img 
          src="https://dashboard.codeparrot.ai/api/image/Z528OjRi7Jes38rk/solar-ar.png" 
          alt="arrow" 
          style={arrowStyles}
        />
      </div>
    </nav>
  );
};

export default Navbar;

