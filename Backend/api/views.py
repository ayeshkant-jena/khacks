from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .utils import load_model, load_scaler
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
            model = load_model()
            scaler = load_scaler()

            # Scale the features properly
            features_scaled = scaler.transform(input_df)

            # Predict using the trained model
            prediction = model.predict(features_scaled)

            return Response({'prediction': int(prediction[0])}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': f'Prediction error: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
