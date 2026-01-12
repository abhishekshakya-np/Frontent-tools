"""
Flask application for Frontend Collection Admin API
"""
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token
from pathlib import Path
import os

from config import DATABASE_DIR, SECRET_KEY, JWT_SECRET_KEY, CORS_ORIGINS
from auth import init_users, verify_password, admin_required

# Import routes
from routes.projects import projects_bp
from routes.websites import websites_bp
from routes.snippets import snippets_bp

app = Flask(__name__)
app.config['SECRET_KEY'] = SECRET_KEY
app.config['JWT_SECRET_KEY'] = JWT_SECRET_KEY
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = False

# Initialize extensions
jwt = JWTManager(app)
CORS(app, origins=CORS_ORIGINS)

# Initialize database
DATABASE_DIR.mkdir(parents=True, exist_ok=True)
init_users()

# Register blueprints
app.register_blueprint(projects_bp, url_prefix='/api/projects')
app.register_blueprint(websites_bp, url_prefix='/api/websites')
app.register_blueprint(snippets_bp, url_prefix='/api/snippets')


@app.route('/api/auth/login', methods=['POST'])
def login():
    """Login endpoint"""
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({"error": "Username and password required"}), 400
    
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
    """Serve thumbnail images"""
    thumbnails_dir = Path(__file__).parent.parent / "thumbnails"
    return send_from_directory(thumbnails_dir, filename)


if __name__ == '__main__':
    print("🚀 Starting Frontend Collection Admin API...")
    print(f"📁 Database directory: {DATABASE_DIR}")
    print(f"🌐 API running at: http://localhost:5001")
    print(f"🔐 Admin panel at: http://localhost:5001/admin/login.html")
    print("-" * 50)
    app.run(debug=True, port=5001, host='0.0.0.0')
