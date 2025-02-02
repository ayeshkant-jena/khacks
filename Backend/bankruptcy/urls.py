from django.urls import path
from .views import *

urlpatterns = [
    path("predict/", PredictBankruptcy.as_view(), name="predict_bankruptcy"),
]
