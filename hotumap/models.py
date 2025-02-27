# models.py
from django.db import models
from umap.models import DataLayer, set_storage

class UploadedFile(models.Model):
    file = models.FileField(
        upload_to='media_uploads/', blank=True, null=True, storage=set_storage
    )
    uploaded_at = models.DateTimeField(auto_now_add=True)
    data_layer = models.ForeignKey(DataLayer, on_delete=models.CASCADE)

    def __str__(self):
        return self.file.name

    def delete(self, *args, **kwargs):
        if self.file:
            storage = self.file.storage
            if storage.exists(self.file.name):
                storage.delete(self.file.name)
        super().delete(*args, **kwargs)
