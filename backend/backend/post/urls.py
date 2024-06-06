from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('save-qa/', views.QuestionAnswerAPIView.as_view()),
    # path('posts/', views.QNAUploadView.as_view(), name= 'QNAUploadView'),
    path('',views.home,name='home'),
    path('imageupload',views.imageupload,name='imageupload'),
    path('faceresult/', views.FaceResultView.as_view(), name='face-result'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
