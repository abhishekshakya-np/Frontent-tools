// Snippets CRUD Operations (similar to projects)
let snippets = [];
let editingId = null;

if (!checkAuth()) {
    window.location.href = 'login.html';
}

async function loadSnippets() {
    try {
        const response = await apiRequest('/snippets');
        if (!response) return;
        snippets = await response.json();
        displaySnippets();
    } catch (error) {
        console.error('Error loading snippets:', error);
        showAlert('Error loading snippets', 'danger');
    }
}

function displaySnippets() {
    const tbody = document.getElementById('snippetsTableBody');
    const loading = document.getElementById('loading');
    const table = document.getElementById('snippetsTable');
    
    if (snippets.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center">No snippets found</td></tr>';
    } else {
        tbody.innerHTML = snippets.map(snippet => `
            <tr>
                <td><strong>${snippet.title}</strong></td>
                <td><span class="badge bg-secondary">${snippet.category || 'N/A'}</span></td>
                <td><span class="badge bg-info">${snippet.badge || 'N/A'}</span></td>
                <td><small>${snippet.url}</small></td>
                <td>${snippet.order || 1}</td>
                <td>${snippet.visible ? '<span class="badge bg-success">Yes</span>' : '<span class="badge bg-danger">No</span>'}</td>
                <td>
                    <button class="btn btn-sm btn-primary btn-action" onclick="editSnippet('${snippet.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger btn-action" onclick="deleteSnippet('${snippet.id}', '${snippet.title}')">
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
    document.getElementById('modalTitle').textContent = 'Add New Snippet';
    document.getElementById('snippetForm').reset();
    document.getElementById('snippetId').value = '';
    new bootstrap.Modal(document.getElementById('snippetModal')).show();
}

function editSnippet(id) {
    const snippet = snippets.find(s => s.id === id);
    if (!snippet) return;
    
    editingId = id;
    document.getElementById('modalTitle').textContent = 'Edit Snippet';
    document.getElementById('snippetId').value = snippet.id;
    document.getElementById('title').value = snippet.title;
    document.getElementById('description').value = snippet.description;
    document.getElementById('badge').value = snippet.badge || '';
    document.getElementById('url').value = snippet.url;
    document.getElementById('thumbnail').value = snippet.thumbnail || '';
    document.getElementById('icon').value = snippet.icon || 'fas fa-code';
    document.getElementById('category').value = snippet.category || '';
    document.getElementById('gradient').value = snippet.gradient || '';
    document.getElementById('tags').value = snippet.tags ? snippet.tags.join(', ') : '';
    document.getElementById('order').value = snippet.order || 1;
    document.getElementById('visible').value = snippet.visible ? 'true' : 'false';
    
    new bootstrap.Modal(document.getElementById('snippetModal')).show();
}

async function saveSnippet() {
    const form = document.getElementById('snippetForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    const tags = document.getElementById('tags').value.split(',').map(t => t.trim()).filter(t => t);
    
    const snippetData = {
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
            response = await apiRequest(`/snippets/${editingId}`, {
                method: 'PUT',
                body: JSON.stringify(snippetData)
            });
        } else {
            snippetData.createdAt = new Date().toISOString();
            response = await apiRequest('/snippets', {
                method: 'POST',
                body: JSON.stringify(snippetData)
            });
        }
        
        if (response && response.ok) {
            bootstrap.Modal.getInstance(document.getElementById('snippetModal')).hide();
            showAlert(editingId ? 'Snippet updated successfully' : 'Snippet created successfully');
            loadSnippets();
        } else {
            const error = await response.json();
            showAlert(error.error || 'Error saving snippet', 'danger');
        }
    } catch (error) {
        console.error('Error saving snippet:', error);
        showAlert('Error saving snippet', 'danger');
    }
}

async function deleteSnippet(id, title) {
    if (!confirmDelete(title)) return;
    
    try {
        const response = await apiRequest(`/snippets/${id}`, {
            method: 'DELETE'
        });
        
        if (response && response.ok) {
            showAlert('Snippet deleted successfully');
            loadSnippets();
        } else {
            showAlert('Error deleting snippet', 'danger');
        }
    } catch (error) {
        console.error('Error deleting snippet:', error);
        showAlert('Error deleting snippet', 'danger');
    }
}

loadSnippets();
