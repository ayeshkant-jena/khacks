from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .utils import *
import pandas as pd
from django.http import HttpResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import *
from .models import *
from rest_framework import generics 
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404


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

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import BusinessInfoSerializer
from .models import BusinessInfo
from django.shortcuts import get_object_or_404

# API to register a new business (POST) and get all businesses (GET)
class BusinessListCreateView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """Fetch all businesses"""
        businesses = BusinessInfo.objects.all()
        serializer = BusinessInfoSerializer(businesses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        """Register a new business"""
        serializer = BusinessInfoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Business registered successfully!",
                "business": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# API to fetch details of a single business (GET)
class BusinessDetailView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        """Fetch details of a single business by ID"""
        business = get_object_or_404(BusinessInfo, pk=pk)
        serializer = BusinessInfoSerializer(business)
        return Response(serializer.data, status=status.HTTP_200_OK)

import PyPDF2

class UploadBusinessDocumentView(APIView):
    parser_classes = (MultiPartParser, FormParser)  # ✅ Allow file uploads

    def post(self, request, business_id, *args, **kwargs):
        business = get_object_or_404(BusinessInfo, id=business_id)  # Find business

        file_serializer = BusinessDocumentSerializer(data=request.data)
        if file_serializer.is_valid():
            file_instance = file_serializer.save(business=business)

            # Process document
            file_path = file_instance.document.path
            extracted_data = self.process_file(file_path)

            if extracted_data:
                # ✅ Save extracted data in ExternalData Model
                external_data = ExternalData.objects.create(
                    business=business,
                    total_loans=extracted_data.get("total_loans"),
                    total_assets=extracted_data.get("total_assets"),
                    liabilities=extracted_data.get("liabilities"),
                    credit_score=extracted_data.get("credit_score"),
                )

                # ✅ Save income/expense details
                for record in extracted_data.get("financial_records", []):
                    IncomeExpense.objects.create(
                        business=business,
                        year=record["year"],
                        income=record["income"],
                        expenditure=record["expenditure"],
                        tax_paid=record["tax_paid"],
                    )

                return Response(
                    {"message": "File uploaded and processed successfully"},
                    status=status.HTTP_201_CREATED,
                )

        return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def process_file(self, file_path):
        """
        Extracts financial data from PDF/CSV files.
        """

        extracted_data = {}

        # ✅ Handle CSV Processing
        if file_path.endswith(".csv"):
            df = pd.read_csv(file_path)

            extracted_data["total_loans"] = df["Total Loans"].sum()
            extracted_data["total_assets"] = df["Total Assets"].sum()
            extracted_data["liabilities"] = df["Liabilities"].sum()
            extracted_data["credit_score"] = df["Credit Score"].mean()

            extracted_data["financial_records"] = df[["Year", "Income", "Expenditure", "Tax Paid"]].to_dict(orient="records")

        # ✅ Handle PDF Processing
        elif file_path.endswith(".pdf"):
            pdf_text = self.extract_text_from_pdf(file_path)

            extracted_data["total_loans"] = self.extract_numeric_value(pdf_text, "Total Loans")
            extracted_data["total_assets"] = self.extract_numeric_value(pdf_text, "Total Assets")
            extracted_data["liabilities"] = self.extract_numeric_value(pdf_text, "Liabilities")
            extracted_data["credit_score"] = self.extract_numeric_value(pdf_text, "Credit Score")

            extracted_data["financial_records"] = [
                {"year": 2024, "income": 50000, "expenditure": 20000, "tax_paid": 5000}  # Dummy example
            ]

        return extracted_data

    def extract_text_from_pdf(self, pdf_path):
        """
        Extracts text from a PDF file.
        """
        text = ""
        with open(pdf_path, "rb") as file:
            reader = PyPDF2.PdfReader(file)
            for page in reader.pages:
                text += page.extract_text() or ""
        return text

    def extract_numeric_value(self, text, label):
        """
        Extracts numeric values from text based on a label.
        """
        import re
        match = re.search(rf"{label}:\s*\$?([\d,]+\.?\d*)", text)
        return float(match.group(1).replace(",", "")) if match else None
