"""
Tests for Hanko authentication in uMap.

These tests verify the user mapping and onboarding flows.
"""

import pytest
from django.contrib.auth.models import User
from django.test import TestCase, RequestFactory
from unittest.mock import Mock, patch

from hotumap.hanko_helpers import (
    find_legacy_user_by_osm_id,
    create_umap_user,
    HankoUserFilterMixin,
)


class UserMappingTestCase(TestCase):
    """Test user mapping helper functions."""
    def setUp(self):
        """Create test users."""
        self.user1 = User.objects.create_user(
            username='testuser',
            email='test@example.com'
        )
        self.user2 = User.objects.create_user(
            username='osmuser',
            email='osm@example.com'
        )

    def test_find_legacy_user_by_osm_id(self):
        """Test finding legacy users by OSM ID via social_auth."""
        from social_django.models import UserSocialAuth

        # Create social auth entry for user1
        UserSocialAuth.objects.create(
            user=self.user1,
            provider='openstreetmap-oauth2',
            uid='12345'
        )

        # Should find existing user by OSM ID
        found = find_legacy_user_by_osm_id(12345)
        self.assertIsNotNone(found)
        self.assertEqual(found.id, self.user1.id)

        # Should return None for non-existent OSM ID
        not_found = find_legacy_user_by_osm_id(99999)
        self.assertIsNone(not_found)

    def test_create_umap_user(self):
        """Test creating new uMap users."""
        # Create new user
        new_user = create_umap_user(
            username='newuser',
            email='new@example.com'
        )
        self.assertIsNotNone(new_user)
        self.assertEqual(new_user.username, 'newuser')
        self.assertEqual(new_user.email, 'new@example.com')

    def test_create_umap_user_conflict_handling(self):
        """Test username conflict handling."""
        # Try to create user with existing username
        new_user = create_umap_user(
            username='testuser',  # Already exists
            email='another@example.com'
        )
        self.assertIsNotNone(new_user)
        # Should append suffix to avoid conflict
        self.assertTrue(new_user.username.startswith('testuser_'))

    def test_create_umap_user_multiple_conflicts(self):
        """Test multiple username conflicts."""
        # Create users with same base name
        user1 = create_umap_user('john', 'john1@example.com')
        user2 = create_umap_user('john', 'john2@example.com')
        user3 = create_umap_user('john', 'john3@example.com')

        # All should have different usernames
        usernames = {user1.username, user2.username, user3.username}
        self.assertEqual(len(usernames), 3)


class HankoUserFilterMixinTestCase(TestCase):
    """Test the HankoUserFilterMixin."""

    def setUp(self):
        """Create test data."""
        self.factory = RequestFactory()
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com'
        )

    @patch('hotosm_auth_django.get_mapped_user_id')
    def test_filter_by_hanko_user(self, mock_get_mapped_user_id):
        """Test filtering queryset by Hanko user."""
        # Mock the get_mapped_user_id function
        mock_get_mapped_user_id.return_value = str(self.user.id)

        # Create mock request with hotosm attribute
        request = self.factory.get('/')
        request.hotosm = Mock()
        request.hotosm.user = Mock(id='hanko-uuid-123', email='test@example.com')

        # Create a test viewset class
        class TestViewSet(HankoUserFilterMixin):
            def __init__(self, request):
                self.request = request

            def get_queryset(self):
                # Mock queryset
                return User.objects.all()

        viewset = TestViewSet(request)
        queryset = viewset.get_queryset()

        # Should call get_mapped_user_id
        mock_get_mapped_user_id.assert_called_once()


class OnboardingFlowTestCase(TestCase):
    """Test the onboarding flow views."""

    def setUp(self):
        """Set up test client and data."""
        self.factory = RequestFactory()

    @patch('django.conf.settings.AUTH_PROVIDER', 'hanko')
    @patch('hotosm_auth_django.create_user_mapping')
    def test_new_user_onboarding(self, mock_create_mapping):
        """Test new user onboarding flow."""
        from hotumap.views import OnboardingCallback

        # Create mock request
        request = self.factory.get('/?new_user=true')
        request.hotosm = Mock()
        request.hotosm.user = Mock(
            id='hanko-uuid-123',
            email='newuser@example.com'
        )

        # Call the view
        view = OnboardingCallback()
        response = view.get(request)

        # Should create user mapping
        mock_create_mapping.assert_called_once()
        
        # Should redirect
        self.assertEqual(response.status_code, 302)

    @patch('django.conf.settings.AUTH_PROVIDER', 'hanko')
    @patch('hotosm_auth_django.create_user_mapping')
    def test_legacy_user_onboarding_success(self, mock_create_mapping):
        """Test legacy user onboarding with existing user."""
        from hotumap.views import OnboardingCallback
        from social_django.models import UserSocialAuth

        # Create existing user with social auth (simulating OSM OAuth legacy)
        existing_user = User.objects.create_user(
            username='legacyuser',
            email='legacy@example.com'
        )
        # Create social auth entry linking OSM ID to user
        UserSocialAuth.objects.create(
            user=existing_user,
            provider='openstreetmap-oauth2',
            uid='12345'
        )

        # Create mock request with OSM connection
        request = self.factory.get('/')
        request.hotosm = Mock()
        request.hotosm.user = Mock(
            id='hanko-uuid-456',
            email='legacy@example.com'
        )
        request.hotosm.osm = Mock(
            osm_id=12345,
            osm_username='legacyuser'
        )

        # Call the view
        view = OnboardingCallback()
        response = view.get(request)

        # Should create mapping for existing user
        mock_create_mapping.assert_called_once_with(
            hanko_user_id='hanko-uuid-456',
            app_user_id=str(existing_user.id),
            app_name='umap'
        )

        # Should redirect
        self.assertEqual(response.status_code, 302)

    @patch('django.conf.settings.AUTH_PROVIDER', 'hanko')
    def test_legacy_user_onboarding_not_found(self):
        """Test legacy user onboarding when user doesn't exist."""
        from hotumap.views import OnboardingCallback

        # Create mock request with OSM connection (but no matching user in social_auth)
        request = self.factory.get('/')
        request.hotosm = Mock()
        request.hotosm.user = Mock(
            id='hanko-uuid-789',
            email='notfound@example.com'
        )
        request.hotosm.osm = Mock(
            osm_id=99999,
            osm_username='nonexistentuser'
        )

        # Call the view
        view = OnboardingCallback()
        response = view.get(request)

        # Should redirect back to login with error
        self.assertEqual(response.status_code, 302)
        self.assertIn('error', response.url)


class AuthStatusTestCase(TestCase):
    """Test the AuthStatus endpoint."""

    def setUp(self):
        """Set up test client."""
        self.factory = RequestFactory()

    @patch('django.conf.settings.AUTH_PROVIDER', 'hanko')
    @patch('hotosm_auth_django.get_mapped_user_id')
    def test_authenticated_user_with_mapping(self, mock_get_mapped_user_id):
        """Test auth status for authenticated user with valid mapping."""
        from hotumap.views import AuthStatus

        # Create test user
        user = User.objects.create_user(
            username='testuser',
            email='test@example.com'
        )

        # Mock the mapping
        mock_get_mapped_user_id.return_value = str(user.id)

        # Create mock request
        request = self.factory.get('/')
        request.hotosm = Mock()
        request.hotosm.user = Mock(
            id='hanko-uuid-123',
            email='test@example.com'
        )

        # Call the view
        view = AuthStatus()
        response = view.get(request)

        # Check response
        self.assertEqual(response.status_code, 200)
        data = response.data
        self.assertEqual(data['auth_provider'], 'hanko')
        self.assertTrue(data['authenticated'])
        self.assertFalse(data['needs_onboarding'])
        self.assertEqual(data['user']['username'], 'testuser')

    @patch('django.conf.settings.AUTH_PROVIDER', 'hanko')
    @patch('hotosm_auth_django.get_mapped_user_id')
    def test_authenticated_user_needs_onboarding(self, mock_get_mapped_user_id):
        """Test auth status for user without mapping."""
        from hotumap.views import AuthStatus

        # Mock no mapping
        mock_get_mapped_user_id.return_value = None

        # Create mock request
        request = self.factory.get('/')
        request.hotosm = Mock()
        request.hotosm.user = Mock(
            id='hanko-uuid-456',
            email='new@example.com'
        )

        # Call the view
        view = AuthStatus()
        response = view.get(request)

        # Check response
        self.assertEqual(response.status_code, 200)
        data = response.data
        self.assertEqual(data['auth_provider'], 'hanko')
        self.assertFalse(data['authenticated'])
        self.assertTrue(data['needs_onboarding'])
        self.assertTrue(data['hanko_authenticated'])


if __name__ == '__main__':
    pytest.main([__file__])
