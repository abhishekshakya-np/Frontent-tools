"""
API routes for Snippets CRUD operations
"""
from flask import Blueprint, jsonify, request
from pathlib import Path
import json
import uuid
from auth import admin_required
from config import DATABASE_DIR
from validation import validate_snippet_data, filter_allowed_fields, ALLOWED_SNIPPET_FIELDS

snippets_bp = Blueprint('snippets', __name__)
SNIPPETS_FILE = DATABASE_DIR / "snippets.json"


def load_snippets():
    """Load snippets from JSON file"""
    if not SNIPPETS_FILE.exists():
        return []
    with open(SNIPPETS_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)


def save_snippets(snippets):
    """Save snippets to JSON file"""
    SNIPPETS_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(SNIPPETS_FILE, 'w', encoding='utf-8') as f:
        json.dump(snippets, f, indent=2, ensure_ascii=False)


@snippets_bp.route('/', methods=['GET'])
def get_snippets():
    """Get all snippets"""
    snippets = load_snippets()
    # Filter out invisible snippets for public API
    if not request.headers.get('Authorization'):
        snippets = [s for s in snippets if s.get('visible', True)]
    return jsonify(snippets), 200


@snippets_bp.route('/<snippet_id>', methods=['GET'])
def get_snippet(snippet_id):
    """Get a single snippet by ID"""
    snippets = load_snippets()
    snippet = next((s for s in snippets if s.get('id') == snippet_id), None)
    if not snippet:
        return jsonify({"error": "Snippet not found"}), 404
    return jsonify(snippet), 200


@snippets_bp.route('/', methods=['POST'])
@admin_required
def create_snippet():
    """Create a new snippet with input validation"""
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid request body"}), 400

    # Validate and sanitize input
    errors, sanitized_data = validate_snippet_data(data, is_update=False)
    if errors:
        return jsonify({"error": errors[0], "errors": errors}), 400

    snippets = load_snippets()

    # Generate ID (don't accept ID from client for security)
    snippet_id = str(uuid.uuid4())

    # Create snippet object with sanitized data
    snippet = {
        "id": snippet_id,
        "title": sanitized_data.get('title', ''),
        "description": sanitized_data.get('description', ''),
        "category": sanitized_data.get('category', ''),
        "badge": sanitized_data.get('badge', ''),
        "url": sanitized_data.get('url', ''),
        "thumbnail": sanitized_data.get('thumbnail', ''),
        "icon": sanitized_data.get('icon', 'fas fa-code'),
        "gradient": sanitized_data.get('gradient', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'),
        "tags": sanitized_data.get('tags', []),
        "order": sanitized_data.get('order', len(snippets) + 1),
        "visible": sanitized_data.get('visible', True),
        "createdAt": sanitized_data.get('createdAt', ''),
        "updatedAt": sanitized_data.get('updatedAt', '')
    }

    snippets.append(snippet)
    save_snippets(snippets)

    return jsonify(snippet), 201


@snippets_bp.route('/<snippet_id>', methods=['PUT'])
@admin_required
def update_snippet(snippet_id):
    """Update an existing snippet with input validation"""
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid request body"}), 400

    # Validate and sanitize input
    errors, sanitized_data = validate_snippet_data(data, is_update=True)
    if errors:
        return jsonify({"error": errors[0], "errors": errors}), 400

    snippets = load_snippets()

    snippet_index = next((i for i, s in enumerate(snippets) if s.get('id') == snippet_id), None)
    if snippet_index is None:
        return jsonify({"error": "Snippet not found"}), 404

    # Update only allowed and validated fields (whitelist approach)
    for key, value in sanitized_data.items():
        if key in ALLOWED_SNIPPET_FIELDS:
            snippets[snippet_index][key] = value

    # Ensure ID doesn't change
    snippets[snippet_index]['id'] = snippet_id

    save_snippets(snippets)

    return jsonify(snippets[snippet_index]), 200


@snippets_bp.route('/<snippet_id>', methods=['DELETE'])
@admin_required
def delete_snippet(snippet_id):
    """Delete a snippet"""
    snippets = load_snippets()
    
    snippet_index = next((i for i, s in enumerate(snippets) if s.get('id') == snippet_id), None)
    if snippet_index is None:
        return jsonify({"error": "Snippet not found"}), 404
    
    deleted_snippet = snippets.pop(snippet_index)
    save_snippets(snippets)
    
    return jsonify({"message": "Snippet deleted successfully", "snippet": deleted_snippet}), 200
