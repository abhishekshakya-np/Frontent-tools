"""
API routes for Websites CRUD operations
"""
from flask import Blueprint, jsonify, request
from pathlib import Path
import json
import uuid
from auth import admin_required
from config import DATABASE_DIR
from validation import validate_website_data, filter_allowed_fields, ALLOWED_WEBSITE_FIELDS

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
    """Create a new website with input validation"""
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid request body"}), 400

    # Validate and sanitize input
    errors, sanitized_data = validate_website_data(data, is_update=False)
    if errors:
        return jsonify({"error": errors[0], "errors": errors}), 400

    websites = load_websites()

    # Generate ID (don't accept ID from client for security)
    website_id = str(uuid.uuid4())

    # Create website object with sanitized data
    website = {
        "id": website_id,
        "title": sanitized_data.get('title', ''),
        "description": sanitized_data.get('description', ''),
        "category": sanitized_data.get('category', ''),
        "badge": sanitized_data.get('badge', ''),
        "url": sanitized_data.get('url', ''),
        "icon": sanitized_data.get('icon', 'fas fa-globe'),
        "gradient": sanitized_data.get('gradient', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'),
        "tags": sanitized_data.get('tags', []),
        "order": sanitized_data.get('order', len(websites) + 1),
        "visible": sanitized_data.get('visible', True),
        "createdAt": sanitized_data.get('createdAt', ''),
        "updatedAt": sanitized_data.get('updatedAt', '')
    }

    websites.append(website)
    save_websites(websites)

    return jsonify(website), 201


@websites_bp.route('/<website_id>', methods=['PUT'])
@admin_required
def update_website(website_id):
    """Update an existing website with input validation"""
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid request body"}), 400

    # Validate and sanitize input
    errors, sanitized_data = validate_website_data(data, is_update=True)
    if errors:
        return jsonify({"error": errors[0], "errors": errors}), 400

    websites = load_websites()

    website_index = next((i for i, w in enumerate(websites) if w.get('id') == website_id), None)
    if website_index is None:
        return jsonify({"error": "Website not found"}), 404

    # Update only allowed and validated fields (whitelist approach)
    for key, value in sanitized_data.items():
        if key in ALLOWED_WEBSITE_FIELDS:
            websites[website_index][key] = value

    # Ensure ID doesn't change
    websites[website_index]['id'] = website_id

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
