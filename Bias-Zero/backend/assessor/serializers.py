from rest_framework import serializers
from .models import QuestionAnswer, Post, UploadedImage,PDFFile

from rest_framework import serializers
from .models import PDFFile ,QuestionAnswer, Post

class PDFFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = PDFFile
        fields = '__all__'

class QuestionAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionAnswer
        fields = ['id', 'question', 'answer']


class MergedQuestionsSerializer(serializers.Serializer):
    question_id = serializers.CharField()
    question = serializers.CharField()
    answer = serializers.CharField()
    difficulty = serializers.CharField()
    
    
class PDFUploadSerializer(serializers.Serializer):
    pdf = serializers.FileField()
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

class URLUploadSerializer(serializers.Serializer):
    url = serializers.URLField()
    source = serializers.CharField(default='url')
    
class FileUploadSerializer(serializers.Serializer):
    pdf_file = serializers.FileField(required=False)
    url_file = serializers.URLField(required=False)
    source = serializers.CharField(required=True)

    def validate(self, data):
        if not data.get('pdf_file') and not data.get('url_file'):
            raise serializers.ValidationError('Either pdf_file or url_file is required.')
        return data