from django.db import models

class BusinessInfo(models.Model):
    name = models.CharField(max_length=255)
    address = models.TextField()
    industry_name = models.CharField(max_length=100)
    registration_date = models.DateTimeField(auto_now_add=True)
    contact_email = models.EmailField(unique=True)

    def __str__(self):
        return self.name

class IncomeExpense(models.Model):
    business = models.ForeignKey(BusinessInfo, on_delete=models.CASCADE, related_name="financial_records")
    year = models.IntegerField()
    income = models.DecimalField(max_digits=15, decimal_places=2)
    expenditure = models.DecimalField(max_digits=15, decimal_places=2)
    tax_paid = models.DecimalField(max_digits=15, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)  # ✅ Auto timestamp

    def __str__(self):
        return f"Financial Record {self.year} - {self.business.name}"

class ExternalData(models.Model):
    business = models.ForeignKey(BusinessInfo, on_delete=models.CASCADE, related_name="external_data")
    total_loans = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    total_assets = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    liabilities = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    credit_score = models.IntegerField(null=True, blank=True)
    document_processed_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"External Data for {self.business.name}"

class BusinessDocument(models.Model):
    business = models.ForeignKey(BusinessInfo, on_delete=models.CASCADE, related_name="documents")
    document = models.FileField(upload_to="business_documents/")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Document for {self.business.name} ({self.document.name})"