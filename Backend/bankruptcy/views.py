import joblib
import pandas as pd
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
import os

# Define the path to the trained model
MODEL_PATH = os.path.join('bankruptcy', 'trained_models', 'bankruptcy_model.pkl')

# Load the trained model
model = joblib.load(MODEL_PATH)

# List of features with meaningful names
FEATURES = [
    "Attr1", "Attr2", "Attr3", "Attr4", "Attr5", "Attr6", "Attr7", "Attr8", "Attr9", 
    "Attr10", "Attr11", "Attr12", "Attr13", "Attr14", "Attr15", "Attr16", "Attr17",
    "Attr18", "Attr19", "Attr20", "Attr21", "Attr22", "Attr23", "Attr24", "Attr25",
    "Attr26", "Attr27", "Attr28", "Attr29", "Attr30", "Attr31", "Attr32", "Attr33",
    "Attr34", "Attr35", "Attr36", "Attr37", "Attr38", "Attr39", "Attr40", "Attr41",
    "Attr42", "Attr43", "Attr44", "Attr45", "Attr46", "Attr47", "Attr48", "Attr49",
    "Attr50", "Attr51", "Attr52", "Attr53", "Attr54", "Attr55", "Attr56", "Attr57",
    "Attr58", "Attr59", "Attr60", "Attr61", "Attr62", "Attr63", "Attr64"
]

class PredictBankruptcy(APIView):
    def post(self, request):
        try:
            # Extract features from request body
            input_data = request.data

            # Check if all required features are present
            missing_features = [feature for feature in FEATURES if feature not in input_data]
            if missing_features:
                return Response({"error": f"Missing features: {missing_features}"}, status=status.HTTP_400_BAD_REQUEST)

            # Convert to DataFrame with correct feature order
            df = pd.DataFrame([[input_data[feature] for feature in FEATURES]], columns=FEATURES)

            # Predict bankruptcy
            prediction = model.predict(df)[0]
            result = "Bankrupt" if prediction == 1 else "Not Bankrupt"

            return Response({"prediction": result, "features_used": FEATURES})
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class GetFeatureList(APIView):
    def get(self, request):
        return Response({"features": FEATURES})
