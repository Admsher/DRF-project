from django.urls import path,include
from . import views
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from .views import QuestionAnswerViewSet


router = DefaultRouter()
router.register(r'get-qa', QuestionAnswerViewSet, basename='get-qa')

urlpatterns = [
    path('', include(router.urls)),
    path('save-qa/', views.PDFFileViewSet.as_view()),
  
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
