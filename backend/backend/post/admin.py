from django.contrib import admin
from .models import QuestionAnswer,UploadedImage

# Register your models here.
admin.site.register(QuestionAnswer)
admin.site.register(UploadedImage)