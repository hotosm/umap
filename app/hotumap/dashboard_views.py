"""
Custom views for uMap with Hanko SSO support.

These views extend or replace standard uMap views to support
Hanko authentication in addition to Django session auth.
"""

from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth import views as auth_views
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

    Only returns a user if a mapping already exists. Does NOT auto-create
    mappings or users. The onboarding flow handles user/mapping creation.

    Returns:
        User instance if mapping exists, None otherwise
    """
    if not hasattr(request, 'hotosm') or not request.hotosm.user:
        return None

    hanko_user = request.hotosm.user

    try:
        from hotosm_auth_django import get_mapped_user_id

        # Check if mapping exists
        mapped_user_id = get_mapped_user_id(hanko_user, app_name="umap")
        if mapped_user_id:
            try:
                return User.objects.get(id=int(mapped_user_id))
            except User.DoesNotExist:
                pass

    except (ImportError, ValueError) as e:
        import logging
        logging.getLogger(__name__).error(f"Error in get_hanko_django_user: {e}")

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


@hanko_or_login_required
def user_teams(request):
    """
    User teams view that supports both Hanko and Django auth.
    """
    user = None
    hanko_user = None

    # Check Hanko authentication first
    if getattr(settings, 'AUTH_PROVIDER', 'legacy') == 'hanko':
        if hasattr(request, 'hotosm') and request.hotosm.user:
            hanko_user = request.hotosm.user
            user = get_hanko_django_user(request)

    # Fall back to Django session auth
    if not user and request.user.is_authenticated:
        user = request.user

    # Only redirect if no Hanko user AND no Django user
    if not user and not hanko_user:
        return HttpResponseRedirect(reverse('login'))

    # If Hanko user but no mapping, show empty teams
    teams = user.teams.all() if user else []

    context = {
        'object': user,
        'user': user,
        'hanko_user': hanko_user,
        'teams': teams,
    }

    return render(request, "umap/user_teams.html", context)


@hanko_or_login_required
def user_templates(request):
    """
    User templates view that supports both Hanko and Django auth.
    """
    user = None
    hanko_user = None

    # Check Hanko authentication first
    if getattr(settings, 'AUTH_PROVIDER', 'legacy') == 'hanko':
        if hasattr(request, 'hotosm') and request.hotosm.user:
            hanko_user = request.hotosm.user
            user = get_hanko_django_user(request)

    # Fall back to Django session auth
    if not user and request.user.is_authenticated:
        user = request.user

    # Only redirect if no Hanko user AND no Django user
    if not user and not hanko_user:
        return HttpResponseRedirect(reverse('login'))

    # Get user's templates (empty if no mapping yet)
    if user:
        qs = Map.objects.filter(owner=user, is_template=True)
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
        'maps': maps,
        'q': q,
        'is_ajax': is_ajax(request),
    }

    if is_ajax(request):
        template = "umap/map_table.html"
    else:
        template = "umap/user_templates.html"

    return render(request, template, context)


@hanko_or_login_required
def user_profile(request):
    """
    User profile view that supports both Hanko and Django auth.

    When Hanko auth is enabled, redirects to Hanko's profile page so users
    manage their email/username there. Changes are synced back via middleware.
    """
    from django import forms

    # If Hanko auth is enabled, redirect to Hanko profile page
    if getattr(settings, 'AUTH_PROVIDER', 'legacy') == 'hanko':
        from urllib.parse import quote
        hanko_public_url = getattr(settings, 'HANKO_PUBLIC_URL', '') or getattr(settings, 'HANKO_API_URL', '')
        site_url = getattr(settings, 'SITE_URL', '/')
        return_to = quote(site_url, safe='')
        return HttpResponseRedirect(f"{hanko_public_url}/app/profile?return_to={return_to}")

    user = None

    # Legacy Django session auth
    if request.user.is_authenticated:
        user = request.user

    if not user:
        return HttpResponseRedirect(reverse('login'))

    # Simple form for profile
    class UserProfileForm(forms.ModelForm):
        class Meta:
            model = User
            fields = ['username', 'first_name', 'last_name', 'email']

    form = None
    providers = []

    if user:
        if request.method == 'POST':
            form = UserProfileForm(request.POST, instance=user)
            if form.is_valid():
                form.save()
                return HttpResponseRedirect(reverse('user_profile'))
        else:
            form = UserProfileForm(instance=user)

        # Get social auth providers if available
        if hasattr(user, 'social_auth'):
            providers = list(user.social_auth.values_list('provider', flat=True))

    context = {
        'object': user,
        'user': user,
        'form': form,
        'providers': providers,
    }

    return render(request, "auth/user_form.html", context)


class HankoAwareLoginView(auth_views.LoginView):
    """
    Custom login view that checks for Hanko authentication.

    If user is authenticated with Hanko, redirect to 'next' URL directly
    without showing the legacy login form.
    """

    def dispatch(self, request, *args, **kwargs):
        # Check if Hanko auth is enabled and user is authenticated with Hanko
        if getattr(settings, 'AUTH_PROVIDER', 'legacy') == 'hanko':
            if hasattr(request, 'hotosm') and request.hotosm.user:
                # User is authenticated with Hanko - redirect to 'next' or dashboard
                next_url = request.GET.get('next') or request.POST.get('next')
                if next_url:
                    return HttpResponseRedirect(next_url)
                else:
                    # Default to user dashboard
                    return HttpResponseRedirect(reverse('user_dashboard'))
            else:
                # User not authenticated - redirect to Hanko login page
                from urllib.parse import quote
                hanko_url = getattr(settings, 'HANKO_PUBLIC_URL', '') or getattr(settings, 'HANKO_API_URL', '')
                site_url = getattr(settings, 'SITE_URL', '/')
                # Extract language from URL path: /es/login/ -> es
                lang = request.path.strip('/').split('/')[0]
                return_to = quote(site_url, safe='')
                return HttpResponseRedirect(f"{hanko_url}/app?return_to={return_to}&lang={lang}")

        # Fall through to normal login view (legacy auth)
        return super().dispatch(request, *args, **kwargs)
