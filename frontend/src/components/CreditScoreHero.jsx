import React from 'react';

const CreditScoreHero = () => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '30px 0',
    width: '100%',
    maxWidth: '1440px',
    margin: '0 auto',
  };

  const leftWrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
    maxWidth: '557px',
  };

  const headingStyle = {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '40px',
    fontWeight: 400,
    color: '#151414',
    margin: 0,
  };

  const subTextStyle = {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '24px',
    fontWeight: 400,
    color: '#000000',
    margin: 0,
  };

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '21px 64px',
    background: '#FFED69',
    borderRadius: '100px',
    border: '2px solid #000000',
    cursor: 'pointer',
    width: 'fit-content',
    transition: 'transform 0.2s ease',
  };

  const buttonTextStyle = {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '32px',
    fontWeight: 400,
    color: '#000000',
    margin: 0,
  };

  const imageStyle = {
    width: '808px',
    height: '715px',
    borderRadius: '150px',
    objectFit: 'cover',
  };

  const arrowIconStyle = {
    width: '57px',
    height: '48px',
  };

  const handleButtonHover = (e) => {
    e.currentTarget.style.transform = 'scale(1.05)';
  };

  const handleButtonLeave = (e) => {
    e.currentTarget.style.transform = 'scale(1)';
  };

  return (
    <div style={containerStyle}>
      <div style={leftWrapperStyle}>
        <h1 style={headingStyle}>
          Get your Free Credit Score & Report instantly...
        </h1>
        <p style={subTextStyle}>
          Banks & lenders check your Credit Score before approving your loan.
        </p>
        <button 
          style={buttonStyle}
          onMouseEnter={handleButtonHover}
          onMouseLeave={handleButtonLeave}
          onClick={() => console.log('Login button clicked')}
        >
          <span style={buttonTextStyle}>Login And Ragister</span>
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z52_OTRi7Jes38rn/solar-ar.png" 
            alt="arrow" 
            style={arrowIconStyle}
          />
        </button>
      </div>
      <img
        src="https://dashboard.codeparrot.ai/api/image/Z52_OTRi7Jes38rn/rectangl.png"
        alt="Credit card security"
        style={imageStyle}
      />
    </div>
  );
};

export default CreditScoreHero;

