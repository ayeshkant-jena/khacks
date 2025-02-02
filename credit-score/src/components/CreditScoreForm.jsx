// import React, { useState } from 'react';

// const CreditScoreForm = () => {
//   const [formData, setFormData] = useState({
//     annualIncome: '',
//     totalExpenses: '',
//     existingDebts: '',
//     annualCertificate: null,
//     expensesFiles: null,
//     debtFiles: null
//   });

//   const [creditScore, setCreditScore] = useState(null);
//   const [eligibilityText, setEligibilityText] = useState('');
//   const [scoreColor, setScoreColor] = useState('');

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: files[0]
//     }));
//   };

//   const calculateCreditScore = () => {
//     const income = parseFloat(formData.annualIncome) || 0;
//     const expenses = parseFloat(formData.totalExpenses) || 0;
//     const debts = parseFloat(formData.existingDebts) || 0;

//     if (!formData.annualIncome || !formData.totalExpenses || !formData.existingDebts) {
//       setCreditScore(null); // Don't display score if any input is missing
//       return;
//     }

//     let baseScore = 600;

//     if (income >= 30000) {
//       baseScore += (income - 30000) / 1000;
//     }

//     if (expenses >= 15000) {
//       baseScore -= (expenses - 15000) / 2000;
//     }

//     if (debts >= 10000) {
//       baseScore -= (debts - 10000) / 1500;
//     }

//     baseScore = Math.max(300, Math.min(850, baseScore));

//     const finalScore = formData.annualCertificate || formData.expensesFiles || formData.debtFiles ? baseScore + 20 : baseScore;

//     setCreditScore(Math.round(finalScore));

//     // Set eligibility text and score color based on the credit score
//     if (finalScore < 600) {
//       setEligibilityText('Unfortunately, you are not eligible for a loan.');
//       setScoreColor('#f44336'); // Red
//     } else if (finalScore >= 600 && finalScore < 700) {
//       setEligibilityText('You are eligible for a basic loan with higher interest rates.');
//       setScoreColor('#ffeb3b'); // Yellow
//     } else if (finalScore >= 700 && finalScore < 800) {
//       setEligibilityText('You are eligible for a loan with moderate interest rates.');
//       setScoreColor('#ff9800'); // Orange
//     } else {
//       setEligibilityText('Congratulations! You are eligible for a loan with the best interest rates.');
//       setScoreColor('#4CAF50'); // Green
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.contentCard}>
//         <h1 style={styles.headerTitle}>Credit Score Form</h1>
//         <h2 style={styles.title}>Fill the information and get your credit score</h2>

//         <form onSubmit={(e) => { e.preventDefault(); calculateCreditScore(); }} style={styles.form}>
//           <div style={styles.inputWrapper}>
//             <div style={styles.inputContainer}>
//               <img src="https://dashboard.codeparrot.ai/api/image/Z53oDTRi7Jes38r0/tdesign.png" alt="annual income icon" style={styles.icon} />
//               <input
//                 type="text"
//                 name="annualIncome"
//                 placeholder="Annual income"
//                 value={formData.annualIncome}
//                 onChange={handleInputChange}
//                 style={styles.input}
//               />
//             </div>
//             <div style={styles.fileContainer}>
//               <input
//                 type="file"
//                 name="annualCertificate"
//                 onChange={handleFileChange}
//                 style={styles.fileInput}
//               />
//             </div>
//           </div>

//           <div style={styles.inputWrapper}>
//             <div style={styles.inputContainer}>
//               <img src="https://dashboard.codeparrot.ai/api/image/Z53oDTRi7Jes38r0/qlementi.png" alt="expenses icon" style={styles.icon} />
//               <input
//                 type="text"
//                 name="totalExpenses"
//                 placeholder="Total expenses"
//                 value={formData.totalExpenses}
//                 onChange={handleInputChange}
//                 style={styles.input}
//               />
//             </div>
//             <div style={styles.fileContainer}>
//               <input
//                 type="file"
//                 name="expensesFiles"
//                 onChange={handleFileChange}
//                 style={styles.fileInput}
//               />
//             </div>
//           </div>

//           <div style={styles.inputWrapper}>
//             <div style={styles.inputContainer}>
//               <img src="https://dashboard.codeparrot.ai/api/image/Z53oDTRi7Jes38r0/arcticon.png" alt="debts icon" style={styles.icon} />
//               <input
//                 type="text"
//                 name="existingDebts"
//                 placeholder="Existing debts"
//                 value={formData.existingDebts}
//                 onChange={handleInputChange}
//                 style={styles.input}
//               />
//             </div>
//             <div style={styles.fileContainer}>
//               <input
//                 type="file"
//                 name="debtFiles"
//                 onChange={handleFileChange}
//                 style={styles.fileInput}
//               />
//             </div>
//           </div>

//           <div style={styles.buttonWrapper}>
//             <button
//               type="submit"
//               style={styles.button}
//               onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
//               onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
//             >
//               <span style={styles.buttonText}>Get Your Credit Score</span>
//               <img src="https://dashboard.codeparrot.ai/api/image/Z53oDTRi7Jes38r0/solar-ar.png" alt="arrow icon" style={styles.buttonIcon} />
//             </button>
//           </div>
//         </form>

//         {/* Display the credit score */}
//         {creditScore !== null && (
//           <div style={styles.scoreContainer}>
//             <h3>Your Credit Score is:</h3>
//             <p style={{ ...styles.creditScore, color: scoreColor }}>{creditScore}</p>
//             {/* Display eligibility text */}
//             <p style={styles.eligibilityText}>{eligibilityText}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     width: '100%',
//     minHeight: '100vh',
//     backgroundColor: '#f2f6ff',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: '40px 20px',
//   },
//   contentCard: {
//     width: '100%',
//     maxWidth: '800px',
//     backgroundColor: '#ffffff',
//     borderRadius: '12px',
//     boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
//     padding: '30px 20px',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   headerTitle: {
//     fontFamily: 'Poppins, sans-serif',
//     fontSize: '36px',
//     fontWeight: 700,
//     color: '#000000',
//     marginBottom: '20px',
//   },
//   title: {
//     fontFamily: 'Poppins, sans-serif',
//     fontSize: '32px',
//     fontWeight: 700,
//     color: '#000000',
//     textAlign: 'center',
//     marginBottom: '20px',
//   },
//   form: {
//     width: '100%',
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '20px',
//   },
//   inputWrapper: {
//     width: '100%',
//     display: 'flex',
//     justifyContent: 'space-between',
//     gap: '20px',
//   },
//   inputContainer: {
//     flex: 1,
//     display: 'flex',
//     alignItems: 'center',
//     gap: '15px',
//     backgroundColor: '#f8f8f8',
//     padding: '10px',
//     borderRadius: '8px',
//   },
//   fileContainer: {
//     flex: 1,
//     display: 'flex',
//     alignItems: 'center',
//     backgroundColor: '#f8f8f8',
//     padding: '10px',
//     borderRadius: '8px',
//   },
//   icon: {
//     width: '30px',
//     height: '30px',
//   },
//   input: {
//     border: 'none',
//     background: 'transparent',
//     fontFamily: 'Poppins, sans-serif',
//     fontSize: '18px',
//     width: '100%',
//     outline: 'none',
//   },
//   fileInput: {
//     fontFamily: 'Poppins, sans-serif',
//     fontSize: '18px',
//     width: '100%',
//     outline: 'none',
//   },
//   buttonWrapper: {
//     display: 'flex',
//     justifyContent: 'center',
//     marginTop: '20px',
//   },
//   button: {
//     width: '300px',
//     padding: '15px 30px',
//     backgroundColor: '#ffed69',
//     border: '2px solid #000000',
//     borderRadius: '50px',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '10px',
//     cursor: 'pointer',
//   },
//   buttonText: {
//     fontFamily: 'Poppins, sans-serif',
//     fontSize: '18px',
//     fontWeight: 700,
//     color: '#000000',
//   },
//   buttonIcon: {
//     width: '24px',
//     height: '24px',
//   },
//   scoreContainer: {
//     marginTop: '20px',
//     textAlign: 'center',
//   },
//   creditScore: {
//     fontFamily: 'Poppins, sans-serif',
//     fontSize: '40px',
//     fontWeight: 700,
//   },
//   eligibilityText: {
//     fontFamily: 'Poppins, sans-serif',
//     fontSize: '20px',
//     fontWeight: 700,
//     color: '#000000',
//     marginTop: '15px',
//   },
// };

// export default CreditScoreForm;
import React, { useState } from "react";
import { predictCreditScore } from "../services/Api";

const CreditScoreForm = ({ token }) => {
  const [formData, setFormData] = useState({
    Occupation: "",
    Payment_of_Min_Amount: "",
    Payment_Behaviour: "",
    Credit_Mix: "",
    Type_of_Loan: "",
    Annual_Income: "",
    Changed_Credit_Limit: "",
    Outstanding_Debt: "",
    Credit_Utilization_Ratio: "",
    Credit_History_Age: "",
    Total_EMI_per_month: "",
    Amount_invested_monthly: "",
    Monthly_Balance: "",
  });

  const [creditScore, setCreditScore] = useState(null);

<<<<<<< HEAD
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await predictCreditScore(formData, token);
      setCreditScore(response.data.prediction);
    } catch (error) {
      console.error("Prediction error:", error.response?.data || error.message);
=======
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files[0]
    }));
  };

  const calculateCreditScore = () => {
    const income = parseFloat(formData.annualIncome) || 0;
    const expenses = parseFloat(formData.totalExpenses) || 0;
    const debts = parseFloat(formData.existingDebts) || 0;

    if (!formData.annualIncome || !formData.totalExpenses || !formData.existingDebts) {
      setCreditScore(null);
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
>>>>>>> eb41cbb341557fe29b48e0b58365b54aaeed268e
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="Occupation" placeholder="Occupation" onChange={handleChange} />
        <input type="text" name="Payment_of_Min_Amount" placeholder="Payment of Min Amount" onChange={handleChange} />
        <input type="text" name="Payment_Behaviour" placeholder="Payment Behaviour" onChange={handleChange} />
        <input type="text" name="Credit_Mix" placeholder="Credit Mix" onChange={handleChange} />
        <input type="text" name="Type_of_Loan" placeholder="Type of Loan" onChange={handleChange} />
        <input type="number" name="Annual_Income" placeholder="Annual Income" onChange={handleChange} />
        <input type="number" name="Changed_Credit_Limit" placeholder="Changed Credit Limit" onChange={handleChange} />
        <input type="number" name="Outstanding_Debt" placeholder="Outstanding Debt" onChange={handleChange} />
        <input type="number" name="Credit_Utilization_Ratio" placeholder="Credit Utilization Ratio" onChange={handleChange} />
        <input type="number" name="Credit_History_Age" placeholder="Credit History Age" onChange={handleChange} />
        <input type="number" name="Total_EMI_per_month" placeholder="Total EMI per month" onChange={handleChange} />
        <input type="number" name="Amount_invested_monthly" placeholder="Amount Invested Monthly" onChange={handleChange} />
        <input type="number" name="Monthly_Balance" placeholder="Monthly Balance" onChange={handleChange} />
        <button type="submit">Check Credit Score</button>
      </form>

<<<<<<< HEAD
      {creditScore !== null && (
        <div>
          <h3>Predicted Credit Score: {creditScore}</h3>
        </div>
      )}
=======
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

        {creditScore !== null && (
          <div style={styles.scoreContainer}>
            <h3>Your Credit Score is:</h3>
            <p style={{ ...styles.creditScore, color: scoreColor }}>{creditScore}</p>
            <p style={styles.eligibilityText}>{eligibilityText}</p>
          </div>
        )}
      </div>
>>>>>>> eb41cbb341557fe29b48e0b58365b54aaeed268e
    </div>
  );
};

<<<<<<< HEAD
=======
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
    justifyContent: 'space-between',
    cursor: 'pointer',
    transition: 'opacity 0.3s ease',
  },
  buttonText: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '18px',
    fontWeight: '600',
    color: '#000000',
  },
  buttonIcon: {
    width: '20px',
    height: '20px',
  },
  scoreContainer: {
    marginTop: '30px',
    textAlign: 'center',
  },
  creditScore: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '48px',
    fontWeight: '700',
    marginTop: '10px',
  },
  eligibilityText: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '18px',
    fontWeight: '400',
    color: '#000000',
    marginTop: '10px',
  },
};

>>>>>>> eb41cbb341557fe29b48e0b58365b54aaeed268e
export default CreditScoreForm;

