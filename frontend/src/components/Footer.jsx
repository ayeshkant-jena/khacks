import React from 'react';

const Footer = () => {
  const styles = {
    footer: {
      width: '100%',
      padding: '40px 0',
      fontFamily: 'Poppins, sans-serif',
      background: '#F2F6FF',
    },
    headingsContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '79px',
      marginBottom: '30px',
    },
    heading: {
      fontSize: '38px',
      fontWeight: 700,
      color: '#000000',
    },
    contentContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0 280px',
    },
    quickLinks: {
      fontSize: '32px',
      fontWeight: 400,
      color: '#000000',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    extraLinks: {
      fontSize: '32px',
      fontWeight: 400,
      color: '#000000',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    socialLinks: {
      display: 'flex',
      flexDirection: 'column',
      gap: '23px',
    },
    socialIcon: {
      width: '50px',
      height: '50px',
      cursor: 'pointer',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'scale(1.1)',
      },
    },
    link: {
      cursor: 'pointer',
      textDecoration: 'none',
      color: '#000000',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.headingsContainer}>
        <h2 style={styles.heading}>quick links</h2>
        <h2 style={styles.heading}>Extra links</h2>
        <h2 style={styles.heading}>Follow us</h2>
      </div>
      
      <div style={styles.contentContainer}>
        <div style={styles.quickLinks}>
          <a href="#" style={styles.link}>home</a>
          <a href="#" style={styles.link}>about</a>
          <a href="#" style={styles.link}>contact</a>
          <a href="#" style={styles.link}>shop</a>
        </div>

        <div style={styles.extraLinks}>
          <a href="#" style={styles.link}>login</a>
          <a href="#" style={styles.link}>register</a>
        </div>

        <div style={styles.socialLinks}>
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z53jqw58MnUDluNd/skill-ic.png"
            alt="Instagram"
            style={styles.socialIcon}
          />
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z53jqw58MnUDluNd/devicon.png"
            alt="Twitter"
            style={styles.socialIcon}
          />
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z53jqw58MnUDluNd/devicon-2.png"
            alt="LinkedIn"
            style={styles.socialIcon}
          />
          <img 
            src="https://dashboard.codeparrot.ai/api/image/Z53jqw58MnUDluNd/skill-ic-2.png"
            alt="GitHub"
            style={styles.socialIcon}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

