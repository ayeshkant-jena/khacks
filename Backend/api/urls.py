from django.urls import path
from .views import *

urlpatterns = [
    path('', home, name='home'),  # Add this line for the root URL
    path('predict/', PredictCreditScore.as_view(), name='predict_credit_score'),
    path('creditscore/', CreditScore.as_view(), name='credit_score'),
]
