// API Integration for Frontend Collection
// This file handles fetching data from the API and rendering cards dynamically

const API_BASE_URL = 'http://localhost:5000/api';

// Render a single project card
function renderProjectCard(project, index) {
    const tags = project.tags && project.tags.length > 0 
        ? project.tags.map(tag => `<span>${tag}</span>`).join('<span class="dot"></span>')
        : '';
    
    return `
        <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="${(index % 10) * 100}" data-category="${project.category || ''}">
            <div class="project-card">
                <div class="project-preview">
                    ${project.badge ? `<span class="project-badge">${project.badge}</span>` : ''}
                    <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="project-external-link">
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                    ${project.thumbnail ? `<img src="${project.thumbnail}" alt="${project.title}" class="project-thumbnail" loading="lazy">` : ''}
                    <div class="project-logo" style="background: ${project.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};">
                        <i class="${project.icon || 'fas fa-folder'}"></i>
                    </div>
                </div>
                <div class="project-info">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description || ''}</p>
                    ${tags ? `<div class="project-category">${tags}</div>` : ''}
                </div>
            </div>
        </div>
    `;
}

// Render a single website card
function renderWebsiteCard(website, index) {
    const tags = website.tags && website.tags.length > 0 
        ? website.tags.map(tag => `<span>${tag}</span>`).join('<span class="dot"></span>')
        : '';
    
    return `
        <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="${(index % 10) * 100}" data-category="${website.category || ''}">
            <div class="project-card">
                <div class="project-preview">
                    ${website.badge ? `<span class="project-badge">${website.badge}</span>` : ''}
                    <a href="${website.url}" target="_blank" rel="noopener noreferrer" class="project-external-link">
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                    <div class="project-placeholder" style="background: ${website.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};">
                        <div><i class="mb-2 ${website.icon || 'fas fa-globe'} fa-2x"></i>
                            <div>${website.title}</div>
                        </div>
                    </div>
                    <div class="project-logo" style="background: ${website.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};">
                        <i class="${website.icon || 'fas fa-globe'}"></i>
                    </div>
                </div>
                <div class="project-info">
                    <h3 class="project-title">${website.title}</h3>
                    <p class="project-description">${website.description || ''}</p>
                    ${tags ? `<div class="project-category">${tags}</div>` : ''}
                </div>
            </div>
        </div>
    `;
}

// Render a single snippet card
function renderSnippetCard(snippet, index) {
    const tags = snippet.tags && snippet.tags.length > 0 
        ? snippet.tags.map(tag => `<span>${tag}</span>`).join('<span class="dot"></span>')
        : '';
    
    return `
        <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="${(index % 10) * 100}" data-category="${snippet.category || ''}">
            <div class="project-card">
                <div class="project-preview">
                    ${snippet.badge ? `<span class="project-badge">${snippet.badge}</span>` : ''}
                    <a href="${snippet.url}" target="_blank" rel="noopener noreferrer" class="project-external-link">
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                    ${snippet.thumbnail ? `<img src="${snippet.thumbnail}" alt="${snippet.title}" class="project-thumbnail" loading="lazy">` : ''}
                    <div class="project-logo" style="background: ${snippet.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};">
                        <i class="${snippet.icon || 'fas fa-code'}"></i>
                    </div>
                </div>
                <div class="project-info">
                    <h3 class="project-title">${snippet.title}</h3>
                    <p class="project-description">${snippet.description || ''}</p>
                    ${tags ? `<div class="project-category">${tags}</div>` : ''}
                </div>
            </div>
        </div>
    `;
}

// Load projects from API
async function loadProjects() {
    try {
        const response = await fetch(`${API_BASE_URL}/projects`);
        if (!response.ok) throw new Error('Failed to load projects');
        
        const projects = await response.json();
        const container = document.querySelector('#projectsContainer') || 
                         document.querySelector('#projects .row.g-4') ||
                         document.querySelector('section#projects .row.g-4');
        
        if (container) {
            container.innerHTML = projects
                .filter(p => p.visible !== false)
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map((project, index) => renderProjectCard(project, index))
                .join('');
            
            // Reinitialize AOS for new elements
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
            
            // Re-run the title text addition script
            document.querySelectorAll('.project-logo').forEach(function (logo) {
                const projectCard = logo.closest('.project-card');
                if (projectCard) {
                    const projectTitle = projectCard.querySelector('.project-title');
                    if (projectTitle && !logo.querySelector('.project-logo-text')) {
                        const titleText = document.createElement('span');
                        titleText.className = 'project-logo-text';
                        titleText.textContent = projectTitle.textContent.trim();
                        logo.appendChild(titleText);
                    }
                }
            });
        }
    } catch (error) {
        console.error('Error loading projects:', error);
        // Fallback: show error message or keep static content
    }
}

// Load websites from API
async function loadWebsites() {
    try {
        const response = await fetch(`${API_BASE_URL}/websites`);
        if (!response.ok) throw new Error('Failed to load websites');
        
        const websites = await response.json();
        const container = document.querySelector('#websitesContainer') || document.querySelector('#website-projects .row.g-4');
        
        if (container) {
            container.innerHTML = websites
                .filter(w => w.visible !== false)
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map((website, index) => renderWebsiteCard(website, index))
                .join('');
            
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        }
    } catch (error) {
        console.error('Error loading websites:', error);
    }
}

// Load snippets from API
async function loadSnippets() {
    try {
        const response = await fetch(`${API_BASE_URL}/snippets`);
        if (!response.ok) throw new Error('Failed to load snippets');
        
        const snippets = await response.json();
        const container = document.querySelector('#snippetsContainer') || document.querySelector('#snippets .row.g-4');
        
        if (container) {
            container.innerHTML = snippets
                .filter(s => s.visible !== false)
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map((snippet, index) => renderSnippetCard(snippet, index))
                .join('');
            
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
            
            // Re-run the title text addition script
            document.querySelectorAll('.project-logo').forEach(function (logo) {
                const projectCard = logo.closest('.project-card');
                if (projectCard) {
                    const projectTitle = projectCard.querySelector('.project-title');
                    if (projectTitle && !logo.querySelector('.project-logo-text')) {
                        const titleText = document.createElement('span');
                        titleText.className = 'project-logo-text';
                        titleText.textContent = projectTitle.textContent.trim();
                        logo.appendChild(titleText);
                    }
                }
            });
        }
    } catch (error) {
        console.error('Error loading snippets:', error);
    }
}

// Load all data when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Try to load from API, fallback to static if API is not available
    loadProjects().catch(() => console.log('Using static projects'));
    loadWebsites().catch(() => console.log('Using static websites'));
    loadSnippets().catch(() => console.log('Using static snippets'));
});
