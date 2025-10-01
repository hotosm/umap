# HOT uMap Dockerfile

FROM umap/umap:3.1.2

# Install uv
RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates
ADD https://astral.sh/uv/install.sh /uv-installer.sh
RUN sh /uv-installer.sh && rm /uv-installer.sh
ENV PATH="/root/.local/bin/:$PATH"

# Add app
ADD . /app
WORKDIR /app

# Install dependencies
RUN uv sync --locked

# App entrypoint
ENTRYPOINT ["./entrypoint.sh"]

