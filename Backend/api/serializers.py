from rest_framework import serializers
from .models import *

class BusinessInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessInfo
        fields = '__all__'

    # Custom Validation for Contact Email
    def validate_contact_email(self, value):
        if not value.endswith('@gmail.com') and not value.endswith('@business.com'):
            raise serializers.ValidationError("Email must be from 'example.com' or 'business.com'.")
        return value

    # Custom Validation for Business Name (Min length)
    def validate_name(self, value):
        if len(value) < 3:
            raise serializers.ValidationError("Business name must be at least 3 characters long.")
        return value

    # Custom Validation for Address (Ensure it's not empty)
    def validate_address(self, value):
        if not value.strip():
            raise serializers.ValidationError("Address cannot be empty.")
        return value

    # Object-Level Validation (Ensures Contact Email is Unique)
    def validate(self, data):
        email = data.get("contact_email")
        if BusinessInfo.objects.filter(contact_email=email).exists():
            raise serializers.ValidationError({"contact_email": "A business with this email already exists."})
        return data

class ExternalDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExternalData
        fields = '__all__'

class BusinessDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessDocument
        fields = ['id', 'business', 'document', 'uploaded_at']

    def validate_document(self, value):
        """ 
        ✅ Validate uploaded file type (only CSV/PDF allowed).
        ✅ Ensure file size does not exceed 5MB.
        """
        allowed_types = ['application/pdf', 'text/csv']
        max_size = 5 * 1024 * 1024  # 5MB

        if value.content_type not in allowed_types:
            raise serializers.ValidationError("Only PDF or CSV files are allowed.")

        if value.size > max_size:
            raise serializers.ValidationError("File size must be less than 5MB.")

        return value