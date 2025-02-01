import joblib
import os

# Define the path to the model and scaler
MODEL_PATH = os.path.join('api', 'models', 'loan_repayment_finder.pkl')
SCALER_PATH = os.path.join('api', 'models', 'lr_scaler.pkl')

# Load the model and scaler
def load_model():
    model = joblib.load(MODEL_PATH)
    return model

def load_scaler():
    scaler = joblib.load(SCALER_PATH)
    return scaler
