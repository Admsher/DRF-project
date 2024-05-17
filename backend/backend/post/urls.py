from django.urls import path
from . import views

urlpatterns = [
    path('posts/', views.PostView.as_view(), name= 'posts_list'),
    path('pdfupload/',views.PDFUploadView.as_view(),name='pdfupload')
]