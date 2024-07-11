from django.db import models

class ContactFormSubmission(models.Model):
    email = models.EmailField()
    mobile = models.IntegerField(max_length=15)
    select_time = models.CharField(max_length=100)
    selected_day = models.DateField()
    # Add other fields as needed
