import json
from django.contrib import admin
from django.utils.safestring import mark_safe
from django.db.models import Sum
from api.models import BusinessInfo, IncomeExpense, ExternalData

# Unregister BusinessInfo if already registered
try:
    admin.site.unregister(BusinessInfo)
except admin.sites.NotRegistered:
    pass  # Do nothing if it's not registered

class BusinessAdmin(admin.ModelAdmin):
    list_display = ("name", "credit_score", "total_income")  
    readonly_fields = ("display_credit_score_chart", "display_income_trend_chart", "display_business_health_chart")

    class Media:
        js = ["https://cdn.jsdelivr.net/npm/chart.js"]

    def credit_score(self, obj):
        external_data = ExternalData.objects.filter(business=obj).first()
        return external_data.credit_score if external_data else "No Data"

    def total_income(self, obj):
        total_income = IncomeExpense.objects.filter(business=obj).aggregate(Sum("income"))["income__sum"]
        return total_income or 0

    # Readonly fields displaying charts
    def display_credit_score_chart(self, obj):
        return self.credit_score_chart(obj)

    def display_income_trend_chart(self, obj):
        return self.income_trend_chart(obj)

    def display_business_health_chart(self, obj):
        return self.business_health_chart(obj)

    # Credit Score Chart
    def credit_score_chart(self, obj):
        external_data = ExternalData.objects.filter(business=obj).first()
        if not external_data:
            return "No Data"

        return mark_safe(f"""
            <div style="width:100%; max-width:250px; height:250px;">
                <canvas id="creditChart-{obj.id}"></canvas>
            </div>
            <script>
                document.addEventListener("DOMContentLoaded", function() {{
                    var ctx = document.getElementById('creditChart-{obj.id}').getContext('2d');
                    new Chart(ctx, {{
                        type: 'doughnut',
                        data: {json.dumps({
                            "labels": ["Credit Score", "Remaining"],
                            "datasets": [{
                                "data": [float(external_data.credit_score), float(850 - external_data.credit_score)],
                                "backgroundColor": ["#4CAF50", "#ddd"]
                            }]
                        }, default=float)},
                        options: {{
                            cutout: '70%',
                            responsive: true,
                            maintainAspectRatio: false
                        }}
                    }});
                }});    
            </script>
        """)

    # Income Trend Chart
    def income_trend_chart(self, obj):
        income_data = (
            IncomeExpense.objects.filter(business=obj)
            .values("year")
            .annotate(total_income=Sum("income"))
            .order_by("year")
        )
        if not income_data:
            return "No Data"

        years = json.dumps([entry["year"] for entry in income_data])  
        incomes = json.dumps([float(entry["total_income"]) for entry in income_data], default=float)

        return mark_safe(f"""
            <div style="width:100%; max-width:500px; height:300px;">
                <canvas id="incomeChart-{obj.id}"></canvas>
            </div>
            <script>
                document.addEventListener("DOMContentLoaded", function() {{
                    var ctx = document.getElementById('incomeChart-{obj.id}').getContext('2d');
                    new Chart(ctx, {{
                        type: 'line',
                        data: {{"labels": {years}, "datasets": [{{
                            "label": "Income",
                            "data": {incomes},
                            "backgroundColor": "rgba(54, 162, 235, 0.2)",
                            "borderColor": "rgba(54, 162, 235, 1)",
                            "borderWidth": 2
                        }}]}},
                        options: {{
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {{
                                y: {{ beginAtZero: true }}
                            }}
                        }}
                    }});
                }});
            </script>
        """)

    # Business Health Chart
    def business_health_chart(self, obj):
        external_data = ExternalData.objects.filter(business=obj).first()
        financial_records = (
            IncomeExpense.objects.filter(business=obj)
            .values("year")
            .annotate(total_income=Sum("income"), total_expenditure=Sum("expenditure"), total_tax=Sum("tax_paid"))
            .order_by("-year")
        )
        if not financial_records or not external_data:
            return "No Data"

        latest_year = financial_records[0]
        prev_year = financial_records[1] if len(financial_records) > 1 else None

        revenue_growth = ((latest_year["total_income"] - prev_year["total_income"]) / prev_year["total_income"] * 100) if prev_year else 0
        profit_margin = ((latest_year["total_income"] - latest_year["total_expenditure"]) / latest_year["total_income"] * 100) if latest_year["total_income"] > 0 else 0
        debt_to_asset_ratio = (external_data.liabilities / external_data.total_assets) * 100 if external_data.total_assets > 0 else 0
        tax_compliance = (latest_year["total_tax"] / latest_year["total_income"]) * 100 if latest_year["total_income"] > 0 else 0
        loan_dependency = (external_data.total_loans / external_data.total_assets) * 100 if external_data.total_assets > 0 else 0

        data = {
            "labels": ["Revenue Growth", "Profit Margin", "Debt-to-Asset Ratio", "Tax Compliance", "Loan Dependency"],
            "datasets": [{
                "label": "Business Health Metrics",
                "data": [
                    float(revenue_growth), float(profit_margin), 
                    float(debt_to_asset_ratio), float(tax_compliance), 
                    float(loan_dependency)
                ],
                "backgroundColor": "rgba(255, 99, 132, 0.2)",
                "borderColor": "rgba(255, 99, 132, 1)",
                "borderWidth": 2
            }]
        }

        return mark_safe(f"""
            <div style="width:100%; max-width:500px; height:400px;">
                <canvas id="radarChart-{obj.id}"></canvas>
            </div>
            <script>
                document.addEventListener("DOMContentLoaded", function() {{
                    var ctx = document.getElementById('radarChart-{obj.id}').getContext('2d');
                    new Chart(ctx, {{
                        type: 'radar',
                        data: {json.dumps(data, default=float)},
                        options: {{
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {{
                                r: {{
                                    suggestedMin: 0,
                                    suggestedMax: 100,
                                    ticks: {{
                                        stepSize: 25,
                                        callback: function(value) {{
                                            return value + "%";
                                        }}
                                    }},
                                    grid: {{
                                        color: "rgba(0, 0, 0, 0.2)"
                                    }}
                                }}
                            }}
                        }}
                    }});
                }});
            </script>
        """)

admin.site.register(BusinessInfo, BusinessAdmin)  # ✅ Register only once
