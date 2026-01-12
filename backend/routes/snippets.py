"""
API routes for Snippets CRUD operations
"""
from flask import Blueprint, jsonify, request
from pathlib import Path
import json
from auth import admin_required
from config import DATABASE_DIR

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
    """Create a new snippet"""
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['title', 'description', 'url']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing required field: {field}"}), 400
    
    snippets = load_snippets()
    
    # Generate ID
    import uuid
    snippet_id = data.get('id', str(uuid.uuid4()))
    
    # Check if ID already exists
    if any(s.get('id') == snippet_id for s in snippets):
        return jsonify({"error": "Snippet ID already exists"}), 400
    
    # Create snippet object
    snippet = {
        "id": snippet_id,
        "title": data['title'],
        "description": data.get('description', ''),
        "category": data.get('category', ''),
        "badge": data.get('badge', ''),
        "url": data['url'],
        "thumbnail": data.get('thumbnail', ''),
        "icon": data.get('icon', 'fas fa-code'),
        "gradient": data.get('gradient', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'),
        "tags": data.get('tags', []),
        "order": data.get('order', len(snippets) + 1),
        "visible": data.get('visible', True),
        "createdAt": data.get('createdAt', ''),
        "updatedAt": data.get('updatedAt', '')
    }
    
    snippets.append(snippet)
    save_snippets(snippets)
    
    return jsonify(snippet), 201


@snippets_bp.route('/<snippet_id>', methods=['PUT'])
@admin_required
def update_snippet(snippet_id):
    """Update an existing snippet"""
    data = request.get_json()
    snippets = load_snippets()
    
    snippet_index = next((i for i, s in enumerate(snippets) if s.get('id') == snippet_id), None)
    if snippet_index is None:
        return jsonify({"error": "Snippet not found"}), 404
    
    # Update snippet
    snippets[snippet_index].update(data)
    snippets[snippet_index]['id'] = snippet_id  # Ensure ID doesn't change
    
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
