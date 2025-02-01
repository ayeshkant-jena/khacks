from django.urls import path
from .views import PredictCreditScore, home

urlpatterns = [
    path('', home, name='home'),  # Add this line for the root URL
    path('predict/', PredictCreditScore.as_view(), name='predict_credit_score'),
]
