from django.db import models

class ContactFormSubmission(models.Model):
    email = models.EmailField()
    mobile = models.CharField(max_length=15)
    select_time = models.CharField(max_length=10)
    selected_day = models.DateField()

    def __str__(self):
        return f"{self.email} - {self.selected_day}"
