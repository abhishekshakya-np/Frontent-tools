// Bootstrap Collection Landing Page JavaScript

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function () {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    const backToTop = document.getElementById('backToTop');

    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
        backToTop.classList.add('show');
    } else {
        navbar.classList.remove('scrolled');
        backToTop.classList.remove('show');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Back to top button
document.getElementById('backToTop').addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Project modal data
const projectData = {
    agency: {
        title: 'Digital Agency Website',
        description: 'A modern business website featuring gradient design, services showcase, testimonials, and contact forms. Built with Bootstrap 5 and custom CSS.',
        features: [
            'Responsive Bootstrap 5 design',
            'Gradient color scheme',
            'Service showcase section',
            'Client testimonials',
            'Contact form integration',
            'Social media integration',
            'Mobile-first approach'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap 5', 'Font Awesome'],
        demoUrl: 'Agency/index.html'
    },
    books4: {
        title: 'Books Platform - Bootstrap 4',
        description: 'Educational platform designed for selling courses and books. Features elegant design, pricing tables, and customer testimonials.',
        features: [
            'Bootstrap 4 framework',
            'Course showcase',
            'Pricing tables',
            'Customer testimonials',
            'Responsive design',
            'Custom dropdown menus',
            'Google Fonts integration'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap 4', 'Font Awesome'],
        demoUrl: 'Books-bootstrap-4-website/src/Index.html'
    },
    books5: {
        title: 'Books Platform - Bootstrap 5',
        description: 'Updated version of the educational platform with Bootstrap 5, improved accessibility, and modern components.',
        features: [
            'Bootstrap 5 framework',
            'Improved accessibility',
            'Modern components',
            'Enhanced responsive design',
            'Better performance',
            'Updated JavaScript',
            'CSS custom properties'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap 5', 'Font Awesome'],
        demoUrl: 'Books-bootstrap-5-website/index.html'
    },
    bootstrap4master: {
        title: 'Portfolio Landing Page',
        description: 'Professional portfolio website with smooth scrolling, project showcase, team section, and blog integration.',
        features: [
            'Smooth scrolling navigation',
            'Portfolio gallery',
            'Team showcase',
            'Blog section',
            'Contact integration',
            'Custom animations',
            'Orange color theme'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap 4', 'jQuery'],
        demoUrl: 'bootstrap4-website-master/index.html'
    },
    nuno: {
        title: 'Nuno Theme Collection',
        description: 'Complete Bootstrap theme suite with multiple versions including Bootstrap 4 and 5 implementations, PHP contact forms, and advanced features.',
        features: [
            'Multiple Bootstrap versions',
            'PHP contact forms',
            'Portfolio gallery with lightbox',
            'Team carousel',
            'Pricing tables',
            'Skills counters',
            'Complete documentation'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap 4 & 5', 'PHP', 'jQuery'],
        demoUrl: 'Nuno/nuno/index.html'
    },
    tours: {
        title: 'Adventure Tours Website',
        description: 'Nature tours website with beautiful imagery, wave animations, responsive design, and booking features.',
        features: [
            'Custom CSS animations',
            'Wave graphics',
            'Parallax scrolling',
            'Activity showcase',
            'Customer testimonials',
            'Responsive design',
            'Ion Icons integration'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Ion Icons', 'Custom CSS'],
        demoUrl: 'outdoors-website/tours/index.html'
    },
    rosa: {
        title: 'The Rosa Restaurant',
        description: 'Elegant restaurant website with smooth animations, menu showcase, reservation system, and sophisticated design.',
        features: [
            'Smooth CSS animations',
            'Menu showcase',
            'Reservation system',
            'ScrollReveal animations',
            'Newsletter signup',
            'Social media integration',
            'Gold accent theme'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'ScrollReveal', 'Font Awesome'],
        demoUrl: 'the-rosa/the-rosa/index.html'
    },
    accordion: {
        title: 'FAQ Accordion Component',
        description: 'A Frontend Mentor challenge featuring a responsive FAQ accordion with smooth animations, Bootstrap 5 integration, and modern design patterns.',
        features: [
            'Bootstrap 5 framework integration',
            'Smooth accordion animations',
            'Frontend Mentor challenge solution',
            'Responsive design for all devices',
            'Modern CSS techniques',
            'Accessibility considerations',
            'Custom SVG icons'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap 5', 'SVG'],
        demoUrl: 'Bootstrap-Accordion-Frontend Mentor/index.html'
    },
    navigation: {
        title: 'Modern Navigation Component',
        description: 'A sleek, responsive navigation bar with smooth animations and mobile overlay menu. Built with vanilla CSS and JavaScript for optimal performance.',
        features: [
            'Modern design with smooth animations',
            'Mobile overlay menu',
            'Vanilla CSS and JavaScript',
            'Responsive design',
            'Professional styling',
            'Touch-friendly interactions',
            'Cross-browser compatibility'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Google Fonts'],
        demoUrl: 'Navigation/index.html'
    },
    dashboard: {
        title: 'Responsive Admin Dashboard',
        description: 'A comprehensive dashboard with light/dark theme toggle, analytics charts, user management, and fully responsive design for modern web applications.',
        features: [
            'Light/dark theme switching',
            'Fully responsive design',
            'Dashboard analytics and charts',
            'User management interface',
            'Modern UI components',
            'Mobile-first approach',
            'Theme persistence'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'CSS Grid', 'Flexbox'],
        demoUrl: 'Responsive Dashboard  LightDark UI/indexB.html'
    },
    qrcode: {
        title: 'QR Code Component - CSS Flexbox',
        description: 'A responsive QR code component built with pure CSS Flexbox, demonstrating modern layout techniques and Frontend Mentor challenge solution with semantic HTML.',
        features: [
            'Pure CSS Flexbox layout',
            'Responsive design for all devices',
            'Frontend Mentor challenge solution',
            'Semantic HTML5 structure',
            'Interactive hover effects',
            'Perfect centering techniques',
            'Modern typography with Google Fonts',
            'Accessibility-friendly design'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'CSS Flexbox', 'Google Fonts'],
        demoUrl: 'CSS-Flexbox-main/index.html'
    },
    aichatbot: {
        title: 'AI Chatbot - Intelligent Assistant',
        description: 'A modern, feature-rich AI chatbot powered by Google\'s Gemini API, built with vanilla HTML, CSS, and JavaScript. Features responsive design, image upload capabilities, emoji picker, and smooth animations.',
        features: [
            'Google Gemini AI integration',
            'Demo mode with pre-configured responses',
            'Real-time conversations with typing indicators',
            'Image upload and analysis capabilities',
            'Full-featured emoji picker',
            'Responsive design with mobile optimization',
            'Smooth animations and transitions',
            'Keyboard navigation support'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Google Gemini API', 'Emoji Mart', 'Material Icons'],
        demoUrl: 'AI-Chatbot-main/index.html'
    },
    nova: {
        title: 'Nova - Professional Bootstrap Business Template',
        description: 'A comprehensive Bootstrap 5 business template featuring multiple pages, modern design, portfolio showcase, blog system, and complete business functionality for professional websites.',
        features: [
            'Bootstrap 5.3.3 framework integration',
            'Multiple page templates (Home, About, Services, Portfolio, Blog, Contact)',
            'Responsive design for all devices',
            'Modern animations with AOS library',
            'Portfolio gallery with filtering',
            'Blog system with detailed posts',
            'Contact forms with validation',
            'Professional business layout',
            'SEO-friendly structure',
            'Clean and modern design',
            'Cross-browser compatibility',
            'Easy customization options'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap 5', 'AOS', 'Swiper', 'GLightbox'],
        demoUrl: 'nova-new-1.0.0/index.html'
    }
};

// Show project modal
function showProjectModal(projectKey) {
    const project = projectData[projectKey];
    if (!project) return;

    const modal = new bootstrap.Modal(document.getElementById('projectModal'));
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    modalTitle.textContent = project.title;

    modalBody.innerHTML = `
        <div class="row">
            <div class="col-md-8">
                <p class="lead">${project.description}</p>
                
                <h6 class="mt-4 mb-3">Key Features:</h6>
                <ul class="list-unstyled">
                    ${project.features.map(feature => `
                        <li class="mb-2">
                            <i class="fas fa-check text-success me-2"></i>
                            ${feature}
                        </li>
                    `).join('')}
                </ul>
                
                <h6 class="mt-4 mb-3">Technologies Used:</h6>
                <div class="d-flex flex-wrap gap-2">
                    ${project.technologies.map(tech => `
                        <span class="badge bg-primary">${tech}</span>
                    `).join('')}
                </div>
            </div>
            <div class="col-md-4">
                <div class="text-center">
                    <h6 class="mb-3">Live Preview</h6>
                    <div class="border rounded p-2 mb-3">
                        <iframe src="${project.demoUrl}" style="width: 100%; height: 200px; border: none; transform-origin: top left;"></iframe>
                    </div>
                    <a href="${project.demoUrl}" target="_blank" class="btn btn-primary btn-sm">
                        <i class="fas fa-external-link-alt me-1"></i>
                        Open Full Demo
                    </a>
                </div>
            </div>
        </div>
    `;

    modal.show();
}

// Snippet data for modals
const snippetData = {
    navigation: {
        title: 'Modern Navigation Bar',
        description: 'A sleek and responsive navigation component with smooth animations, mobile overlay menu, and modern design patterns. Perfect for any website requiring professional navigation.',
        features: [
            'Fully responsive design',
            'Mobile overlay menu',
            'Smooth hover animations',
            'Clean and modern styling',
            'Cross-browser compatibility',
            'Easy to customize',
            'Semantic HTML structure',
            'Accessibility features'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
        demoUrl: 'snippets/Navigation/index.html'
    },
    emailtemplates: {
        title: 'Professional Email Templates',
        description: 'Comprehensive collection of professional email templates for various business needs including verification emails, trial reminders, password reset, and expired trial notifications.',
        features: [
            'Email verification template',
            'Trial reminder notifications',
            'Password reset emails',
            'Trial expired notifications',
            'Mobile-responsive design',
            'Cross-client compatibility',
            'Professional styling',
            'Easy customization'
        ],
        technologies: ['HTML Email', 'CSS Inline Styles', 'Responsive Tables', 'Outlook Compatible'],
        demoUrl: 'snippets/mail web/verify-email.html'
    },
    emailtemplatesv1: {
        title: 'Email Templates V1 - Enhanced',
        description: 'Enhanced version of email templates with improved styling, better compatibility across email clients, and refined user experience for professional communications.',
        features: [
            'Enhanced visual design',
            'Better email client support',
            'Improved mobile rendering',
            'Updated color schemes',
            'Better typography',
            'Enhanced call-to-action buttons',
            'Optimized for dark mode',
            'Accessibility improvements'
        ],
        technologies: ['HTML Email', 'Advanced CSS', 'Media Queries', 'Dark Mode Support'],
        demoUrl: 'snippets/mail web V1/verify-email.html'
    },
    emailtemplatesv2: {
        title: 'Email Templates V2 - Latest',
        description: 'Latest version of email templates featuring modern design patterns, enhanced mobile optimization, and cutting-edge email development techniques for maximum compatibility.',
        features: [
            'Modern design patterns',
            'Advanced mobile optimization',
            'Interactive elements support',
            'Enhanced accessibility',
            'Better performance',
            'Improved loading times',
            'Advanced personalization',
            'Analytics-ready structure'
        ],
        technologies: ['HTML Email', 'Modern CSS', 'Progressive Enhancement', 'Performance Optimized'],
        demoUrl: 'snippets/mail web V2/verify-email.html'
    },
    pdftemplates: {
        title: 'PDF & Invoice Templates',
        description: 'Professional invoice and document templates designed for web-to-PDF generation. Perfect for business invoicing, certificates, and official documents with print-ready styling.',
        features: [
            'Business invoice templates',
            'Certificate templates',
            'Print-optimized styling',
            'PDF generation ready',
            'Professional layouts',
            'Customizable branding',
            'Multiple format options',
            'Legal compliance ready'
        ],
        technologies: ['HTML5', 'Print CSS', 'PDF Generation', 'Business Templates'],
        demoUrl: 'snippets/web pdf/invoice.html'
    },
    reactcomponents: {
        title: 'React Components with SCSS',
        description: 'Modern React components built with TypeScript and SCSS, featuring header components, home sections, and modular architecture for scalable web applications.',
        features: [
            'TypeScript support',
            'SCSS modular styling',
            'Component-based architecture',
            'Reusable UI components',
            'Modern React patterns',
            'Responsive design',
            'Performance optimized',
            'Developer-friendly structure'
        ],
        technologies: ['React', 'TypeScript', 'SCSS', 'Modern JavaScript'],
        demoUrl: 'snippets/nev-code/'
    }
};

// Snippet modal functionality
function showSnippetModal(snippetKey) {
    const snippet = snippetData[snippetKey];
    if (!snippet) return;

    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    modalTitle.textContent = snippet.title;

    const modalContent = `
        <div class="modal-project-details">
            <p class="lead">${snippet.description}</p>
            
            <div class="row mt-4">
                <div class="col-md-6">
                    <h6 class="fw-bold mb-3">Key Features:</h6>
                    <ul class="feature-list">
                        ${snippet.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                <div class="col-md-6">
                    <h6 class="fw-bold mb-3">Technologies Used:</h6>
                    <div class="tech-badges">
                        ${snippet.technologies.map(tech => `<span class="badge bg-primary me-2 mb-2">${tech}</span>`).join('')}
                    </div>
                    
                    <div class="mt-4">
                        <h6 class="fw-bold mb-3">Quick Actions:</h6>
                        <div class="d-flex gap-2 flex-wrap">
                            <a href="${snippet.demoUrl}" target="_blank" class="btn btn-primary">
                                <i class="fas fa-external-link-alt me-1"></i>View Live Demo
                            </a>
                            <button class="btn btn-outline-secondary" onclick="copySnippetPath('${snippet.demoUrl}')">
                                <i class="fas fa-copy me-1"></i>Copy Path
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    modalBody.innerHTML = modalContent;

    const modal = new bootstrap.Modal(document.getElementById('projectModal'));
    modal.show();
}

// Copy snippet path to clipboard
function copySnippetPath(path) {
    navigator.clipboard.writeText(window.location.origin + '/' + path).then(() => {
        // Show success feedback
        const btn = event.target.closest('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check me-1"></i>Copied!';
        btn.classList.add('btn-success');
        btn.classList.remove('btn-outline-secondary');

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.remove('btn-success');
            btn.classList.add('btn-outline-secondary');
        }, 2000);
    });
}

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', function () {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 1000);
    }
});

// Add loading animation
window.addEventListener('load', function () {
    document.body.classList.add('loaded');
});

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');

    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Counter animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }

    updateCounter();
}

// Initialize counters when they come into view
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-item h3, .stat-box h3');
            counters.forEach(counter => {
                const target = parseInt(counter.textContent) || 7;
                if (!isNaN(target)) {
                    animateCounter(counter, target);
                }
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe stat sections
document.querySelectorAll('.hero-stats, .about-stats').forEach(section => {
    counterObserver.observe(section);
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect styles
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Lazy load iframes
const iframeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const iframe = entry.target;
            if (iframe.dataset.src) {
                iframe.src = iframe.dataset.src;
                iframe.removeAttribute('data-src');
            }
            iframeObserver.unobserve(iframe);
        }
    });
});

document.querySelectorAll('iframe[data-src]').forEach(iframe => {
    iframeObserver.observe(iframe);
});

// Add custom cursor effect
document.addEventListener('mousemove', function (e) {
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});

// Console welcome message
console.log(`
🚀 Bootstrap Website Collection
===============================
Welcome to our professional Bootstrap website collection!
Explore 7 amazing projects showcasing modern web development.

📁 Projects included:
• Digital Agency Website
• Educational Platforms (Bootstrap 4 & 5)
• Portfolio Landing Page
• Nuno Theme Collection
• Adventure Tours Website
• The Rosa Restaurant

🔗 GitHub: https://github.com/
📧 Contact: developer@example.com

Happy coding! 💻✨
`);

// Performance monitoring
window.addEventListener('load', function () {
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`⚡ Page loaded in ${loadTime}ms`);
    }
});

// Service Worker registration (if available)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
