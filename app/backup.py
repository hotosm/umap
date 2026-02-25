#!/usr/bin/env python3
"""
DB backup script
Dumps PostgreSQL database and uploads it to S3.
"""

import os
import subprocess
import sys
from datetime import datetime, timezone

import boto3

# Settings
DB_NAME = os.environ.get("UMAP_DB_NAME", "umap")
DB_USER = os.environ.get("UMAP_DB_USER", "umap")
DB_PASSWORD = os.environ.get("UMAP_DB_PASSWORD", "")
DB_HOST = os.environ.get("UMAP_DB_HOST", "localhost")
DB_PORT = os.environ.get("UMAP_DB_PORT", "5432")

S3_BUCKET = os.environ.get("S3_BUCKET_NAME")
S3_REGION = os.environ.get("AWS_DEFAULT_REGION", "us-east-1")
S3_PREFIX = "backups"

if not S3_BUCKET:
    print("ERROR: S3_BUCKET_NAME env var is not set.")
    sys.exit(1)

# Filename
timestamp = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H-%M-%SZ")
filename = f"{DB_NAME}_{timestamp}.dump.gz"
s3_key = f"{S3_PREFIX}/{filename}"

print(f"Database : {DB_USER}@{DB_HOST}:{DB_PORT}/{DB_NAME}")
print(f"S3 target: s3://{S3_BUCKET}/{s3_key}")
print()

# DB dump
print("Running pg_dump...")
env = os.environ.copy()
env["PGPASSWORD"] = DB_PASSWORD

pg_dump = subprocess.Popen(
    [
        "pg_dump",
        "-h", DB_HOST,
        "-p", DB_PORT,
        "-U", DB_USER,
        "-d", DB_NAME,
        "-F", "c",
    ],
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    env=env,
)

dump_data, pg_err = pg_dump.communicate()

if pg_dump.returncode != 0:
    print(f"ERROR: pg_dump failed (exit {pg_dump.returncode}):")
    print(pg_err.decode())
    sys.exit(1)

size_mb = len(dump_data) / 1024 / 1024
print(f"Dump size: {size_mb:.1f} MB")

# S3 upload
print(f"Uploading to S3...")
s3 = boto3.client("s3", region_name=S3_REGION)

try:
    s3.put_object(
        Bucket=S3_BUCKET,
        Key=s3_key,
        Body=dump_data,
    )
except Exception as e:
    print(f"ERROR: S3 upload failed: {e}")
    sys.exit(1)

print(f"Done. Backup saved to s3://{S3_BUCKET}/{s3_key}")
