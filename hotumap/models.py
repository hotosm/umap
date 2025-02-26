# models.py
from django.db import models
from umap.models import DataLayer

class UploadedFile(models.Model):
    file = models.FileField(upload_to='uploads/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    data_layer = models.ForeignKey(DataLayer, on_delete=models.CASCADE)

    def __str__(self):
        return self.file.name
