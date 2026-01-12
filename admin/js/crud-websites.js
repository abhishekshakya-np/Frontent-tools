// Websites CRUD Operations (similar to projects)
let websites = [];
let editingId = null;

if (!checkAuth()) {
    window.location.href = 'login.html';
}

async function loadWebsites() {
    try {
        const response = await apiRequest('/websites');
        if (!response) return;
        websites = await response.json();
        displayWebsites();
    } catch (error) {
        console.error('Error loading websites:', error);
        showAlert('Error loading websites', 'danger');
    }
}

function displayWebsites() {
    const tbody = document.getElementById('websitesTableBody');
    const loading = document.getElementById('loading');
    const table = document.getElementById('websitesTable');
    
    if (websites.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center">No websites found</td></tr>';
    } else {
        tbody.innerHTML = websites.map(website => `
            <tr>
                <td><strong>${website.title}</strong></td>
                <td><span class="badge bg-secondary">${website.category || 'N/A'}</span></td>
                <td><span class="badge bg-success">${website.badge || 'N/A'}</span></td>
                <td><small>${website.url}</small></td>
                <td>${website.order || 1}</td>
                <td>${website.visible ? '<span class="badge bg-success">Yes</span>' : '<span class="badge bg-danger">No</span>'}</td>
                <td>
                    <button class="btn btn-sm btn-primary btn-action" onclick="editWebsite('${website.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger btn-action" onclick="deleteWebsite('${website.id}', '${website.title}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }
    
    loading.style.display = 'none';
    table.style.display = 'block';
}

function showCreateModal() {
    editingId = null;
    document.getElementById('modalTitle').textContent = 'Add New Website';
    document.getElementById('websiteForm').reset();
    document.getElementById('websiteId').value = '';
    new bootstrap.Modal(document.getElementById('websiteModal')).show();
}

function editWebsite(id) {
    const website = websites.find(w => w.id === id);
    if (!website) return;
    
    editingId = id;
    document.getElementById('modalTitle').textContent = 'Edit Website';
    document.getElementById('websiteId').value = website.id;
    document.getElementById('title').value = website.title;
    document.getElementById('description').value = website.description;
    document.getElementById('badge').value = website.badge || '';
    document.getElementById('url').value = website.url;
    document.getElementById('icon').value = website.icon || 'fas fa-globe';
    document.getElementById('category').value = website.category || '';
    document.getElementById('gradient').value = website.gradient || '';
    document.getElementById('tags').value = website.tags ? website.tags.join(', ') : '';
    document.getElementById('order').value = website.order || 1;
    document.getElementById('visible').value = website.visible ? 'true' : 'false';
    
    new bootstrap.Modal(document.getElementById('websiteModal')).show();
}

async function saveWebsite() {
    const form = document.getElementById('websiteForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    const tags = document.getElementById('tags').value.split(',').map(t => t.trim()).filter(t => t);
    
    const websiteData = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        badge: document.getElementById('badge').value,
        url: document.getElementById('url').value,
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
            response = await apiRequest(`/websites/${editingId}`, {
                method: 'PUT',
                body: JSON.stringify(websiteData)
            });
        } else {
            websiteData.createdAt = new Date().toISOString();
            response = await apiRequest('/websites', {
                method: 'POST',
                body: JSON.stringify(websiteData)
            });
        }
        
        if (response && response.ok) {
            bootstrap.Modal.getInstance(document.getElementById('websiteModal')).hide();
            showAlert(editingId ? 'Website updated successfully' : 'Website created successfully');
            loadWebsites();
        } else {
            const error = await response.json();
            showAlert(error.error || 'Error saving website', 'danger');
        }
    } catch (error) {
        console.error('Error saving website:', error);
        showAlert('Error saving website', 'danger');
    }
}

async function deleteWebsite(id, title) {
    if (!confirmDelete(title)) return;
    
    try {
        const response = await apiRequest(`/websites/${id}`, {
            method: 'DELETE'
        });
        
        if (response && response.ok) {
            showAlert('Website deleted successfully');
            loadWebsites();
        } else {
            showAlert('Error deleting website', 'danger');
        }
    } catch (error) {
        console.error('Error deleting website:', error);
        showAlert('Error deleting website', 'danger');
    }
}

loadWebsites();
