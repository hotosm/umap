from unittest.mock import Mock

from django.contrib.auth.models import User
from django.test import RequestFactory, TestCase


class BaseAuthTestCase(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.user = User.objects.create_user(
            username="testuser",
            email="test@example.com",
        )

    def make_hanko_request(self, path="/", hanko_id="hanko-uuid-123", email="test@example.com"):
        request = self.factory.get(path)
        request.hotosm = Mock()
        request.hotosm.user = Mock(id=hanko_id, email=email)
        request.hotosm.osm = None
        return request

    def make_unauthenticated_request(self, path="/"):
        request = self.factory.get(path)
        if hasattr(request, "hotosm"):
            del request.hotosm
        return request
