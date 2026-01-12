"""
API routes for Websites CRUD operations
"""
from flask import Blueprint, jsonify, request
from pathlib import Path
import json
from auth import admin_required
from config import DATABASE_DIR

websites_bp = Blueprint('websites', __name__)
WEBSITES_FILE = DATABASE_DIR / "websites.json"


def load_websites():
    """Load websites from JSON file"""
    if not WEBSITES_FILE.exists():
        return []
    with open(WEBSITES_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)


def save_websites(websites):
    """Save websites to JSON file"""
    WEBSITES_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(WEBSITES_FILE, 'w', encoding='utf-8') as f:
        json.dump(websites, f, indent=2, ensure_ascii=False)


@websites_bp.route('/', methods=['GET'])
def get_websites():
    """Get all websites"""
    websites = load_websites()
    # Filter out invisible websites for public API
    if not request.headers.get('Authorization'):
        websites = [w for w in websites if w.get('visible', True)]
    return jsonify(websites), 200


@websites_bp.route('/<website_id>', methods=['GET'])
def get_website(website_id):
    """Get a single website by ID"""
    websites = load_websites()
    website = next((w for w in websites if w.get('id') == website_id), None)
    if not website:
        return jsonify({"error": "Website not found"}), 404
    return jsonify(website), 200


@websites_bp.route('/', methods=['POST'])
@admin_required
def create_website():
    """Create a new website"""
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['title', 'description', 'url']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing required field: {field}"}), 400
    
    websites = load_websites()
    
    # Generate ID
    import uuid
    website_id = data.get('id', str(uuid.uuid4()))
    
    # Check if ID already exists
    if any(w.get('id') == website_id for w in websites):
        return jsonify({"error": "Website ID already exists"}), 400
    
    # Create website object
    website = {
        "id": website_id,
        "title": data['title'],
        "description": data.get('description', ''),
        "category": data.get('category', ''),
        "badge": data.get('badge', ''),
        "url": data['url'],
        "icon": data.get('icon', 'fas fa-globe'),
        "gradient": data.get('gradient', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'),
        "tags": data.get('tags', []),
        "order": data.get('order', len(websites) + 1),
        "visible": data.get('visible', True),
        "createdAt": data.get('createdAt', ''),
        "updatedAt": data.get('updatedAt', '')
    }
    
    websites.append(website)
    save_websites(websites)
    
    return jsonify(website), 201


@websites_bp.route('/<website_id>', methods=['PUT'])
@admin_required
def update_website(website_id):
    """Update an existing website"""
    data = request.get_json()
    websites = load_websites()
    
    website_index = next((i for i, w in enumerate(websites) if w.get('id') == website_id), None)
    if website_index is None:
        return jsonify({"error": "Website not found"}), 404
    
    # Update website
    websites[website_index].update(data)
    websites[website_index]['id'] = website_id  # Ensure ID doesn't change
    
    save_websites(websites)
    
    return jsonify(websites[website_index]), 200


@websites_bp.route('/<website_id>', methods=['DELETE'])
@admin_required
def delete_website(website_id):
    """Delete a website"""
    websites = load_websites()
    
    website_index = next((i for i, w in enumerate(websites) if w.get('id') == website_id), None)
    if website_index is None:
        return jsonify({"error": "Website not found"}), 404
    
    deleted_website = websites.pop(website_index)
    save_websites(websites)
    
    return jsonify({"message": "Website deleted successfully", "website": deleted_website}), 200
