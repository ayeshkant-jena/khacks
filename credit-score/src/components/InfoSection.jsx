import React from 'react';

const InfoSection = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '50px',
    padding: '50px 20px',
    margin: '0 auto',
    maxWidth: '1200px',
    background: '#F2F6FF',
    color: '#000000',
  };

  const headerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
    textAlign: 'center',
  };

  const headerTextStyle = {
    fontSize: '40px',
    fontFamily: 'Poppins, sans-serif',
    color: '#020202',
    margin: 0,
    animation: 'fadeIn 2s',
  };

  const mainHeadingStyle = {
    fontSize: '48px',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 700,
    textAlign: 'center',
    color: '#151414',
    margin: 0,
    animation: 'slideIn 1.5s ease-out',
  };

  const subHeadingStyle = {
    fontSize: '36px',
    fontFamily: 'Poppins, sans-serif',
    textAlign: 'center',
    color: '#000000',
    margin: 0,
    animation: 'fadeIn 2s',
  };

  const buttonStyle = {
    backgroundColor: '#FFED69',
    border: '2px solid #000000',
    borderRadius: '100px',
    padding: '10px 20px',
    fontSize: '24px',
    fontFamily: 'Poppins, sans-serif',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    animation: 'bounceIn 1.5s ease-out',
  };

  const cardContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '40px',
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
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
    width: '100%',
    animation: 'zoomIn 1s ease-out',
  };

  const featureTextStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    maxWidth: '600px',
  };

  const cardTitleStyle = {
    fontSize: '32px',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 700,
    color: '#151414',
    margin: 0,
  };

  const cardTextStyle = {
    fontSize: '24px',
    fontFamily: 'Poppins, sans-serif',
    color: '#333333',
    margin: 0,
  };

  return (
    <div style={containerStyle}>
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideIn {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes bounceIn {
          0%, 20%, 40%, 60%, 80%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes zoomIn {
          from {
            transform: scale(0.5);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>

      <div style={headerStyle}>
        <p style={headerTextStyle}>
          Did you know? Checking your own credit score doesn't impact it.
        </p>
        {/* <button 
          style={buttonStyle}
          onMouseOver={(e) => e.target.style.backgroundColor = '#FFE435'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#FFED69'}
        >
          Read More
        </button> */}
      </div>

      <h1 style={mainHeadingStyle}>
        Take a step to attain financial freedom
      </h1>

      <p style={subHeadingStyle}>
        Get these features when you take a Free CIBIL Score & Report.
      </p>

      <div style={cardContainerStyle}>
        <div style={cardStyle}>
          <img src="https://via.placeholder.com/253x205" alt="Line Chart" />
          <div style={featureTextStyle}>
            <h2 style={cardTitleStyle}>
              Access Credit Dashboard
            </h2>
            <p style={cardTextStyle}>
              View your Credit Score and Report. You can refresh it once a year.
            </p>
          </div>
        </div>

        <div style={cardStyle}>
          <img src="https://via.placeholder.com/228x199" alt="Alert Square" />
          <div style={featureTextStyle}>
            <h2 style={cardTitleStyle}>
              Identify Frauds and Errors
            </h2>
            <p style={cardTextStyle}>
              Check for any fraudulent enquiries or errors in your credit details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
