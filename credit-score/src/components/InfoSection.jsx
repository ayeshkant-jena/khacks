import React from 'react';

const InfoSection = () => {
  console.log("InfoSection is rendering..."); // ✅ Debugging log

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '50px',
    padding: '20px',
    // maxWidth: '1440px',
    margin: '0 auto',
    background: '#F2F6FF',
    color: '#000000',
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '10px',
    width: '100%',
  };

  const buttonStyle = {
    display: 'flex',
    backgroundColor: '#FFED69',
    border: '2px solid #000000',
    borderRadius: '100px',
    padding: '10px',
    fontSize: '32px',
    fontFamily: 'Poppins',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };

  const cardContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '60px',
    width: '100%',
    maxWidth: '993px',
    margin: '0 auto',
  };

  const cardStyle = {
    backgroundColor: '#FFFFFF',
    borderRadius: '84px',
    padding: '40px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '40px',
    flexWrap: 'wrap',  // ✅ Added to fix layout issues
  };

  const featureTextStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <p style={{ fontSize: '40px', fontFamily: 'Poppins', color: '#020202' }}>
          Did you know? Checking your own credit score doesn't impact it.
        </p>
        <button 
          style={buttonStyle}
          onMouseOver={(e) => e.target.style.backgroundColor = '#FFE435'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#FFED69'}
        >
          Read More
        </button>
      </div>

      <h1 style={{ fontSize: '48px', fontFamily: 'Poppins', fontWeight: 700, textAlign: 'center' }}>
        Take a step to attain financial freedom
      </h1>

      <p style={{ fontSize: '36px', fontFamily: 'Poppins', textAlign: 'center' }}>
        Get these features when you take a Free CIBIL Score & Report.
      </p>

      <div style={cardContainerStyle}>
        <div style={cardStyle}>
          <img src="https://via.placeholder.com/253x205" alt="Line Chart" />
          <div style={featureTextStyle}>
            <h2 style={{ fontSize: '32px', fontFamily: 'Inter', fontWeight: 700 }}>
              Access Credit Dashboard
            </h2>
            <p style={{ fontSize: '24px', fontFamily: 'Poppins' }}>
              View your Credit Score and Report. You can refresh it once a year.
            </p>
          </div>
        </div>

        <div style={cardStyle}>
          <img src="https://via.placeholder.com/228x199" alt="Alert Square" />
          <div style={featureTextStyle}>
            <h2 style={{ fontSize: '32px', fontFamily: 'Poppins', fontWeight: 700 }}>
              Identify Frauds and Errors
            </h2>
            <p style={{ fontSize: '24px', fontFamily: 'Poppins' }}>
              Check for any fraudulent enquiries or errors in your credit details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
