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
from django.contrib.auth import authenticate ,login
from rest_framework.viewsets import ViewSet
from rest_framework.authentication import TokenAuthentication
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
import json
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        



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
        serializer = self.serializer_class(data=request.data)
        print(serializer.is_valid())
        
        if serializer.is_valid():
            print()
            # Extract the email and password from validated data
            
            email =request.data.get('email')
            password = request.data.get('password')

            # Authenticate the user
            user = authenticate(email=email, password=password)
            
            if user is not None:
                # Log in the user (sets the session)
                login(request, user)

                # Get or create a token for the user
                token, created = Token.objects.get_or_create(user=user)
                return Response({'token': token.key}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class VerifyPasswordViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    def create(self, request):
        email=request.data.get('email')
        password = request.data.get('password')
        print(password)
        if not password:
            return Response({'error': 'Password is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = authenticate(email=email,password=password)
        print("authenticated")
        if user and user.is_authenticated:
            
            return Response({'status': 'Password verified'}, status=status.HTTP_200_OK)
        return Response({'error': 'Incorrect password.'}, status=status.HTTP_400_BAD_REQUEST)
    



class UpdateProfileViewSet(viewsets.ViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        # Get the currently authenticated user
        user = request.user

        if not user:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

        # Use the serializer to update the user
        serializer = self.serializer_class(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# @api_view(["PUT"])
# @csrf_exempt
# @permission_classes([IsAuthenticated])
# def update_profile(request):
#     user = request.user
#     payload = json.loads(request.body)
    
#     try:
#         if not user:
#             return JsonResponse({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

#         # Use the serializer to update the user
#         serializer = UserSerializer(user, data=payload, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse({'user': serializer.data}, safe=False, status=status.HTTP_200_OK)
#         return JsonResponse({'errors': serializer.errors}, safe=False, status=status.HTTP_400_BAD_REQUEST)

#     except ObjectDoesNotExist as e:
#         return JsonResponse({'error': str(e)}, safe=False, status=status.HTTP_404_NOT_FOUND)
#     except Exception as e:
#         return JsonResponse({'error': f'Something terrible went wrong: {str(e)}'}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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

