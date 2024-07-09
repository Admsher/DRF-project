from django.urls import path
from .views import contact_form_submission_list

urlpatterns = [
    path('contact/', contact_form_submission_list, name='contact_form_submission_list'),
]
