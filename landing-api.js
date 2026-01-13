// API Integration for Frontend Collection
// This file handles fetching data from the API and rendering cards dynamically

// Configuration - API URL can be overridden via global variable or defaults to relative path
const API_BASE_URL = window.FRONTEND_COLLECTION_API_URL ||
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:5001/api'
        : '/api');

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

/**
 * Generic function to load data from API and render cards
 * @param {string} endpoint - API endpoint (projects, websites, snippets)
 * @param {string[]} containerSelectors - Array of CSS selectors to find the container
 * @param {Function} renderFunction - Function to render individual cards
 * @param {boolean} addLogoText - Whether to add logo text overlay
 */
async function loadData(endpoint, containerSelectors, renderFunction, addLogoText = false) {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`);
        if (!response.ok) {
            throw new Error(`Failed to load ${endpoint}: ${response.status}`);
        }

        const data = await response.json();

        // Find container using multiple selectors
        let container = null;
        for (const selector of containerSelectors) {
            container = document.querySelector(selector);
            if (container) break;
        }

        if (!container) {
            console.warn(`Container not found for ${endpoint}`);
            return;
        }

        // Filter visible items, sort by order, and render
        const html = data
            .filter(item => item.visible !== false)
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map((item, index) => renderFunction(item, index))
            .join('');

        container.innerHTML = html;

        // Remove any existing logo text overlays
        container.querySelectorAll('.project-logo-text, .project-title-text').forEach(el => el.remove());

        // Reinitialize AOS for new elements
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }

        // Logo text overlay removed per user request
    } catch (error) {
        console.error(`Error loading ${endpoint}:`, error);
        // Keep static content as fallback
    }
}

// Logo text overlay function removed per user request

// Load projects from API
async function loadProjects() {
    await loadData(
        'projects',
        ['#projectsContainer', '#projects .row.g-4', 'section#projects .row.g-4'],
        renderProjectCard,
        false  // Logo text overlay disabled
    );
}

// Load websites from API
async function loadWebsites() {
    await loadData(
        'websites',
        ['#websitesContainer', '#website-projects .row.g-4'],
        renderWebsiteCard,
        false
    );
}

// Load snippets from API
async function loadSnippets() {
    await loadData(
        'snippets',
        ['#snippetsContainer', '#snippets .row.g-4'],
        renderSnippetCard,
        false  // Logo text overlay disabled
    );
}

// Load all data when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Try to load from API, fallback to static if API is not available
    loadProjects().catch(() => console.log('Using static projects'));
    loadWebsites().catch(() => console.log('Using static websites'));
    loadSnippets().catch(() => console.log('Using static snippets'));
});
