from unittest.mock import Mock, patch

from django.contrib.auth.models import AnonymousUser
from django.test import override_settings

from hotumap.views import AuthStatus, OSMCallback, OSMLogin, OnboardingCallback

from .base import BaseAuthTestCase


class OSMLoginViewTest(BaseAuthTestCase):
    def test_returns_login_url(self):
        request = self.factory.get("/")
        request.user = AnonymousUser()

        view = OSMLogin()
        view.format_kwarg = None
        view.request = request
        response = view.get(request)

        self.assertEqual(response.status_code, 200)
        self.assertIn("login_url", response.data)

    def test_login_url_is_absolute(self):
        request = self.factory.get("/")
        request.user = AnonymousUser()

        view = OSMLogin()
        view.format_kwarg = None
        view.request = request
        response = view.get(request)

        self.assertTrue(response.data["login_url"].startswith("http"))


class OSMCallbackViewTest(BaseAuthTestCase):
    def _get(self, user=None):
        request = self.factory.get("/")
        request.user = user or AnonymousUser()
        view = OSMCallback()
        view.format_kwarg = None
        view.request = request
        return view.get(request)

    def test_returns_authenticated_true_when_user_logged_in(self):
        response = self._get(user=self.user)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.data["authenticated"])

    def test_returns_401_when_not_authenticated(self):
        response = self._get()
        self.assertEqual(response.status_code, 401)
        self.assertFalse(response.data["authenticated"])


class OnboardingCallbackRequiresHankoTest(BaseAuthTestCase):
    @override_settings(AUTH_PROVIDER="legacy")
    def test_returns_400_when_not_hanko_mode(self):
        request = self.make_hanko_request()
        view = OnboardingCallback()
        response = view.get(request)
        self.assertEqual(response.status_code, 400)

    def test_returns_401_when_no_hanko_session(self):
        request = self.make_unauthenticated_request()

        with override_settings(AUTH_PROVIDER="hanko"):
            view = OnboardingCallback()
            response = view.get(request)

        self.assertEqual(response.status_code, 401)


class OnboardingCallbackNewUserTest(BaseAuthTestCase):
    @override_settings(AUTH_PROVIDER="hanko", SITE_URL="http://testserver/")
    @patch("hotumap.views._upsert_user_mapping")
    @patch("hotosm_auth_django.get_mapped_user_id", return_value=None)
    def test_creates_user_and_redirects(self, _mock_mapped, mock_upsert):
        request = self.factory.get("/?new_user=true")
        request.hotosm = Mock()
        request.hotosm.user = Mock(id="hanko-new-1", email="new@example.com")
        request.hotosm.osm = None

        response = OnboardingCallback().get(request)

        self.assertEqual(response.status_code, 302)
        mock_upsert.assert_called_once()

    @override_settings(AUTH_PROVIDER="hanko", SITE_URL="http://testserver/")
    @patch("hotumap.views._upsert_user_mapping")
    @patch("hotosm_auth_django.get_mapped_user_id", return_value=None)
    def test_links_existing_user_found_via_osm_on_new_user_path(self, _mock_mapped, mock_upsert):
        from social_django.models import UserSocialAuth

        UserSocialAuth.objects.create(
            user=self.user,
            provider="openstreetmap-oauth2",
            uid="33333",
        )
        request = self.factory.get("/?new_user=true")
        request.hotosm = Mock()
        request.hotosm.user = Mock(id="hanko-osm-link", email="osm@example.com")
        request.hotosm.osm = Mock(osm_user_id=33333, osm_username="testuser")

        response = OnboardingCallback().get(request)

        self.assertEqual(response.status_code, 302)
        mock_upsert.assert_called_once_with("hanko-osm-link", str(self.user.id))


class OnboardingCallbackLegacyUserTest(BaseAuthTestCase):
    def setUp(self):
        super().setUp()
        from social_django.models import UserSocialAuth

        UserSocialAuth.objects.create(
            user=self.user,
            provider="openstreetmap-oauth2",
            uid="55555",
        )

    @override_settings(AUTH_PROVIDER="hanko", SITE_URL="http://testserver/")
    @patch("hotumap.views._upsert_user_mapping")
    def test_maps_legacy_user_by_osm_id(self, mock_upsert):
        request = self.factory.get("/")
        request.hotosm = Mock()
        request.hotosm.user = Mock(id="hanko-legacy-1", email="other@example.com")
        request.hotosm.osm = Mock(osm_user_id=55555, osm_username="testuser")

        response = OnboardingCallback().get(request)

        self.assertEqual(response.status_code, 302)
        mock_upsert.assert_called_once_with("hanko-legacy-1", str(self.user.id))

    @override_settings(AUTH_PROVIDER="hanko")
    @patch("hotumap.views._upsert_user_mapping")
    def test_redirects_to_login_with_error_when_user_not_found(self, mock_upsert):
        request = self.factory.get("/")
        request.hotosm = Mock()
        request.hotosm.user = Mock(id="hanko-unknown", email="nobody@example.com")
        request.hotosm.osm = Mock(osm_user_id=99999, osm_username="ghost")

        with override_settings(HANKO_API_URL="https://login.hotosm.org"):
            response = OnboardingCallback().get(request)

        self.assertEqual(response.status_code, 302)
        self.assertIn("error", response.url)
        mock_upsert.assert_not_called()


class AuthStatusLegacyTest(BaseAuthTestCase):
    @override_settings(AUTH_PROVIDER="legacy")
    def test_returns_legacy_provider(self):
        request = self.factory.get("/")
        request.user = AnonymousUser()

        view = AuthStatus()
        view.format_kwarg = None
        view.request = request
        response = view.get(request)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["auth_provider"], "legacy")


class AuthStatusHankoTest(BaseAuthTestCase):
    def _get(self, request):
        view = AuthStatus()
        view.format_kwarg = None
        view.request = request
        return view.get(request)

    @override_settings(AUTH_PROVIDER="hanko")
    def test_returns_not_authenticated_when_no_hanko_session(self):
        request = self.make_unauthenticated_request()
        response = self._get(request)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["auth_provider"], "hanko")
        self.assertFalse(response.data["authenticated"])
        self.assertFalse(response.data["hanko_authenticated"])

    @override_settings(AUTH_PROVIDER="hanko")
    @patch("hotosm_auth_django.get_mapped_user_id", return_value=None)
    def test_returns_needs_onboarding_when_no_mapping(self, _mock):
        request = self.make_hanko_request()
        response = self._get(request)

        self.assertEqual(response.status_code, 200)
        self.assertFalse(response.data["authenticated"])
        self.assertTrue(response.data["needs_onboarding"])
        self.assertTrue(response.data["hanko_authenticated"])

    @override_settings(AUTH_PROVIDER="hanko")
    @patch("hotosm_auth_django.get_mapped_user_id")
    def test_returns_osm_id_zero_when_no_osm_connection(self, mock_get_mapped):
        mock_get_mapped.return_value = str(self.user.id)
        request = self.make_hanko_request()
        response = self._get(request)

        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.data["authenticated"])
        self.assertFalse(response.data["needs_onboarding"])
        self.assertEqual(response.data["user"]["username"], self.user.username)
        self.assertEqual(response.data["user"]["osm_id"], 0)
        self.assertFalse(response.data["user"]["is_real_osm"])

    @override_settings(AUTH_PROVIDER="hanko")
    @patch("hotosm_auth_django.get_mapped_user_id")
    def test_returns_real_osm_id_when_social_auth_exists(self, mock_get_mapped):
        from social_django.models import UserSocialAuth

        UserSocialAuth.objects.create(
            user=self.user,
            provider="openstreetmap-oauth2",
            uid="9876543",
        )
        mock_get_mapped.return_value = str(self.user.id)
        request = self.make_hanko_request()
        response = self._get(request)

        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.data["authenticated"])
        self.assertEqual(response.data["user"]["osm_id"], 9876543)
        self.assertTrue(response.data["user"]["is_real_osm"])

    @override_settings(AUTH_PROVIDER="hanko")
    @patch("hotosm_auth_django.get_mapped_user_id", return_value="99999")
    def test_returns_needs_onboarding_when_mapped_user_deleted(self, _mock):
        request = self.make_hanko_request()
        response = self._get(request)

        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.data["needs_onboarding"])
