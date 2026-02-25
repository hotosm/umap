#!/usr/bin/env bash
# Wait for database to be ready

set -e

DB_HOST=${UMAP_DB_HOST:-localhost}
DB_PORT=${UMAP_DB_PORT:-5432}
DB_USER=${UMAP_DB_USER:-postgres}
DB_NAME=${UMAP_DB_NAME:-postgres}
MAX_TRIES=30

echo "Waiting for database at $DB_HOST:$DB_PORT..."

try=1
while [ $try -le $MAX_TRIES ]; do
    if pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" >/dev/null 2>&1; then
        echo "Database is ready!"
        exit 0
    fi
    
    echo "Database is unavailable - Attempt $try/$MAX_TRIES. Waiting..."
    sleep 1
    try=$((try + 1))
done

echo "Database failed to become ready after $MAX_TRIES attempts"
exit 1
