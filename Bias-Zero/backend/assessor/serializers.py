from rest_framework import serializers
from .models import QuestionAnswer, Post, UploadedImage,PDFFile

class QuestionAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionAnswer
        fields = ['id', 'question', 'answer']


class PDFUploadSerializer(serializers.Serializer):
  class Meta:
        model = PDFFile
        fields = '__all__'

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