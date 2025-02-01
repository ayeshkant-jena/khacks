import React, { useState } from 'react';

const CreditScoreForm = () => {
  const [formData, setFormData] = useState({
    annualIncome: '',
    totalExpenses: '',
    existingDebts: '',
    annualCertificate: null,
    expensesFiles: null,
    debtFiles: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerBackground} />
      
      <h1 style={styles.title}>
        Fill the information and get credit score
      </h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formRow}>
          <div style={styles.inputContainer}>
            <img src="https://dashboard.codeparrot.ai/api/image/Z53oDTRi7Jes38r0/tdesign.png" alt="" style={styles.icon} />
            <input
              type="text"
              name="annualIncome"
              placeholder="Annual income"
              value={formData.annualIncome}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>
          <div style={styles.fileContainer}>
            <input
              type="file"
              name="annualCertificate"
              onChange={handleFileChange}
              style={styles.fileInput}
            />
          </div>
        </div>

        <div style={styles.formRow}>
          <div style={styles.inputContainer}>
            <img src="https://dashboard.codeparrot.ai/api/image/Z53oDTRi7Jes38r0/qlementi.png" alt="" style={styles.icon} />
            <input
              type="text"
              name="totalExpenses"
              placeholder="Total expenses"
              value={formData.totalExpenses}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>
          <div style={styles.fileContainer}>
            <input
              type="file"
              name="expensesFiles"
              onChange={handleFileChange}
              style={styles.fileInput}
            />
          </div>
        </div>

        <div style={styles.formRow}>
          <div style={styles.inputContainer}>
            <img src="https://dashboard.codeparrot.ai/api/image/Z53oDTRi7Jes38r0/arcticon.png" alt="" style={styles.icon} />
            <input
              type="text"
              name="existingDebts"
              placeholder="Existing debts"
              value={formData.existingDebts}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>
          <div style={styles.fileContainer}>
            <input
              type="file"
              name="debtFiles"
              onChange={handleFileChange}
              style={styles.fileInput}
            />
          </div>
        </div>

        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
          onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
        >
          <span style={styles.buttonText}>
            Get Your Credit Score
          </span>
          <img src="https://dashboard.codeparrot.ai/api/image/Z53oDTRi7Jes38r0/solar-ar.png" alt="" style={styles.buttonIcon} />
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#f2f6ff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  headerBackground: {
    width: '',
    height: '199px',
    backgroundColor: '#d9d9d9'
  },
  title: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '48px',
    fontWeight: 700,
    color: '#000000',
    textAlign: 'center',
    margin: '64px 0'
  },
  form: {
    width: '1030px',
    display: 'flex',
    flexDirection: 'column',
    gap: '40px'
  },
  formRow: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  inputContainer: {
    width: '370px',
    padding: '10px',
    backgroundColor: '#d9d9d9',
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  fileContainer: {
    width: '370px',
    padding: '10px',
    backgroundColor: '#d9d9d9',
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    width: '30px',
    height: '30px'
  },
  input: {
    border: 'none',
    background: 'transparent',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '20px',
    opacity: 0.5,
    width: '100%'
  },
  fileInput: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '20px',
    opacity: 0.5,
    width: '100%'
  },
  button: {
    width: '449px',
    padding: '21px 64px',
    backgroundColor: '#ffed69',
    border: '2px solid #000000',
    borderRadius: '100px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    marginTop: '40px'
  },
  buttonText: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '32px',
    color: '#000000'
  },
  buttonIcon: {
    width: '57px',
    height: '48px'
  }
};

export default CreditScoreForm;
