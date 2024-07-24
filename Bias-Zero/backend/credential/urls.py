# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, LoginViewSet, VerifyPasswordViewSet, UpdateProfileViewSet, UploadProfilePictureViewSet, get_user_by_token

router = DefaultRouter()
router.register(r'user', UserViewSet, basename='user')
router.register(r'login', LoginViewSet, basename='login')
router.register(r'verify-password', VerifyPasswordViewSet, basename='verify_password')
router.register(r'profile', UpdateProfileViewSet, basename='profile')
router.register(r'profile-picture', UploadProfilePictureViewSet, basename='profile_picture')


urlpatterns = [
    path('', include(router.urls)),
    path('get-user-by-token/', get_user_by_token, name='get_user_by_token'),
   
]
