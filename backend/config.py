"""
Configuration file for Flask application
"""
import os
import secrets
from pathlib import Path
from datetime import timedelta

# Load environment variables from .env file if python-dotenv is available
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

# Base directory
BASE_DIR = Path(__file__).parent

# Database directory
DATABASE_DIR = BASE_DIR / "database"

# Environment
ENV = os.environ.get('FLASK_ENV', 'development')
IS_PRODUCTION = ENV == 'production'

# Secret key for JWT - MUST be set in production via environment variable
def get_secret_key():
    """Get or generate secret key"""
    key = os.environ.get('SECRET_KEY')
    if key:
        return key
    if IS_PRODUCTION:
        raise ValueError("SECRET_KEY environment variable must be set in production!")
    # Generate a random key for development (will change on restart)
    print("WARNING: Using auto-generated SECRET_KEY. Set SECRET_KEY env var for persistence.")
    return secrets.token_hex(32)

SECRET_KEY = get_secret_key()

# JWT settings
JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', SECRET_KEY)
JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=int(os.environ.get('JWT_EXPIRY_HOURS', '24')))

# CORS settings - configurable via environment
DEFAULT_CORS_ORIGINS = [
    "http://localhost:5001",
    "http://127.0.0.1:5001",
    "http://localhost:8000",
    "http://127.0.0.1:8000"
]
CORS_ORIGINS = os.environ.get('CORS_ORIGINS', ','.join(DEFAULT_CORS_ORIGINS)).split(',')

# Server settings
HOST = os.environ.get('HOST', '127.0.0.1')  # Bind to localhost by default (not 0.0.0.0)
PORT = int(os.environ.get('PORT', '5001'))
DEBUG = os.environ.get('DEBUG', 'false').lower() == 'true' and not IS_PRODUCTION

# File upload settings
UPLOAD_FOLDER = BASE_DIR.parent / "thumbnails"
MAX_UPLOAD_SIZE = 5 * 1024 * 1024  # 5MB
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'svg', 'gif', 'webp'}

# Rate limiting settings
RATE_LIMIT_ENABLED = os.environ.get('RATE_LIMIT_ENABLED', 'true').lower() == 'true'
RATE_LIMIT_DEFAULT = os.environ.get('RATE_LIMIT_DEFAULT', '100/hour')
RATE_LIMIT_LOGIN = os.environ.get('RATE_LIMIT_LOGIN', '5/minute')
