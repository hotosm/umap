.PHONY: up down logs test_auth

COMPOSE_DEV = compose.dev.yml

up:
	docker compose -f $(COMPOSE_DEV) up -d

down:
	docker compose -f $(COMPOSE_DEV) down

logs:
	docker compose -f $(COMPOSE_DEV) logs -f app

test_auth:
	docker exec hotosm-umap-app psql -h umap-db -U umap -d umap -c "DROP DATABASE IF EXISTS test_umap;" 2>/dev/null || true
	docker exec hotosm-umap-app uv run python manage.py test hotumap.tests --testrunner hotumap.test_runner.PatchedTestRunner -v 2
