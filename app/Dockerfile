# HOT uMap Dockerfile

FROM umap/umap:3.6.1

WORKDIR /app

# Install uv
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl ca-certificates postgresql-client && \
    curl -LsSf https://astral.sh/uv/install.sh | sh -s -- --no-modify-path && \
    cp /root/.local/bin/uv /usr/local/bin/uv && \
    chmod 755 /usr/local/bin/uv

# Copy app
COPY . .

RUN adduser --disabled-password --gecos "" appuser && \
    chown -R appuser:appuser /app
USER appuser

# Install dependencies
RUN uv sync --locked

EXPOSE 8000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s \
    CMD curl -f http://localhost:8000/ || exit 1

# Static files
RUN mkdir -p /app/static && \
    chown -R appuser:appuser /app/static && \
    chmod -R 755 /app/static

# App entrypoint
RUN chmod +x ./start.sh
ENTRYPOINT ["./start.sh"]
