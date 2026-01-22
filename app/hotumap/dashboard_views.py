"""
Custom views for uMap with Hanko SSO support.

These views extend or replace standard uMap views to support
Hanko authentication in addition to Django session auth.
"""

from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator
from django.db.models import QuerySet
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.views.generic import DetailView

from umap.models import Map
from umap.utils import is_ajax

from .decorators import hanko_or_login_required

User = get_user_model()


def get_hanko_django_user(request):
    """
    Get the Django user for a Hanko-authenticated request.

    Returns:
        User instance if found, None otherwise
    """
    if not hasattr(request, 'hotosm') or not request.hotosm.user:
        return None

    try:
        from hotosm_auth_django import get_mapped_user_id
        mapped_user_id = get_mapped_user_id(request.hotosm.user, app_name="umap")
        if mapped_user_id:
            return User.objects.get(id=int(mapped_user_id))
    except (ImportError, User.DoesNotExist, ValueError):
        pass

    return None


class PaginatorMixin:
    """Mixin for paginated views."""
    per_page = 5

    def paginate(self, qs, per_page=None):
        paginator = Paginator(qs, per_page or self.per_page)
        page = self.request.GET.get("p")
        try:
            qs = paginator.page(page)
        except PageNotAnInteger:
            qs = paginator.page(1)
        except EmptyPage:
            qs = paginator.page(paginator.num_pages)
        return qs


class SearchMixin:
    """Mixin for search functionality."""

    def get_search_queryset(self, qs):
        q = self.request.GET.get("q")
        if q:
            return qs.filter(name__icontains=q)
        return qs


import logging

logger = logging.getLogger(__name__)


@hanko_or_login_required
def user_dashboard(request):
    """
    User dashboard view that supports both Hanko and Django auth.

    This replaces the standard UserDashboard view when Hanko is enabled.
    """
    # Determine the user to show dashboard for
    user = None
    hanko_user = None
    needs_onboarding = False

    # Check Hanko authentication first
    if getattr(settings, 'AUTH_PROVIDER', 'legacy') == 'hanko':
        if hasattr(request, 'hotosm') and request.hotosm.user:
            hanko_user = request.hotosm.user
            user = get_hanko_django_user(request)
            if not user:
                # User is authenticated with Hanko but has no mapping
                needs_onboarding = True

    # Fall back to Django session auth
    if not user and request.user.is_authenticated:
        user = request.user

    # If no user and not Hanko authenticated, redirect to login
    if not user and not hanko_user:
        return HttpResponseRedirect(reverse('login'))

    # Get user's maps (empty if no mapping yet)
    if user:
        qs = Map.objects.filter(owner=user, is_template=False)
        q = request.GET.get("q")
        if q:
            qs = qs.filter(name__icontains=q)
        qs = qs.order_by("-modified_at")
    else:
        qs = Map.objects.none()
        q = None

    # Paginate
    per_page = getattr(settings, 'UMAP_MAPS_PER_PAGE_OWNER', 10)
    paginator = Paginator(qs, per_page)
    page = request.GET.get("p")
    try:
        maps = paginator.page(page)
    except PageNotAnInteger:
        maps = paginator.page(1)
    except EmptyPage:
        maps = paginator.page(paginator.num_pages)

    context = {
        'object': user,
        'user': user,
        'hanko_user': hanko_user,
        'needs_onboarding': needs_onboarding,
        'maps': maps,
        'q': q,
        'is_ajax': is_ajax(request),
    }

    if is_ajax(request):
        template = "umap/map_table.html"
    else:
        template = "umap/user_dashboard.html"

    return render(request, template, context)
