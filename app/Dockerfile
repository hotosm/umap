# HOT uMap Dockerfile

FROM umap/umap:3.4.0

WORKDIR /app

# Install system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        curl \
        ca-certificates \
        postgresql-client \
        git && \
    rm -rf /var/lib/apt/lists/*

# Copy uv binary from official image
COPY --from=ghcr.io/astral-sh/uv:0.9 /uv /usr/local/bin/uv

RUN chmod 755 /usr/local/bin/uv

# Create user
RUN adduser --disabled-password --gecos "" appuser && \
    chown -R appuser:appuser /app
USER appuser

# Install dependencies first (cached independently from source code)
COPY --chown=appuser:appuser pyproject.toml uv.lock ./
RUN uv sync --locked

# Copy application code
COPY --chown=appuser:appuser . .

EXPOSE 8000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s \
    CMD curl -f http://localhost:8000/ || exit 1

# App entrypoint
RUN chmod +x /app/start.sh && \
    chmod +x /app/scripts/wait-for-db.sh
ENTRYPOINT ["./start.sh"]

