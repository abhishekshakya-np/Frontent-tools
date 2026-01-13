"""
Flask application for Frontend Collection Admin API
"""
from flask import Flask, jsonify, request, send_from_directory, abort
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token
from pathlib import Path
import os
import re

from config import (
    DATABASE_DIR, SECRET_KEY, JWT_SECRET_KEY, CORS_ORIGINS,
    JWT_ACCESS_TOKEN_EXPIRES, HOST, PORT, DEBUG, IS_PRODUCTION,
    RATE_LIMIT_ENABLED, RATE_LIMIT_DEFAULT, RATE_LIMIT_LOGIN
)
from auth import init_users, verify_password, admin_required

# Import routes
from routes.projects import projects_bp
from routes.websites import websites_bp
from routes.snippets import snippets_bp

app = Flask(__name__)
app.config['SECRET_KEY'] = SECRET_KEY
app.config['JWT_SECRET_KEY'] = JWT_SECRET_KEY
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = JWT_ACCESS_TOKEN_EXPIRES

# Security headers
@app.after_request
def add_security_headers(response):
    """Add security headers to all responses"""
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'SAMEORIGIN'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    if IS_PRODUCTION:
        response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    return response

# Initialize extensions
jwt = JWTManager(app)
CORS(app, origins=CORS_ORIGINS)

# Rate limiting (optional - requires flask-limiter)
limiter = None
try:
    from flask_limiter import Limiter
    from flask_limiter.util import get_remote_address
    if RATE_LIMIT_ENABLED:
        limiter = Limiter(
            app=app,
            key_func=get_remote_address,
            default_limits=[RATE_LIMIT_DEFAULT]
        )
except ImportError:
    if RATE_LIMIT_ENABLED:
        print("WARNING: flask-limiter not installed. Rate limiting disabled.")

# Initialize database
DATABASE_DIR.mkdir(parents=True, exist_ok=True)
init_users()

# Register blueprints
app.register_blueprint(projects_bp, url_prefix='/api/projects')
app.register_blueprint(websites_bp, url_prefix='/api/websites')
app.register_blueprint(snippets_bp, url_prefix='/api/snippets')


@app.route('/api/auth/login', methods=['POST'])
def login():
    """Login endpoint with rate limiting"""
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid request body"}), 400

    username = data.get('username', '').strip()
    password = data.get('password', '')

    # Input validation
    if not username or not password:
        return jsonify({"error": "Username and password required"}), 400

    if len(username) > 50 or len(password) > 128:
        return jsonify({"error": "Invalid credentials"}), 401

    # Sanitize username (alphanumeric and underscore only)
    if not re.match(r'^[a-zA-Z0-9_]+$', username):
        return jsonify({"error": "Invalid credentials"}), 401

    if verify_password(username, password):
        access_token = create_access_token(identity=username)
        return jsonify({
            "access_token": access_token,
            "username": username,
            "message": "Login successful"
        }), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401


@app.route('/api/auth/verify', methods=['GET'])
@admin_required
def verify():
    """Verify token endpoint"""
    from flask_jwt_extended import get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify({"username": current_user, "authenticated": True}), 200


@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({"status": "ok", "message": "API is running"}), 200


# Serve admin panel files
@app.route('/admin/<path:filename>')
def admin_files(filename):
    """Serve admin panel files"""
    admin_dir = Path(__file__).parent.parent / "admin"
    return send_from_directory(admin_dir, filename)


# Serve static files (thumbnails, etc.)
@app.route('/thumbnails/<path:filename>')
def thumbnails(filename):
    """Serve thumbnail images with directory traversal protection"""
    thumbnails_dir = Path(__file__).parent.parent / "thumbnails"

    # Security: Prevent directory traversal attacks
    # Normalize and validate the filename
    safe_filename = os.path.basename(filename)
    if safe_filename != filename or '..' in filename:
        abort(400, "Invalid filename")

    # Validate file extension
    allowed_extensions = {'png', 'jpg', 'jpeg', 'svg', 'gif', 'webp'}
    ext = safe_filename.rsplit('.', 1)[-1].lower() if '.' in safe_filename else ''
    if ext not in allowed_extensions:
        abort(400, "Invalid file type")

    return send_from_directory(thumbnails_dir, safe_filename)


if __name__ == '__main__':
    print("Starting Frontend Collection Admin API...")
    print(f"Database directory: {DATABASE_DIR}")
    print(f"Environment: {'PRODUCTION' if IS_PRODUCTION else 'DEVELOPMENT'}")
    print(f"API running at: http://{HOST}:{PORT}")
    print(f"Admin panel at: http://{HOST}:{PORT}/admin/login.html")
    print(f"Debug mode: {DEBUG}")
    print("-" * 50)
    if IS_PRODUCTION:
        print("WARNING: Running in production mode. Use a proper WSGI server like gunicorn.")
    app.run(debug=DEBUG, port=PORT, host=HOST)
