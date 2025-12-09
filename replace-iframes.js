// Script to replace all iframe previews with CSS-based placeholders
// Run this in browser console or as a Node.js script

const projectReplacements = [
    {
        search: '<iframe src="projects/Books-bootstrap-5-website/index.html"',
        replace: '<div class="project-placeholder books5"><div><i class="fas fa-book fa-2x mb-2"></i><div>Books Platform v5</div></div></div>',
        class: 'books5',
        icon: 'fas fa-book',
        name: 'Books Platform v5'
    },
    {
        search: '<iframe src="projects/bootstrap-4-website/index.html"',
        replace: '<div class="project-placeholder bootstrap4master"><div><i class="fas fa-laptop-code fa-2x mb-2"></i><div>Portfolio Landing</div></div></div>',
        class: 'bootstrap4master',
        icon: 'fas fa-laptop-code',
        name: 'Portfolio Landing'
    },
    {
        search: '<iframe src="projects/Nuno/nuno/index.html"',
        replace: '<div class="project-placeholder nuno"><div><i class="fas fa-palette fa-2x mb-2"></i><div>Nuno Theme Collection</div></div></div>',
        class: 'nuno',
        icon: 'fas fa-palette',
        name: 'Nuno Theme Collection'
    },
    {
        search: '<iframe src="projects/outdoors-website/tours/index.html"',
        replace: '<div class="project-placeholder tours"><div><i class="fas fa-mountain fa-2x mb-2"></i><div>Adventure Tours</div></div></div>',
        class: 'tours',
        icon: 'fas fa-mountain',
        name: 'Adventure Tours'
    },
    {
        search: '<iframe src="projects/the-rosa/the-rosa/index.html"',
        replace: '<div class="project-placeholder rosa"><div><i class="fas fa-utensils fa-2x mb-2"></i><div>The Rosa Restaurant</div></div></div>',
        class: 'rosa',
        icon: 'fas fa-utensils',
        name: 'The Rosa Restaurant'
    },
    {
        search: '<iframe src="component-snippets/Bootstrap-Accordion-Frontend Mentor/index.html"',
        replace: '<div class="project-placeholder accordion"><div><i class="fas fa-list fa-2x mb-2"></i><div>FAQ Accordion</div></div></div>',
        class: 'accordion',
        icon: 'fas fa-list',
        name: 'FAQ Accordion'
    },
    {
        search: '<iframe src="component-snippets/Navigation/index.html"',
        replace: '<div class="project-placeholder navigation"><div><i class="fas fa-bars fa-2x mb-2"></i><div>Modern Navigation</div></div></div>',
        class: 'navigation',
        icon: 'fas fa-bars',
        name: 'Modern Navigation'
    },
    {
        search: '<iframe src="component-snippets/responsive-dashboard-lightdark-ui/indexB.html"',
        replace: '<div class="project-placeholder dashboard"><div><i class="fas fa-chart-bar fa-2x mb-2"></i><div>Admin Dashboard</div></div></div>',
        class: 'dashboard',
        icon: 'fas fa-chart-bar',
        name: 'Admin Dashboard'
    },
    {
        search: '<iframe src="component-snippets/CSS-Flexbox-main/index.html"',
        replace: '<div class="project-placeholder qrcode"><div><i class="fas fa-qrcode fa-2x mb-2"></i><div>QR Code Component</div></div></div>',
        class: 'qrcode',
        icon: 'fas fa-qrcode',
        name: 'QR Code Component'
    },
    {
        search: '<iframe src="component-snippets/AI-Chatbot-main/index.html"',
        replace: '<div class="project-placeholder aichatbot"><div><i class="fas fa-robot fa-2x mb-2"></i><div>AI Chatbot Assistant</div></div></div>',
        class: 'aichatbot',
        icon: 'fas fa-robot',
        name: 'AI Chatbot Assistant'
    }
];

console.log('Project replacement patterns generated. Use these to replace iframes with CSS placeholders.');
console.log('Each replacement includes a unique gradient background and appropriate icon.');

// Generate replacement HTML for remaining projects
const remainingProjects = [
    { name: 'Nova Business Template', class: 'nova', icon: 'fas fa-briefcase' },
    { name: 'Wedding Template', class: 'wedding', icon: 'fas fa-heart' },
    { name: 'Portfolio WebView', class: 'webview', icon: 'fas fa-user-tie' },
    { name: 'CleverCow Business', class: 'clevercow', icon: 'fas fa-leaf' },
    { name: 'CleverCow Bootstrap', class: 'clevercowbootstrap', icon: 'fab fa-bootstrap' },
    { name: 'CleverCow SCSS', class: 'clevercowscss', icon: 'fab fa-sass' },
    { name: "Mind's Mirror", class: 'mindsmirror', icon: 'fas fa-brain' },
    { name: 'Magz Magazine', class: 'magz', icon: 'fas fa-newspaper' },
    { name: 'Movie Search Website', class: 'moviewebsite', icon: 'fas fa-film' },
    { name: 'CleverCow Production', class: 'clevercowprod', icon: 'fas fa-cogs' },
    { name: 'SKY - Sewa Ko Yatra', class: 'skywebsite', icon: 'fas fa-plane' },
    { name: 'MrMarket NEPSE', class: 'mrmarket', icon: 'fas fa-chart-line' },
    { name: 'Muktinath Krishi', class: 'muktinath', icon: 'fas fa-seedling' }
];

remainingProjects.forEach(project => {
    console.log(`
<div class="project-placeholder ${project.class}">
    <div>
        <i class="${project.icon} fa-2x mb-2"></i>
        <div>${project.name}</div>
    </div>
</div>`);
});
