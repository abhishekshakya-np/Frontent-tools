"""
API routes for Projects CRUD operations
"""
from flask import Blueprint, jsonify, request
from pathlib import Path
import json
from auth import admin_required
from config import DATABASE_DIR

projects_bp = Blueprint('projects', __name__)
PROJECTS_FILE = DATABASE_DIR / "projects.json"


def load_projects():
    """Load projects from JSON file"""
    if not PROJECTS_FILE.exists():
        return []
    with open(PROJECTS_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)


def save_projects(projects):
    """Save projects to JSON file"""
    PROJECTS_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(PROJECTS_FILE, 'w', encoding='utf-8') as f:
        json.dump(projects, f, indent=2, ensure_ascii=False)


@projects_bp.route('/', methods=['GET'])
def get_projects():
    """Get all projects"""
    projects = load_projects()
    # Filter out invisible projects for public API
    if not request.headers.get('Authorization'):
        projects = [p for p in projects if p.get('visible', True)]
    return jsonify(projects), 200


@projects_bp.route('/<project_id>', methods=['GET'])
def get_project(project_id):
    """Get a single project by ID"""
    projects = load_projects()
    project = next((p for p in projects if p.get('id') == project_id), None)
    if not project:
        return jsonify({"error": "Project not found"}), 404
    return jsonify(project), 200


@projects_bp.route('/', methods=['POST'])
@admin_required
def create_project():
    """Create a new project"""
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['title', 'description', 'url']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing required field: {field}"}), 400
    
    projects = load_projects()
    
    # Generate ID
    import uuid
    project_id = data.get('id', str(uuid.uuid4()))
    
    # Check if ID already exists
    if any(p.get('id') == project_id for p in projects):
        return jsonify({"error": "Project ID already exists"}), 400
    
    # Create project object
    project = {
        "id": project_id,
        "title": data['title'],
        "description": data.get('description', ''),
        "category": data.get('category', ''),
        "badge": data.get('badge', ''),
        "url": data['url'],
        "thumbnail": data.get('thumbnail', ''),
        "icon": data.get('icon', 'fas fa-folder'),
        "gradient": data.get('gradient', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'),
        "tags": data.get('tags', []),
        "order": data.get('order', len(projects) + 1),
        "visible": data.get('visible', True),
        "createdAt": data.get('createdAt', ''),
        "updatedAt": data.get('updatedAt', '')
    }
    
    projects.append(project)
    save_projects(projects)
    
    return jsonify(project), 201


@projects_bp.route('/<project_id>', methods=['PUT'])
@admin_required
def update_project(project_id):
    """Update an existing project"""
    data = request.get_json()
    projects = load_projects()
    
    project_index = next((i for i, p in enumerate(projects) if p.get('id') == project_id), None)
    if project_index is None:
        return jsonify({"error": "Project not found"}), 404
    
    # Update project
    projects[project_index].update(data)
    projects[project_index]['id'] = project_id  # Ensure ID doesn't change
    projects[project_index]['updatedAt'] = ''  # Will be set by frontend
    
    save_projects(projects)
    
    return jsonify(projects[project_index]), 200


@projects_bp.route('/<project_id>', methods=['DELETE'])
@admin_required
def delete_project(project_id):
    """Delete a project"""
    projects = load_projects()
    
    project_index = next((i for i, p in enumerate(projects) if p.get('id') == project_id), None)
    if project_index is None:
        return jsonify({"error": "Project not found"}), 404
    
    deleted_project = projects.pop(project_index)
    save_projects(projects)
    
    return jsonify({"message": "Project deleted successfully", "project": deleted_project}), 200
