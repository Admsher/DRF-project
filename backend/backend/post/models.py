
from django.db import models

class QuestionAnswer(models.Model):
    question = models.TextField()
    answer = models.TextField()
    
    def __str__(self):
        return self.question

class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    file = models.FileField(upload_to='post_images')

    def __str__(self):
        return self.title
    


class UploadedImage(models.Model):
    image = models.ImageField(upload_to='images/',blank=True, null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)