from rest_framework import serializers
from .models import ContactFormSubmission

class ContactFormSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactFormSubmission
        fields = '__all__'
        # Add other fields as needed
