from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]  # This ensures that the user must be logged in to access this view.

    def get(self, request):
    # Check the authenticated user
        print(request.user)  # This should print the user object if authenticated.
        return Response({"message": "You are authenticated!"}, status=status.HTTP_200_OK)

