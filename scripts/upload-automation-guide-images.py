"""Upload only the two original article diagrams using dedicated blog B2 storage."""
import hashlib
import os
from pathlib import Path
from urllib.parse import quote
from urllib.request import urlopen

import boto3
from botocore.config import Config
from botocore.exceptions import ClientError
from dotenv import dotenv_values

root = Path(__file__).resolve().parents[1]
env_file = os.environ.get("BLOG_STORAGE_ENV_FILE")
if not env_file:
    raise SystemExit("Set BLOG_STORAGE_ENV_FILE to the dedicated blog storage configuration.")
values = {**dotenv_values(env_file), **os.environ}
settings = {name: values.get("BLOG_B2_" + name) for name in (
    "BUCKET_NAME", "ENDPOINT_URL", "PUBLIC_BASE_URL", "APPLICATION_KEY_ID", "APPLICATION_KEY"
)}
if not all(settings.values()):
    raise SystemExit("Dedicated BLOG_B2 settings are incomplete.")
endpoint = settings["ENDPOINT_URL"].rstrip("/")
region = endpoint.split("s3.", 1)[1].split(".backblazeb2.com")[0]
client = boto3.client("s3", endpoint_url=endpoint,
    aws_access_key_id=settings["APPLICATION_KEY_ID"],
    aws_secret_access_key=settings["APPLICATION_KEY"], region_name=region,
    config=Config(signature_version="s3v4", connect_timeout=10, read_timeout=30,
                  retries={"total_max_attempts": 1}))
for name in ("workflow", "review-gate"):
    filename = name + "-20261030.webp"
    data = (root / "artifacts" / "automation-guide" / filename).read_bytes()
    checksum = hashlib.sha256(data).hexdigest()
    key = "blog/azeemlab/ai-automation-for-business-guide/" + filename
    try:
        existing = client.head_object(Bucket=settings["BUCKET_NAME"], Key=key)
    except ClientError as error:
        if error.response["Error"]["Code"] not in ("404", "NoSuchKey", "NotFound"):
            raise
        existing = None
    if existing and existing.get("Metadata", {}).get("sha256") != checksum:
        raise SystemExit("Existing image differs; refusing to overwrite " + key)
    if not existing:
        client.put_object(Bucket=settings["BUCKET_NAME"], Key=key, Body=data,
            ContentType="image/webp", CacheControl="public, max-age=31536000, immutable",
            Metadata={"sha256": checksum})
    stored = client.head_object(Bucket=settings["BUCKET_NAME"], Key=key)
    if stored["ContentLength"] != len(data) or stored.get("Metadata", {}).get("sha256") != checksum:
        raise SystemExit("Image verification failed")
    public_url = settings["PUBLIC_BASE_URL"].rstrip("/") + "/" + quote(key, safe="/")
    with urlopen(public_url, timeout=30) as response:
        if response.status != 200 or hashlib.sha256(response.read()).hexdigest() != checksum:
            raise SystemExit("Public image verification failed")
    print("Public image verified: " + public_url)
