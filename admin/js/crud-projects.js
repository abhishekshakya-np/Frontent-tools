// Projects CRUD Operations
let projects = [];
let editingId = null;

// Check auth
if (!checkAuth()) {
    window.location.href = 'login.html';
}

// Load projects
async function loadProjects() {
    try {
        const response = await apiRequest('/projects');
        if (!response) return;
        
        projects = await response.json();
        displayProjects();
    } catch (error) {
        console.error('Error loading projects:', error);
        showAlert('Error loading projects', 'danger');
    }
}

// Display projects
function displayProjects() {
    const tbody = document.getElementById('projectsTableBody');
    const loading = document.getElementById('loading');
    const table = document.getElementById('projectsTable');
    
    if (projects.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center">No projects found</td></tr>';
    } else {
        tbody.innerHTML = projects.map(project => `
            <tr>
                <td><strong>${project.title}</strong></td>
                <td><span class="badge bg-secondary">${project.category || 'N/A'}</span></td>
                <td><span class="badge bg-primary">${project.badge || 'N/A'}</span></td>
                <td><small>${project.url}</small></td>
                <td>${project.order || 1}</td>
                <td>${project.visible ? '<span class="badge bg-success">Yes</span>' : '<span class="badge bg-danger">No</span>'}</td>
                <td>
                    <button class="btn btn-sm btn-primary btn-action" onclick="editProject('${project.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger btn-action" onclick="deleteProject('${project.id}', '${project.title}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }
    
    loading.style.display = 'none';
    table.style.display = 'block';
}

// Show create modal
function showCreateModal() {
    editingId = null;
    document.getElementById('modalTitle').textContent = 'Add New Project';
    document.getElementById('projectForm').reset();
    document.getElementById('projectId').value = '';
    new bootstrap.Modal(document.getElementById('projectModal')).show();
}

// Edit project
function editProject(id) {
    const project = projects.find(p => p.id === id);
    if (!project) return;
    
    editingId = id;
    document.getElementById('modalTitle').textContent = 'Edit Project';
    document.getElementById('projectId').value = project.id;
    document.getElementById('title').value = project.title;
    document.getElementById('description').value = project.description;
    document.getElementById('badge').value = project.badge || '';
    document.getElementById('url').value = project.url;
    document.getElementById('thumbnail').value = project.thumbnail || '';
    document.getElementById('icon').value = project.icon || 'fas fa-folder';
    document.getElementById('category').value = project.category || '';
    document.getElementById('gradient').value = project.gradient || '';
    document.getElementById('tags').value = project.tags ? project.tags.join(', ') : '';
    document.getElementById('order').value = project.order || 1;
    document.getElementById('visible').value = project.visible ? 'true' : 'false';
    
    new bootstrap.Modal(document.getElementById('projectModal')).show();
}

// Save project
async function saveProject() {
    const form = document.getElementById('projectForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    const tags = document.getElementById('tags').value.split(',').map(t => t.trim()).filter(t => t);
    
    const projectData = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        badge: document.getElementById('badge').value,
        url: document.getElementById('url').value,
        thumbnail: document.getElementById('thumbnail').value,
        icon: document.getElementById('icon').value,
        category: document.getElementById('category').value,
        gradient: document.getElementById('gradient').value,
        tags: tags,
        order: parseInt(document.getElementById('order').value) || 1,
        visible: document.getElementById('visible').value === 'true',
        updatedAt: new Date().toISOString()
    };
    
    try {
        let response;
        if (editingId) {
            response = await apiRequest(`/projects/${editingId}`, {
                method: 'PUT',
                body: JSON.stringify(projectData)
            });
        } else {
            projectData.createdAt = new Date().toISOString();
            response = await apiRequest('/projects', {
                method: 'POST',
                body: JSON.stringify(projectData)
            });
        }
        
        if (response && response.ok) {
            bootstrap.Modal.getInstance(document.getElementById('projectModal')).hide();
            showAlert(editingId ? 'Project updated successfully' : 'Project created successfully');
            loadProjects();
        } else {
            const error = await response.json();
            showAlert(error.error || 'Error saving project', 'danger');
        }
    } catch (error) {
        console.error('Error saving project:', error);
        showAlert('Error saving project', 'danger');
    }
}

// Delete project
async function deleteProject(id, title) {
    if (!confirmDelete(title)) return;
    
    try {
        const response = await apiRequest(`/projects/${id}`, {
            method: 'DELETE'
        });
        
        if (response && response.ok) {
            showAlert('Project deleted successfully');
            loadProjects();
        } else {
            showAlert('Error deleting project', 'danger');
        }
    } catch (error) {
        console.error('Error deleting project:', error);
        showAlert('Error deleting project', 'danger');
    }
}

// Load on page load
loadProjects();
