"""
Authentication utilities for the admin panel
"""
import json
import bcrypt
from pathlib import Path
from functools import wraps
from flask import jsonify, request
from flask_jwt_extended import create_access_token, verify_jwt_in_request, get_jwt_identity
from config import DATABASE_DIR

USERS_FILE = DATABASE_DIR / "users.json"


def init_users():
    """Initialize users.json if it doesn't exist"""
    if not USERS_FILE.exists():
        # Default admin user (password: admin123)
        default_password = bcrypt.hashpw("admin123".encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        default_user = {
            "admin": {
                "username": "admin",
                "password": default_password,
                "email": "admin@example.com",
                "role": "admin"
            }
        }
        USERS_FILE.parent.mkdir(parents=True, exist_ok=True)
        with open(USERS_FILE, 'w') as f:
            json.dump(default_user, f, indent=2)
        print(f"✅ Created default admin user (username: admin, password: admin123)")
        print(f"⚠️  Please change the default password after first login!")


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
