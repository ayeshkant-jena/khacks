from django.contrib.auth.models import User
from django.db import models

class UserDetails(models.Model):
    ROLE_CHOICES = (
        ('lender', 'Lender'),
        ('borrower', 'Borrower'),
    )
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='details')
    name = models.CharField(max_length=255)  # New name field
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='borrower')
    business_name = models.CharField(max_length=255, blank=True, null=True)
    phone = models.CharField(max_length=15, unique=True, blank=True, null=True)

    def __str__(self):
        return f"{self.name} ({self.user.username}) - {self.role}"

