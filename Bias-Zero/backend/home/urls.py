from django.urls import path
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ContactFormSubmissionViewSet

router = DefaultRouter()
# router.register(r'register', UserViewSet, basename='user')
# router.register(r'login', LoginViewSet, basename='login')
router.register(r'contact', ContactFormSubmissionViewSet, basename='contact')
urlpatterns = [
    path('', include(router.urls)),
 
]

