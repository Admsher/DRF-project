from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OTPViewSet

router = DefaultRouter()
router.register(r'otp', OTPViewSet, basename='otp')

urlpatterns = [
    path('', include(router.urls)),
]