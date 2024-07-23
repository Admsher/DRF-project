from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.db import IntegrityError
from .models import CustomUser
from .serializers import UserSerializer
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from .serializers import LoginSerializer
from rest_framework import request
from .models import CustomUser
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework.viewsets import ViewSet

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        



class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        try:
            self.perform_destroy(instance)
        except IntegrityError:
            return Response({'error': 'Cannot delete user with related records'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)  # Use partial=True to allow partial updates
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
    def retrieve(self, request, *args, **kwargs):
        """
        Retrieve a user instance.
        """
        print("retreiving")
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_by_token(request):
    try:
        user_id = request.user.id
        user = CustomUser.objects.get(id=user_id)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    except CustomUser.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


class LoginViewSet(ViewSet):
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    def create(self, request):
        # Ensure request.data is a dictionary
        if isinstance(request.data, str):
            import json
            try:
                request.data = json.loads(request.data)
            except json.JSONDecodeError:
                return Response({"error": "Invalid JSON format"}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = self.serializer_class(data=request.data)

        # for key, values in serializer.errors.items():
        #     error = [value[:] for value in values]
        #     print(error)
        if serializer.is_valid():
            print("valid")
            user = serializer.validated_data
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class VerifyPasswordViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def create(self, request):
        password = request.data.get('password')
        if not password:
            return Response({'error': 'Password is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = authenticate(request=request, password=password)
        if user and user.is_authenticated:
            return Response({'status': 'Password verified'}, status=status.HTTP_200_OK)
        return Response({'error': 'Incorrect password.'}, status=status.HTTP_400_BAD_REQUEST)
    

class UpdateProfileViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CustomUser.objects.filter(id=self.request.user.id)

    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)


class UploadProfilePictureViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        user = request.user
        profile_picture = request.FILES.get('profile_picture')
        if not profile_picture:
            return Response({'error': 'No file provided.'}, status=status.HTTP_400_BAD_REQUEST)

        user.profile_picture = profile_picture
        user.save()
        return Response({'status': 'Profile picture uploaded'}, status=status.HTTP_200_OK)

