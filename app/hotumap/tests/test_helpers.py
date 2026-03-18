from django.contrib.auth.models import User

from hotumap.hanko_helpers import (
    create_umap_user,
    find_legacy_user_by_email,
    find_legacy_user_by_osm_id,
    generate_synthetic_osm_id,
    is_real_osm_user,
)

from .base import BaseAuthTestCase


class SyntheticOsmIdTest(BaseAuthTestCase):
    def test_returns_negative_integer(self):
        result = generate_synthetic_osm_id("some-uuid")
        self.assertIsInstance(result, int)
        self.assertLess(result, 0)

    def test_is_deterministic(self):
        uid = "fixed-hanko-id"
        self.assertEqual(generate_synthetic_osm_id(uid), generate_synthetic_osm_id(uid))

    def test_different_uids_produce_different_ids(self):
        a = generate_synthetic_osm_id("uuid-aaa")
        b = generate_synthetic_osm_id("uuid-bbb")
        self.assertNotEqual(a, b)


class IsRealOsmUserTest(BaseAuthTestCase):
    def test_positive_id_is_real(self):
        self.assertTrue(is_real_osm_user(1))
        self.assertTrue(is_real_osm_user(9999999))

    def test_negative_id_is_synthetic(self):
        self.assertFalse(is_real_osm_user(-1))
        self.assertFalse(is_real_osm_user(-9999999))

    def test_zero_is_not_real(self):
        self.assertFalse(is_real_osm_user(0))


class FindLegacyUserByOsmIdTest(BaseAuthTestCase):
    def setUp(self):
        super().setUp()
        from social_django.models import UserSocialAuth

        self.social_auth = UserSocialAuth.objects.create(
            user=self.user,
            provider="openstreetmap-oauth2",
            uid="12345",
        )

    def test_returns_user_for_known_osm_id(self):
        found = find_legacy_user_by_osm_id(12345)
        self.assertIsNotNone(found)
        self.assertEqual(found.id, self.user.id)

    def test_returns_none_for_unknown_osm_id(self):
        self.assertIsNone(find_legacy_user_by_osm_id(99999))

    def test_returns_none_for_wrong_provider(self):
        from social_django.models import UserSocialAuth

        other_user = User.objects.create_user(username="other", email="other@example.com")
        UserSocialAuth.objects.create(
            user=other_user,
            provider="github",
            uid="77777",
        )
        self.assertIsNone(find_legacy_user_by_osm_id(77777))


class FindLegacyUserByEmailTest(BaseAuthTestCase):
    def test_returns_user_for_known_email(self):
        found = find_legacy_user_by_email("test@example.com")
        self.assertIsNotNone(found)
        self.assertEqual(found.id, self.user.id)

    def test_returns_none_for_unknown_email(self):
        self.assertIsNone(find_legacy_user_by_email("nobody@example.com"))

    def test_returns_none_for_empty_string(self):
        self.assertIsNone(find_legacy_user_by_email(""))

    def test_returns_none_for_none(self):
        self.assertIsNone(find_legacy_user_by_email(None))


class CreateUmapUserTest(BaseAuthTestCase):
    def test_creates_user_with_given_username(self):
        user = create_umap_user("newuser", email="new@example.com")
        self.assertEqual(user.username, "newuser")
        self.assertEqual(user.email, "new@example.com")
        self.assertTrue(User.objects.filter(username="newuser").exists())

    def test_resolves_username_conflict_with_suffix(self):
        user = create_umap_user("testuser", email="conflict@example.com")
        self.assertTrue(user.username.startswith("testuser_"))
        self.assertNotEqual(user.username, "testuser")

    def test_creates_user_without_email(self):
        user = create_umap_user("noemail")
        self.assertIsNotNone(user)
        self.assertEqual(user.email, "")

    def test_sequential_conflicts_all_unique(self):
        u1 = create_umap_user("john", "j1@example.com")
        u2 = create_umap_user("john", "j2@example.com")
        u3 = create_umap_user("john", "j3@example.com")
        names = {u1.username, u2.username, u3.username}
        self.assertEqual(len(names), 3)
