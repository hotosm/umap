# serializers.py
from rest_framework import serializers
from .models import UploadedFile

class FileUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadedFile
        fields = ['file', 'uploaded_at', 'data_layer']

    def validate(self, data):
            """
            Check that start is before finish.
            """
            if data['file'].name.startswith("__MACOSX"):
                raise serializers.ValidationError("Invalid system file")
            return data
