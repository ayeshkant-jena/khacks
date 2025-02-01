from django.contrib import admin
from .models import BusinessInfo, IncomeExpense, ExternalData, BusinessDocument

# ✅ Customize Admin Display
@admin.register(BusinessInfo)
class BusinessInfoAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'industry_name', 'contact_email', 'registration_date')
    search_fields = ('name', 'industry_name', 'contact_email')
    list_filter = ('registration_date', 'industry_name')

@admin.register(IncomeExpense)
class IncomeExpenseAdmin(admin.ModelAdmin):
    list_display = ('business', 'year', 'income', 'expenditure', 'tax_paid', 'created_at')
    search_fields = ('business__name', 'year')
    list_filter = ('year',)

@admin.register(ExternalData)
class ExternalDataAdmin(admin.ModelAdmin):
    list_display = ('business', 'total_loans', 'total_assets', 'liabilities', 'credit_score', 'document_processed_date')
    search_fields = ('business__name',)

@admin.register(BusinessDocument)
class BusinessDocumentAdmin(admin.ModelAdmin):
    list_display = ('business', 'document', 'uploaded_at')
    search_fields = ('business__name',)
