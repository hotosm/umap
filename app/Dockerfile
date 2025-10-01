# HOT uMap Dockerfile

FROM umap/umap:3.1.2

WORKDIR /app

# Install uv
RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates
ADD https://astral.sh/uv/install.sh /uv-installer.sh
RUN sh /uv-installer.sh && rm /uv-installer.sh
RUN ln -s /root/.local/bin/uv /usr/local/bin/uv

# Copy app
COPY . .

# Install dependencies
RUN uv sync --locked

RUN adduser --disabled-password --gecos "" appuser && \
    chown -R appuser:appuser /app
USER appuser

EXPOSE 8000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s \
    CMD curl -f http://localhost:8000/ || exit 1

# App entrypoint
RUN chmod +x /app/entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]

