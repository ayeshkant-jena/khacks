from django.urls import path
from .views import *

urlpatterns = [
    path('', home, name='home'),  # Root URL
    path('predict/', PredictCreditScore.as_view(), name='predict_credit_score'),
    path('creditscore/', CreditScore.as_view(), name='credit_score'),
    
    # ✅ FIXED: Removed "api/" prefix
    path('business/', BusinessListCreateView.as_view(), name='business-list-create'),
    path('business/<int:pk>/', BusinessDetailView.as_view(), name='business-detail'),
]
