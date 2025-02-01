from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .serializers import RegisterSerializer, LoginSerializer, UserDetailsSerializer
from .models import UserDetails

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            # Fetch user details
            user_details = UserDetails.objects.get(user=user)
            user_details_serializer = UserDetailsSerializer(user_details)

            return Response({
                'message': 'User registered successfully!',
                'user_id': user.id,
                'username': user.username,
                'access_token': access_token,
                'refresh_token': refresh_token,
                'user_details': user_details_serializer.data  # Include user details
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            
            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            # Try to fetch user details; handle if missing
            try:
                user_details = UserDetails.objects.get(user=user)
                user_details_serializer = UserDetailsSerializer(user_details)
                user_details_data = user_details_serializer.data
            except UserDetails.DoesNotExist:
                user_details_data = None  # Set to None if no details exist

            return Response({
                'message': 'Login successful!',
                'user_id': user.id,
                'username': user.username,
                'access_token': access_token,
                'refresh_token': refresh_token,
                'user_details': user_details_data  # Return None if missing
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
