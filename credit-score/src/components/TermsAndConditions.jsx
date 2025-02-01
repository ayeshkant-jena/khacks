import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TermsAndConditions() {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const handleAccept = () => {
    if (isChecked) {
      navigate("/register"); // Redirect to Registration Page
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Terms & Conditions</h2>
        <p className="text-gray-600 mb-4">
          Sure, I can help with that. Here's a more concise version of your Loan Agreement Terms & Conditions Policy:
        </p>
        <p className="text-gray-600 mb-4">
          <strong>1. Standard Terms And Conditions: Loan Facility</strong><br />
          The Borrower can apply for a loan by submitting the Application Form. The Lender may approve the loan subject to these terms and conditions ("Standard Terms") along with the Application Form, Drawdown Request, and MITC.
          Acceptance of the application does not obligate the Lender to approve the Loan.
        </p>
        <p className="text-gray-600 mb-4">
          <strong>2. Definitions:</strong><br />
          - <strong>Account:</strong> The bank account where the Loan disbursement is requested, as specified in the Application Form or Drawdown Request.<br />
          - <strong>Application Form:</strong> The loan application form submitted by the Borrower to the Lender, including all accompanying information.<br />
          - <strong>Availability Period:</strong> The period of one month from the date of sanction of the Facility (or extended period at the Lender's discretion).<br />
          - <strong>Drawdown Request:</strong> A request from the Borrower for disbursement of the Loan in a form acceptable to the Lender.<br />
          - <strong>Drawing Power:</strong> The threshold limit(s) set by the Lender, determining the amount that can be requested by the Borrower under the Facility.<br />
          - <strong>Due Date:</strong> The date(s) on which any payment becomes due as specified by the Lender.<br />
          - <strong>Increased Costs:</strong> Any additional or increased cost due to RBI regulations or other regulations, or reduction in the rate of return from the Loan.<br />
          - <strong>Loan:</strong> Each disbursement made under the Facility.<br />
          - <strong>Tax:</strong> Any tax, GST, levy, duty, or similar charge.<br />
          - <strong>Access Code(s):</strong> Any authentication mode specified by the Lender.<br />
          - <strong>Business Day:</strong> A day on which banks are open for general business in Bengaluru.<br />
          - <strong>Facility:</strong> The Loan applied by the Borrower, including a prospective Loan under a credit line.<br />
          - <strong>Credit Limit:</strong> The maximum drawdown limit granted by the Lender, available as revolving credit.<br />
          - <strong>Prepayment Charges:</strong> The amount paid by the Borrower for prepayment of an instalment/part prepayment of the Loan.<br />
        </p>
        <div className="mb-4">
          <input
            type="checkbox"
            id="agree"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            className="mr-2"
          />
          <label htmlFor="agree" className="text-gray-700">I agree to the Terms & Conditions</label>
        </div>
        <button
          onClick={handleAccept}
          disabled={!isChecked}
          className={`px-4 py-2 text-white rounded-md transition ${
            isChecked ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Proceed to Registration
        </button>
      </div>
    </div>
  );
}
