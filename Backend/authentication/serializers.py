from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserDetails

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class UserDetailsSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = UserDetails
        fields = ['user', 'name', 'role', 'business_name', 'phone']

class RegisterSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=255)
    role = serializers.ChoiceField(choices=UserDetails.ROLE_CHOICES)
    business_name = serializers.CharField(max_length=255, required=False, allow_blank=True)
    phone = serializers.CharField(max_length=15)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'name', 'role', 'business_name', 'phone']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        name = validated_data.pop('name')
        role = validated_data.pop('role')
        business_name = validated_data.pop('business_name', '')
        phone = validated_data.pop('phone')

        # Create User
        user = User.objects.create_user(**validated_data)

        # Create UserDetails linked to user
        UserDetails.objects.create(
            user=user, name=name, role=role, business_name=business_name, phone=phone
        )

        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    
    def validate(self, data):
        from django.contrib.auth import authenticate

        user = authenticate(username=data["username"], password=data["password"])
        if user:
            return {"user": user}
        raise serializers.ValidationError("Invalid credentials")
