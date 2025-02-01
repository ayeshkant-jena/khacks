from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Sum
from api.models import *
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

class IncomeTrendView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, business_id):
        """
        Fetch yearly income trends to analyze increase or decrease in revenue.
        """
        business = BusinessInfo.objects.filter(id=business_id).first()
        if not business:
            return Response({"error": "Business not found"}, status=status.HTTP_404_NOT_FOUND)

        # ✅ Fetch yearly income data
        income_data = (
            IncomeExpense.objects.filter(business=business)
            .values("year")
            .annotate(total_income=Sum("income"))
            .order_by("year")
        )

        if not income_data:
            return Response({"message": "No financial data available"}, status=status.HTTP_404_NOT_FOUND)

        # ✅ Calculate income trend
        trend_data = []
        previous_income = None
        for data in income_data:
            year = data["year"]
            income = data["total_income"]
            trend = None  # Default: No comparison for first entry
            
            if previous_income is not None:
                trend = round(((income - previous_income) / previous_income) * 100, 2) if previous_income > 0 else None
            
            trend_data.append({"year": year, "income": income, "trend_percentage": trend})
            previous_income = income

        return Response(trend_data, status=status.HTTP_200_OK)


class BusinessHealthView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, business_id):
        """
        Fetch key business health metrics for radar chart visualization.
        """
        business = BusinessInfo.objects.filter(id=business_id).first()
        if not business:
            return Response({"error": "Business not found"}, status=status.HTTP_404_NOT_FOUND)

        # ✅ Get financial data
        financial_records = (
            IncomeExpense.objects.filter(business=business)
            .values("year")
            .annotate(total_income=Sum("income"), total_expenditure=Sum("expenditure"), total_tax=Sum("tax_paid"))
            .order_by("-year")
        )

        external_data = ExternalData.objects.filter(business=business).first()

        if not financial_records.exists() or not external_data:
            return Response({"message": "Not enough financial data"}, status=status.HTTP_404_NOT_FOUND)

        # ✅ Calculate Metrics
        latest_year = financial_records[0]
        prev_year = financial_records[1] if len(financial_records) > 1 else None

        revenue_growth = (
            ((latest_year["total_income"] - prev_year["total_income"]) / prev_year["total_income"] * 100)
            if prev_year else 0
        )

        profit_margin = (
            (latest_year["total_income"] - latest_year["total_expenditure"]) / latest_year["total_income"] * 100
            if latest_year["total_income"] > 0 else 0
        )

        debt_to_asset_ratio = (
            (external_data.liabilities / external_data.total_assets) * 100
            if external_data.total_assets > 0 else 0
        )

        tax_compliance = (
            (latest_year["total_tax"] / latest_year["total_income"]) * 100
            if latest_year["total_income"] > 0 else 0
        )

        loan_dependency = (
            (external_data.total_loans / external_data.total_assets) * 100
            if external_data.total_assets > 0 else 0
        )

        # ✅ Return Data for Radar Chart
        radar_data = {
            "labels": ["Revenue Growth", "Profit Margin", "Debt-to-Asset Ratio", "Tax Compliance", "Loan Dependency"],
            "values": [revenue_growth, profit_margin, debt_to_asset_ratio, tax_compliance, loan_dependency],
        }

        return Response(radar_data, status=status.HTTP_200_OK)


class CalculateCreditScoreView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, business_id):
        """
        Calculate and update the business credit score.
        """
        # ✅ Fetch the business
        business = get_object_or_404(BusinessInfo, id=business_id)

        # ✅ Get financial records (latest and previous year)
        financial_records = (
            IncomeExpense.objects.filter(business=business)
            .values("year")
            .annotate(
                total_income=Sum("income"),
                total_expenditure=Sum("expenditure"),
                total_tax=Sum("tax_paid"),
            )
            .order_by("-year")
        )

        # ✅ Get external financial data (Assets, Liabilities, Loans, etc.)
        external_data = ExternalData.objects.filter(business=business).first()
        if not financial_records.exists() or not external_data:
            return Response(
                {"message": "Not enough financial data"},
                status=status.HTTP_404_NOT_FOUND
            )

        # ✅ Extract latest and previous year records safely
        latest_year = financial_records[0]
        prev_year = financial_records[1] if len(financial_records) > 1 else None

        latest_income = float(latest_year["total_income"]) if latest_year["total_income"] else 0
        latest_expenditure = float(latest_year["total_expenditure"]) if latest_year["total_expenditure"] else 0
        latest_tax = float(latest_year["total_tax"]) if latest_year["total_tax"] else 0

        prev_income = float(prev_year["total_income"]) if prev_year and prev_year["total_income"] else 0
        total_assets = float(external_data.total_assets) if external_data.total_assets else 0
        liabilities = float(external_data.liabilities) if external_data.liabilities else 0
        total_loans = float(external_data.total_loans) if external_data.total_loans else 0

        # ✅ Calculate financial metrics
        revenue_stability = ((latest_income - prev_income) / prev_income * 100) if prev_income > 0 else 0
        profitability = ((latest_income - latest_expenditure) / latest_income * 100) if latest_income > 0 else 0
        debt_to_asset_ratio = (liabilities / total_assets * 100) if total_assets > 0 else 0
        tax_compliance = (latest_tax / latest_income * 100) if latest_income > 0 else 0
        loan_dependency = (total_loans / total_assets * 100) if total_assets > 0 else 0

        # ✅ Normalize values (convert percentages to fractions)
        revenue_stability = min(max(revenue_stability / 100, 0), 1)
        profitability = min(max(profitability / 100, 0), 1)
        debt_to_asset_ratio = min(max(debt_to_asset_ratio / 100, 0), 1)
        tax_compliance = min(max(tax_compliance / 100, 0), 1)
        loan_dependency = min(max(loan_dependency / 100, 0), 1)

        # ✅ Calculate Credit Score (out of 850)
        credit_score = 850 * (
            (0.2 * revenue_stability) +
            (0.25 * profitability) +
            (0.2 * (1 - debt_to_asset_ratio)) +
            (0.15 * (1 - loan_dependency)) +
            (0.2 * tax_compliance)
        )
        credit_score = round(credit_score)  # Round to nearest integer

        # ✅ Update the ExternalData Table
        external_data.credit_score = credit_score
        external_data.save()

        return Response(
            {"business_id": business_id, "credit_score": credit_score},
            status=status.HTTP_200_OK
        )
