"""
Configuration file for Flask application
"""
import os
from pathlib import Path

# Base directory
BASE_DIR = Path(__file__).parent

# Database directory
DATABASE_DIR = BASE_DIR / "database"

# Secret key for JWT (change this in production!)
SECRET_KEY = os.environ.get('SECRET_KEY', 'your-secret-key-change-this-in-production')

# JWT settings
JWT_SECRET_KEY = SECRET_KEY
JWT_ACCESS_TOKEN_EXPIRES = False  # Set to timedelta(hours=1) for production

# CORS settings
CORS_ORIGINS = ["http://localhost:5001", "http://127.0.0.1:5001", "http://localhost:8000", "http://127.0.0.1:8000"]

# File upload settings
UPLOAD_FOLDER = BASE_DIR.parent / "thumbnails"
MAX_UPLOAD_SIZE = 5 * 1024 * 1024  # 5MB
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'svg', 'gif', 'webp'}
