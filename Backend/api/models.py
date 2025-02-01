from django.db import models

class BusinessInfo(models.Model):
    name = models.CharField(max_length=255)
    address = models.TextField()
    industry_name = models.CharField(max_length=100)
    registration_date = models.DateTimeField(auto_now_add=True)
    contact_email = models.EmailField(unique=True)

    def __str__(self):
        return self.name
