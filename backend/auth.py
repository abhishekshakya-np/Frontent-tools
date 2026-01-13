"""
Authentication utilities for the admin panel
"""
import json
import bcrypt
import secrets
import os
from pathlib import Path
from functools import wraps
from flask import jsonify, request
from flask_jwt_extended import create_access_token, verify_jwt_in_request, get_jwt_identity
from config import DATABASE_DIR

USERS_FILE = DATABASE_DIR / "users.json"


def generate_secure_password(length=16):
    """Generate a cryptographically secure random password"""
    alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
    return ''.join(secrets.choice(alphabet) for _ in range(length))


def init_users():
    """Initialize users.json if it doesn't exist"""
    if not USERS_FILE.exists():
        # Check for admin password from environment variable first
        admin_password = os.environ.get('ADMIN_PASSWORD')

        if not admin_password:
            # Generate a secure random password
            admin_password = generate_secure_password()
            print("=" * 60)
            print("IMPORTANT: Auto-generated admin credentials")
            print("=" * 60)
            print(f"Username: admin")
            print(f"Password: {admin_password}")
            print("=" * 60)
            print("SAVE THIS PASSWORD! It will not be shown again.")
            print("Or set ADMIN_PASSWORD environment variable before first run.")
            print("=" * 60)
        else:
            print("Admin user created with password from ADMIN_PASSWORD env var.")

        hashed_password = bcrypt.hashpw(admin_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        default_user = {
            "admin": {
                "username": "admin",
                "password": hashed_password,
                "email": "admin@example.com",
                "role": "admin"
            }
        }
        USERS_FILE.parent.mkdir(parents=True, exist_ok=True)
        with open(USERS_FILE, 'w') as f:
            json.dump(default_user, f, indent=2)


def verify_password(username, password):
    """Verify user credentials"""
    if not USERS_FILE.exists():
        init_users()
    
    with open(USERS_FILE, 'r') as f:
        users = json.load(f)
    
    if username not in users:
        return False
    
    stored_password = users[username]['password']
    return bcrypt.checkpw(password.encode('utf-8'), stored_password.encode('utf-8'))


def create_user(username, password, email="", role="admin"):
    """Create a new user"""
    if not USERS_FILE.exists():
        init_users()
    
    with open(USERS_FILE, 'r') as f:
        users = json.load(f)
    
    if username in users:
        return False, "Username already exists"
    
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    users[username] = {
        "username": username,
        "password": hashed_password,
        "email": email,
        "role": role
    }
    
    with open(USERS_FILE, 'w') as f:
        json.dump(users, f, indent=2)
    
    return True, "User created successfully"


def change_password(username, old_password, new_password):
    """Change user password"""
    if not verify_password(username, old_password):
        return False, "Current password is incorrect"
    
    with open(USERS_FILE, 'r') as f:
        users = json.load(f)
    
    hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    users[username]['password'] = hashed_password
    
    with open(USERS_FILE, 'w') as f:
        json.dump(users, f, indent=2)
    
    return True, "Password changed successfully"


def admin_required(f):
    """Decorator to require admin authentication"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        verify_jwt_in_request()
        current_user = get_jwt_identity()
        if not current_user:
            return jsonify({"error": "Authentication required"}), 401
        return f(*args, **kwargs)
    return decorated_function
