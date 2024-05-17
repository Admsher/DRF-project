from rest_framework import serializers
from .models import Post
from rest_framework import serializers

class PDFUploadSerializer(serializers.Serializer):
    pdf_file = serializers.FileField()
    # value=True
    def validate_pdf_file(self, value):
        if value.content_type != 'application/pdf':
            raise serializers.ValidationError("Only PDF files are allowed.")
        return value

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'