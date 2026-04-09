from unittest.mock import Mock, patch

from django.contrib.auth.models import AnonymousUser
from django.http import HttpResponse

from hotumap.hanko_middleware import HankoUserMiddleware

from .base import BaseAuthTestCase


def _make_middleware():
    return HankoUserMiddleware(get_response=Mock(return_value=HttpResponse()))


class AuthenticateHankoUserTest(BaseAuthTestCase):
    def test_skips_when_user_already_authenticated(self):
        request = self.make_hanko_request()
        request.user = self.user

        _make_middleware()._authenticate_hanko_user(request)

        self.assertFalse(getattr(request, "_hanko_authenticated", False))

    def test_skips_when_hotosm_user_is_none(self):
        request = self.factory.get("/")
        request.user = AnonymousUser()
        request.hotosm = Mock()
        request.hotosm.user = None

        _make_middleware()._authenticate_hanko_user(request)

        self.assertFalse(getattr(request, "needs_onboarding", False))

    def test_skips_when_no_hotosm_attr(self):
        request = self.make_unauthenticated_request()
        request.user = AnonymousUser()

        _make_middleware()._authenticate_hanko_user(request)

        self.assertFalse(getattr(request, "needs_onboarding", False))

    @patch("hotosm_auth_django.get_mapped_user_id", return_value=None)
    def test_sets_needs_onboarding_when_no_mapping(self, _mock):
        request = self.make_hanko_request()
        request.user = AnonymousUser()

        _make_middleware()._authenticate_hanko_user(request)

        self.assertTrue(getattr(request, "needs_onboarding", False))

    @patch("hotosm_auth_django.get_mapped_user_id")
    def test_sets_user_from_valid_mapping(self, mock_get_mapped):
        mock_get_mapped.return_value = str(self.user.id)
        request = self.make_hanko_request()
        request.user = AnonymousUser()

        _make_middleware()._authenticate_hanko_user(request)

        self.assertEqual(request.user.id, self.user.id)
        self.assertTrue(getattr(request, "_hanko_authenticated", False))

    @patch("hotosm_auth_django.get_mapped_user_id", return_value="99999")
    def test_sets_needs_onboarding_when_mapped_user_deleted(self, _mock):
        request = self.make_hanko_request()
        request.user = AnonymousUser()

        _make_middleware()._authenticate_hanko_user(request)

        self.assertTrue(getattr(request, "needs_onboarding", False))


class SyncHankoUserDataTest(BaseAuthTestCase):
    def test_syncs_email_when_changed(self):
        hanko_user = Mock(email="updated@example.com")
        _make_middleware()._sync_hanko_user_data(self.user, hanko_user)
        self.user.refresh_from_db()
        self.assertEqual(self.user.email, "updated@example.com")

    def test_no_update_when_email_unchanged(self):
        original_email = self.user.email
        hanko_user = Mock(email=original_email)
        _make_middleware()._sync_hanko_user_data(self.user, hanko_user)
        self.user.refresh_from_db()
        self.assertEqual(self.user.email, original_email)

    def test_no_update_when_email_is_empty(self):
        hanko_user = Mock(email="")
        _make_middleware()._sync_hanko_user_data(self.user, hanko_user)
        self.user.refresh_from_db()
        self.assertEqual(self.user.email, "test@example.com")


class ClearStaleSessionTest(BaseAuthTestCase):
    def _make_response(self):
        response = HttpResponse()
        response.delete_cookie = Mock()
        return response

    def test_no_clear_when_hanko_present(self):
        request = self.make_hanko_request()
        request.user = self.user
        response = self._make_response()

        _make_middleware()._clear_session_if_no_hanko(request, response)

        response.delete_cookie.assert_not_called()

    def test_no_clear_when_session_cookie_absent(self):
        request = self.make_unauthenticated_request()
        request.user = AnonymousUser()
        request.COOKIES = {}
        response = self._make_response()

        _make_middleware()._clear_session_if_no_hanko(request, response)

        response.delete_cookie.assert_not_called()

    @patch("hotumap.hanko_middleware.logout")
    def test_clears_session_and_deletes_cookie_on_stale_session(self, mock_logout):
        request = self.make_unauthenticated_request()
        request.COOKIES = {"sessionid": "abc123"}
        request.user = Mock(is_authenticated=True, id=self.user.id)
        response = self._make_response()

        _make_middleware()._clear_session_if_no_hanko(request, response)

        mock_logout.assert_called_once_with(request)
        response.delete_cookie.assert_called()

