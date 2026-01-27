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


def get_hanko_django_user(request, auto_map=True, auto_create=False):
    """
    Get the Django user for a Hanko-authenticated request.

    If auto_map is True and no mapping exists, will try to find an existing
    Django user by email and create the mapping automatically.

    If auto_create is True and no existing Django user is found, will create
    a new Django user and mapping.

    Returns:
        User instance if found/created, None otherwise
    """
    if not hasattr(request, 'hotosm') or not request.hotosm.user:
        return None

    hanko_user = request.hotosm.user

    try:
        from hotosm_auth_django import get_mapped_user_id, create_user_mapping

        # First, check if mapping already exists
        mapped_user_id = get_mapped_user_id(hanko_user, app_name="umap")
        if mapped_user_id:
            try:
                return User.objects.get(id=int(mapped_user_id))
            except User.DoesNotExist:
                pass

        # No mapping exists - try to find existing Django user by email
        if auto_map and hanko_user.email:
            try:
                existing_user = User.objects.get(email=hanko_user.email)
                # Found user by email - create mapping automatically
                create_user_mapping(
                    hanko_user_id=hanko_user.id,
                    app_user_id=str(existing_user.id),
                    app_name="umap",
                )
                return existing_user
            except User.DoesNotExist:
                pass

            # Try by username (email prefix)
            try:
                email_username = hanko_user.email.split('@')[0]
                existing_user = User.objects.get(username__iexact=email_username)
                # Found user by username - create mapping automatically
                create_user_mapping(
                    hanko_user_id=hanko_user.id,
                    app_user_id=str(existing_user.id),
                    app_name="umap",
                )
                return existing_user
            except User.DoesNotExist:
                pass

        # No existing user found - create new Django user
        if auto_create and hanko_user.email:
            # Generate username from email
            base_username = hanko_user.email.split('@')[0]
            username = base_username
            counter = 1
            while User.objects.filter(username=username).exists():
                username = f"{base_username}{counter}"
                counter += 1

            # Create new Django user
            new_user = User.objects.create_user(
                username=username,
                email=hanko_user.email,
            )

            # Create mapping
            create_user_mapping(
                hanko_user_id=hanko_user.id,
                app_user_id=str(new_user.id),
                app_name="umap",
            )

            return new_user

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
    """
    from django import forms

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

    # Hanko-only users (no Django user) cannot access profile page
    # Redirect them to the dashboard
    if hanko_user and not user:
        return HttpResponseRedirect(reverse('user_dashboard'))

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
        'hanko_user': hanko_user,
        'form': form,
        'providers': providers,
    }

    return render(request, "auth/user_form.html", context)
