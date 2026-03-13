"""
Hanko views

For replacing existing authentication views, mainly by
checking session and redirecting
"""

from django.http import HttpResponseRedirect as redirect
from django.urls import reverse
from django.conf import settings
from urllib.parse import quote

"""
    Check if hanko session exists and redirect to the corresponding URL
"""
def login_view(request):
    if hasattr(request, 'hotosm') and request.hotosm.user:
        next_url = request.GET.get('next') or request.POST.get('next')
        if next_url:
            return redirect(next_url)
        else:
            return redirect(reverse('user_dashboard'))
    # User not authenticated - redirect to Hanko login page
    hanko_url = getattr(settings, 'HANKO_PUBLIC_URL', '') or getattr(settings, 'HANKO_API_URL', '')
    site_url = getattr(settings, 'SITE_URL', '/')
    # Extract language from URL path: /es/login/ -> es
    lang = request.path.strip('/').split('/')[0]
    return_to = quote(site_url, safe='')
    return redirect(f"{hanko_url}/app?return_to={return_to}&lang={lang}")
