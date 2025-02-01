from django.urls import path
from .views import *

urlpatterns = [
    path('<int:business_id>/income-trend/', IncomeTrendView.as_view(), name='income-trend'),
    path('<int:business_id>/business-health/', BusinessHealthView.as_view(), name='business-health'),
    path('<int:business_id>/calculate-credit-score/', CalculateCreditScoreView.as_view(), name='calculate-credit-score'),
]
