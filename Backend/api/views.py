from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .utils import *
import pandas as pd
from django.http import HttpResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

def home(request):
    return HttpResponse("Welcome to the Credit Score Prediction API!")

class PredictCreditScore(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            input_data = request.data

            # Ensure all required features exist
            feature_names = [
                'DisbursementGross', 'BalanceGross', 'Term', 'daysterm', 'NoEmp',
                'CreateJob', 'RetainedJob', 'NewExist', 'ApprovalFY', 'Recession', 'NAICS'
            ]
            
            # Handle categorical feature: Convert 'NewExist' to numeric
            if 'NewExist' in input_data:
                input_data['NewExist'] = 0 if input_data['NewExist'] == 'New' else 1

            # Convert input JSON to DataFrame with proper column names
            input_df = pd.DataFrame([input_data], columns=feature_names)

        except KeyError as e:
            return Response({'error': f'Missing feature: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': f'Error processing input data: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Load the model and scaler
            model = load_loan_repayment_finder_model()
            scaler = load_lr_scaler()

            # Scale the features properly
            features_scaled = scaler.transform(input_df)

            # Predict using the trained model
            prediction = model.predict(features_scaled)

            return Response({'prediction': int(prediction[0])}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': f'Prediction error: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CreditScore(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'message': 'This is the Credit Score endpoint!'}, status=status.HTTP_200_OK)
    
    def post(self, request):
        try:
            input_data = request.data

            input_features =  ['Occupation', 'Payment_of_Min_Amount', 'Payment_Behaviour', 'Credit_Mix','Type_of_Loan','Annual_Income', 'Changed_Credit_Limit', 'Outstanding_Debt',
                'Credit_Utilization_Ratio', 'Credit_History_Age', 'Total_EMI_per_month',
                'Amount_invested_monthly', 'Monthly_Balance']

            # Convert input JSON to DataFrame with proper column names
            input_df = pd.DataFrame([input_data], columns=input_features)

        except KeyError as e:
            return Response({'error': f'Missing feature: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': f'Error processing input data: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Load the model
            model = load_credit_score_model()

            # Predict using the trained model
            prediction = model.predict(input_df)

            # Enforce the valid range of 350-850 for the credit score
            prediction_value = int(prediction[0])

            return Response({'prediction': prediction_value}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': f'Prediction error: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
