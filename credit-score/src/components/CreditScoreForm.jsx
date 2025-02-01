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

  const [creditScore, setCreditScore] = useState(null);
  const [eligibilityText, setEligibilityText] = useState('');
  const [scoreColor, setScoreColor] = useState('');

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

  const calculateCreditScore = () => {
    const income = parseFloat(formData.annualIncome) || 0;
    const expenses = parseFloat(formData.totalExpenses) || 0;
    const debts = parseFloat(formData.existingDebts) || 0;

    if (!formData.annualIncome || !formData.totalExpenses || !formData.existingDebts) {
      setCreditScore(null); // Don't display score if any input is missing
      return;
    }

    let baseScore = 600;

    if (income >= 30000) {
      baseScore += (income - 30000) / 1000;
    }

    if (expenses >= 15000) {
      baseScore -= (expenses - 15000) / 2000;
    }

    if (debts >= 10000) {
      baseScore -= (debts - 10000) / 1500;
    }

    baseScore = Math.max(300, Math.min(850, baseScore));

    const finalScore = formData.annualCertificate || formData.expensesFiles || formData.debtFiles ? baseScore + 20 : baseScore;

    setCreditScore(Math.round(finalScore));

    // Set eligibility text and score color based on the credit score
    if (finalScore < 600) {
      setEligibilityText('Unfortunately, you are not eligible for a loan.');
      setScoreColor('#f44336'); // Red
    } else if (finalScore >= 600 && finalScore < 700) {
      setEligibilityText('You are eligible for a basic loan with higher interest rates.');
      setScoreColor('#ffeb3b'); // Yellow
    } else if (finalScore >= 700 && finalScore < 800) {
      setEligibilityText('You are eligible for a loan with moderate interest rates.');
      setScoreColor('#ff9800'); // Orange
    } else {
      setEligibilityText('Congratulations! You are eligible for a loan with the best interest rates.');
      setScoreColor('#4CAF50'); // Green
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentCard}>
        <h1 style={styles.headerTitle}>Credit Score Form</h1>
        <h2 style={styles.title}>Fill the information and get your credit score</h2>

        <form onSubmit={(e) => { e.preventDefault(); calculateCreditScore(); }} style={styles.form}>
          <div style={styles.inputWrapper}>
            <div style={styles.inputContainer}>
              <img src="https://dashboard.codeparrot.ai/api/image/Z53oDTRi7Jes38r0/tdesign.png" alt="annual income icon" style={styles.icon} />
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

          <div style={styles.inputWrapper}>
            <div style={styles.inputContainer}>
              <img src="https://dashboard.codeparrot.ai/api/image/Z53oDTRi7Jes38r0/qlementi.png" alt="expenses icon" style={styles.icon} />
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

          <div style={styles.inputWrapper}>
            <div style={styles.inputContainer}>
              <img src="https://dashboard.codeparrot.ai/api/image/Z53oDTRi7Jes38r0/arcticon.png" alt="debts icon" style={styles.icon} />
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

          <div style={styles.buttonWrapper}>
            <button
              type="submit"
              style={styles.button}
              onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
              onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
            >
              <span style={styles.buttonText}>Get Your Credit Score</span>
              <img src="https://dashboard.codeparrot.ai/api/image/Z53oDTRi7Jes38r0/solar-ar.png" alt="arrow icon" style={styles.buttonIcon} />
            </button>
          </div>
        </form>

        {/* Display the credit score */}
        {creditScore !== null && (
          <div style={styles.scoreContainer}>
            <h3>Your Credit Score is:</h3>
            <p style={{ ...styles.creditScore, color: scoreColor }}>{creditScore}</p>
            {/* Display eligibility text */}
            <p style={styles.eligibilityText}>{eligibilityText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#f2f6ff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 20px',
  },
  contentCard: {
    width: '100%',
    maxWidth: '800px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
    padding: '30px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '36px',
    fontWeight: 700,
    color: '#000000',
    marginBottom: '20px',
  },
  title: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '32px',
    fontWeight: 700,
    color: '#000000',
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
  },
  inputContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    backgroundColor: '#f8f8f8',
    padding: '10px',
    borderRadius: '8px',
  },
  fileContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: '10px',
    borderRadius: '8px',
  },
  icon: {
    width: '30px',
    height: '30px',
  },
  input: {
    border: 'none',
    background: 'transparent',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '18px',
    width: '100%',
    outline: 'none',
  },
  fileInput: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '18px',
    width: '100%',
    outline: 'none',
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  button: {
    width: '300px',
    padding: '15px 30px',
    backgroundColor: '#ffed69',
    border: '2px solid #000000',
    borderRadius: '50px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
  },
  buttonText: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '18px',
    fontWeight: 700,
    color: '#000000',
  },
  buttonIcon: {
    width: '24px',
    height: '24px',
  },
  scoreContainer: {
    marginTop: '20px',
    textAlign: 'center',
  },
  creditScore: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '40px',
    fontWeight: 700,
  },
  eligibilityText: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '20px',
    fontWeight: 700,
    color: '#000000',
    marginTop: '15px',
  },
};

export default CreditScoreForm;
