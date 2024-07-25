import random
import time
from django.contrib.auth.models import User
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.core.mail import send_mail
from .serializers import ForgotPasswordSerializer, OTPVerificationSerializer, ResetPasswordSerializer
from credential.models import CustomUser

# In-memory storage for OTPs (for demonstration)
otp_storage = {}

def generate_otp():
    return random.randint(100000, 999999)

def send_otp(email, otp):
    subject = 'Your OTP Code'
    message = f'Your OTP code is {otp}. It is valid for 10 minutes.'
    send_mail(subject, message, 'from@example.com', [email])

class OTPViewSet(viewsets.ViewSet):

    @action(detail=False, methods=['post'], url_path='forgot-password')
    def forgot_password(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)
        if serializer.is_valid():
            self.email = serializer.validated_data['email']
            print(self.email)
            try:
                user = CustomUser.objects.get(email=self.email)
                otp = generate_otp()
                otp_storage[self.email] = {'otp': otp, 'expiry': time.time() + 600}  # 10 minutes validity
                
                send_otp(self.email, otp)
                return Response({'message': 'OTP sent to your email.'}, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({'error': 'No user found with this email.'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='verify-otp')
    def verify_otp(self, request):
        
        serializer = OTPVerificationSerializer(data=request.data)
        # print(serializer.is_valid())
        if serializer.is_valid():
            # print(request.data)
            
            email = serializer.validated_data['email']
            entered_otp = serializer.validated_data['otp']
            print(otp_storage)
            print(email)
            stored_otp_data = otp_storage[email]
            if stored_otp_data and time.time() < stored_otp_data['expiry']:
                if int(entered_otp) == stored_otp_data['otp']:
                    return Response({'message': 'OTP verified. You can now reset your password.'}, status=status.HTTP_200_OK)
                else:
                    return Response({'error': 'Invalid OTP.'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'error': 'OTP expired or invalid.'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='reset-password')
    def reset_password(self, request):
        serializer = ResetPasswordSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            try:
                user = CustomUser.objects.get(email=email)
                user.set_password(password)
                user.save()
                return Response({'message': 'Password reset successfully.'}, status=status.HTTP_200_OK)
            except CustomUser.DoesNotExist:
                return Response({'error': 'No user found with this email.'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)