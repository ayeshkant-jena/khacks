import joblib
import os

# Define the path to the model and scaler
MODEL_PATH = os.path.join('api', 'models', 'loan_repayment_finder.pkl')
SCALER_PATH = os.path.join('api', 'models', 'lr_scaler.pkl')

CREDIT_SCORE_MODEL_PATH = os.path.join('api', 'models', 'predict_credit_score.pkl')

# Load the model and scaler
def load_loan_repayment_finder_model():
    model = joblib.load(MODEL_PATH)
    return model

def load_lr_scaler():
    scaler = joblib.load(SCALER_PATH)
    return scaler

def load_credit_score_model():
    model = joblib.load(CREDIT_SCORE_MODEL_PATH)
    return model
