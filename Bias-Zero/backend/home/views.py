from rest_framework import viewsets
from .models import ContactFormSubmission
from .serializers import ContactFormSubmissionSerializer
from rest_framework import permissions
class ContactFormSubmissionViewSet(viewsets.ModelViewSet):
    queryset = ContactFormSubmission.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = ContactFormSubmissionSerializer