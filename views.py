# Custom views

from django.shortcuts import render

def upload_view(request):
    return render(request, 'upload.html')

