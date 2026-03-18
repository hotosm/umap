import importlib

from django.test.runner import DiscoverRunner


class PatchedTestRunner(DiscoverRunner):
    def setup_databases(self, **kwargs):
        m = importlib.import_module(
            "umap.migrations.0017_migrate_to_openstreetmap_oauth2"
        )
        dep = ("social_django", "0001_initial")
        if dep not in m.Migration.dependencies:
            m.Migration.dependencies.append(dep)
        return super().setup_databases(**kwargs)
