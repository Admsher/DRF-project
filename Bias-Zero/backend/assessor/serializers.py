from rest_framework import serializers
from .models import QuestionAnswer, Post, UploadedImage,PDFFile

class QuestionAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionAnswer
        fields = ['id', 'question', 'answer']



class PDFUploadSerializer(serializers.Serializer):
    pdf_file = serializers.FileField()

    def validate_pdf_file(self, value):
        if value.content_type not in ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']:
            raise serializers.ValidationError('Upload pdf or docx format files only.')
        return value

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

class ImageUploadSerializer(serializers.Serializer):
    image1 = serializers.ImageField()
    image2 = serializers.ImageField()


class UploadedImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadedImage
        fields = ['image', 'uploaded_at']