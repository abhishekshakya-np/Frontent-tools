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

// Smooth scroll for in-page navigation links (skip empty "#")
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        const offsetTop = target.offsetTop - 80;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        window.scrollTo({
            top: offsetTop,
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });

        // Ensure keyboard focus moves to the target (especially for skip link)
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
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
        demoUrl: 'projects/agency/index.html'
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
        demoUrl: 'projects/books-bootstrap-4/src/Index.html'
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
        demoUrl: 'projects/books-bootstrap-5/index.html'
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
        demoUrl: 'projects/bootstrap-4-website/index.html'
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
        demoUrl: 'projects/nuno/nuno/index.html'
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
        demoUrl: 'projects/outdoors-website/tours/index.html'
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
        demoUrl: 'projects/the-rosa/the-rosa/index.html'
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
        demoUrl: 'component-snippets/bootstrap-accordion/index.html'
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
        demoUrl: 'component-snippets/navigation/index.html'
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
        demoUrl: 'component-snippets/responsive-dashboard-lightdark-ui/indexB.html'
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
        demoUrl: 'component-snippets/css-flexbox/index.html'
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
        demoUrl: 'component-snippets/ai-chatbot/index.html'
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
        demoUrl: 'projects/nova/index.html'
    },
    wedding: {
        title: 'Wedding Template - Elegant Event Website',
        description: 'An elegant wedding website template featuring RSVP functionality, photo gallery, event timeline, and romantic design elements perfect for couples celebrating their special day.',
        features: [
            'Elegant romantic design',
            'RSVP form functionality',
            'Photo gallery with lightbox',
            'Event timeline section',
            'Countdown timer',
            'Location maps integration',
            'Guest book section',
            'Responsive mobile design',
            'Beautiful typography',
            'Social media sharing'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Font Awesome'],
        demoUrl: 'projects/bootstrap-wedding-template/index.html'
    },
    webview: {
        title: 'Portfolio WebView - Professional Showcase',
        description: 'A comprehensive portfolio template designed for professionals to showcase their work, skills, and experience with a clean, modern design and interactive elements.',
        features: [
            'Professional portfolio layout',
            'Project gallery with filtering',
            'Skills showcase section',
            'Experience timeline',
            'Contact form integration',
            'Responsive design',
            'Smooth animations',
            'Social media links',
            'Clean typography',
            'Easy customization'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Portfolio Design'],
        demoUrl: 'portfolio/web-view/webView/index.html'
    },
    clevercow: {
        title: 'CleverCow - Sustainability Business Platform',
        description: 'An innovative sustainability platform focused on carbon footprint tracking and eco-friendly business solutions. Features modern design with environmental consciousness at its core.',
        features: [
            'Carbon footprint tracking',
            'Eco-friendly solutions showcase',
            'Sustainability metrics dashboard',
            'Business environmental impact tools',
            'Green technology features',
            'Responsive design',
            'Modern UI components',
            'Environmental certifications',
            'Sustainability reports',
            'Corporate eco-solutions'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Sustainability Tech'],
        demoUrl: 'office-work/clevercow/index.html'
    },
    clevercowbootstrap: {
        title: 'CleverCow Bootstrap - Sustainability Platform',
        description: 'Enhanced Bootstrap 5 version of CleverCow sustainability platform with modern components, improved responsive design, and advanced eco-tracking features for businesses.',
        features: [
            'Bootstrap 5.3 framework integration',
            'Modern responsive design',
            'Carbon footprint tracking dashboard',
            'Sustainability metrics visualization',
            'Corporate eco-friendly solutions',
            'Enhanced user interface components',
            'Mobile-optimized experience',
            'Interactive sustainability tools',
            'Business analytics integration',
            'Green technology showcase',
            'Environmental impact calculator',
            'Eco-certification tracking'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap 5', 'Sustainability Tech', 'Analytics'],
        demoUrl: 'office-work/clevercow-bootstrap/index.html'
    },
    clevercowscss: {
        title: 'CleverCow SCSS - Advanced Sustainability Platform',
        description: 'Advanced SCSS version of CleverCow with modular architecture, custom build system, and sophisticated styling for enterprise-level sustainability management.',
        features: [
            'Modular SCSS architecture',
            'Custom build system with Node.js',
            'Advanced component library',
            'Scalable CSS methodology',
            'Performance-optimized stylesheets',
            'Custom design system',
            'Advanced sustainability metrics',
            'Enterprise-grade features',
            'Responsive grid system',
            'Custom animations and transitions',
            'Theme customization system',
            'Development workflow optimization'
        ],
        technologies: ['HTML5', 'SCSS', 'JavaScript', 'Node.js', 'Build Tools', 'Custom Framework'],
        demoUrl: 'office-work/clevercow-scss/index.html'
    },
    mindsmirror: {
        title: 'Mind\'s Mirror - Mental Health Tracking Platform',
        description: 'A comprehensive mental health tracking and goal management system specifically designed for individuals managing bipolar disorder and other mental health conditions with modern React architecture.',
        features: [
            'Mental health tracking dashboard',
            'Bipolar disorder management tools',
            'Goal setting and progress tracking',
            'Mood monitoring and analytics',
            'Medication reminder system',
            'Wellness goal management',
            'Data visualization charts',
            'Progress reporting features',
            'Healthcare provider integration',
            'Privacy-focused design',
            'Mobile-responsive interface',
            'Accessibility-compliant UI',
            'Real-time health insights',
            'Personalized wellness recommendations'
        ],
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Healthcare Tech', 'Mental Health'],
        demoUrl: 'office-work/minds-mirror-mental-health-tracking-landing-page/static-demo.html'
    },
    magz: {
        title: 'Magz - Professional Magazine & Blog Template',
        description: 'A comprehensive HTML5 & CSS3 magazine template based on Bootstrap 3, featuring 14+ pages, unlimited color skins, and advanced functionality for modern publishing platforms.',
        features: [
            'Fully responsive design for all devices',
            '14+ complete pages (Home, Article, Category, Search, etc.)',
            'Bootstrap 3 framework integration',
            'Unlimited color skins and themes',
            'Working contact form with PHPMailer',
            '20+ social media buttons',
            'Advanced search functionality',
            'User authentication system (Login/Register)',
            'Error pages (403, 404, 500, 503)',
            'SASS/SCSS support for easy customization',
            'Ion Icons font integration',
            'Google Fonts integration',
            'jQuery plugins (Owl Carousel, Magnific Popup)',
            'Sweet Alert notifications',
            'Cross-browser compatibility',
            'SEO-optimized structure',
            'Professional documentation included',
            'Magazine-style layout design'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap 3', 'SCSS', 'PHP', 'jQuery', 'Ion Icons'],
        demoUrl: 'projects/magz/index.html'
    },
    moviewebsite: {
        title: 'Movie Search Website - React Application',
        description: 'A modern React-based movie search website that demonstrates advanced React concepts including Context API, custom hooks, debounced search, and API integration with the OMDB database.',
        features: [
            'Real-time movie search with OMDB API',
            'Debounced search input for performance',
            'React Context API for state management',
            'React Router for navigation',
            'Custom hooks for data fetching',
            'Responsive grid layout',
            'Loading states and error handling',
            'Movie details with poster images',
            'Clean and modern UI design',
            'Performance optimized search'
        ],
        technologies: ['React 18', 'React Router', 'Context API', 'OMDB API', 'Custom Hooks', 'Debounced Search'],
        demoUrl: 'projects/movie-website/static-demo.html'
    },
    clevercowprod: {
        title: 'CleverCow Production - Sustainability Website',
        description: 'A professional sustainability-focused website built with modern development tools including Bootstrap 5, Sass, and Gulp 4 build system. This production-ready version showcases optimized assets and clean, modular code architecture.',
        features: [
            'Bootstrap 5.2.3 with full customization support',
            'Sass/SCSS integration for maintainable styles',
            'Gulp 4 automated build system',
            'Minified and optimized production assets',
            'BrowserSync integration for development',
            'Bootstrap Icons (1,800+ icons included)',
            'Responsive design with mobile-first approach',
            'SEO-optimized meta tags and structure',
            'Clean, semantic HTML markup',
            'Environmental sustainability focus'
        ],
        technologies: ['HTML5', 'Bootstrap 5', 'Sass/SCSS', 'Gulp 4', 'JavaScript', 'Bootstrap Icons'],
        demoUrl: 'office-work/clevercow-production/index.html'
    },
    skywebsite: {
        title: 'SKY - Sewa Ko Yatra Service Website',
        description: 'A modern, professional service-oriented landing page built with clean HTML, CSS, and JavaScript. Features smooth animations, responsive design, and professional branding for service-based businesses.',
        features: [
            'Responsive mobile-first design',
            'Smooth scroll animations with ScrollReveal',
            'Professional service-oriented layout',
            'Modern CSS styling with custom properties',
            'Optimized image assets (SVG and WebP)',
            'Clean semantic HTML structure',
            'Cross-browser compatibility',
            'Fast loading performance',
            'Professional branding integration',
            'Service showcase sections'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'ScrollReveal', 'Responsive Design', 'SVG Graphics'],
        demoUrl: 'office-work/sky-website/index.html'
    },
    mrmarket: {
        title: 'MrMarket NEPSE - Trading Platform Website',
        description: 'A comprehensive trading platform website for NEPSE (Nepal Stock Exchange) with modern UI design, built using SASS and featuring trading automation tools, pricing plans, and educational content.',
        features: [
            'Modern responsive design with Outfit font family',
            'Professional trading platform showcase',
            'Multi-platform compatibility section',
            'Comprehensive feature showcase with SVG icons',
            'Three-tier pricing structure',
            'Interactive contact form with validation',
            'Smooth scrolling navigation',
            'Mobile-responsive hamburger menu',
            'Brand-consistent color scheme (#0172CE)',
            'Trading automation feature highlights'
        ],
        technologies: ['HTML5', 'SASS/SCSS', 'JavaScript', 'Responsive Design', 'Form Validation', 'SVG Icons'],
        demoUrl: 'office-work/mr-market/index.html'
    },
    muktinath: {
        title: 'Muktinath Krishi - Agricultural Business Website',
        description: 'A comprehensive agricultural business website built with Bootstrap framework, featuring modern design, responsive layout, and extensive content management for agricultural services and products.',
        features: [
            'Bootstrap-based responsive framework',
            'Multi-page website structure',
            'Professional agricultural branding',
            'Owl Carousel for image galleries',
            'FontAwesome icon integration',
            'Animated CSS effects',
            'Contact and subsidiary pages',
            'Blog and news sections',
            'Mobile-optimized navigation',
            'Agricultural service showcase'
        ],
        technologies: ['HTML5', 'Bootstrap', 'CSS3', 'JavaScript', 'Owl Carousel', 'FontAwesome', 'Animate.css'],
        demoUrl: 'office-work/muktinath/muktinath/public/index.html'
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
        demoUrl: 'component-snippets/navigation/index.html'
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
        demoUrl: 'email-templates/mail-web/verify-email.html'
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
        demoUrl: 'email-templates/mail-web-v1/verify-email.html'
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
        demoUrl: 'email-templates/mail-web-v2/verify-email.html'
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
        demoUrl: 'email-templates/web-pdf/invoice.html'
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
        demoUrl: '#' // Placeholder - folder not found
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

// Typing effect for hero title (HTML-aware)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    // Parse HTML to separate text and tags
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    const textContent = element.textContent || element.innerText;

    // For complex HTML, just show it immediately with fade-in effect
    if (text.includes('<span')) {
        element.style.opacity = '0';
        element.innerHTML = text;

        // Fade in effect
        let opacity = 0;
        const fadeIn = setInterval(() => {
            opacity += 0.05;
            element.style.opacity = opacity;
            if (opacity >= 1) {
                clearInterval(fadeIn);
                element.style.opacity = '1';
            }
        }, 30);
        return;
    }

    // Simple text typing effect for plain text
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
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const allowTypewriter = heroTitle && heroTitle.dataset.allowTypewriter === 'true';

    // Keep the main heading instantly readable; opt-in only via data-allow-typewriter
    if (!heroTitle || prefersReducedMotion || !allowTypewriter) return;

    const originalText = heroTitle.innerHTML;
    if (!originalText.trim()) return;

    setTimeout(() => {
        typeWriter(heroTitle, originalText, 50);
    }, 500);
});

// Add loading animation
window.addEventListener('load', function () {
    document.body.classList.add('loaded');
});

// Project card hover effects and click handlers
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });

    // Make entire card clickable - find the external link and open it
    card.addEventListener('click', function (e) {
        // Don't trigger if clicking on the external link button itself (it has its own handler)
        if (e.target.closest('.project-external-link')) {
            return;
        }

        // Find the external link in this card
        const externalLink = this.querySelector('.project-external-link');
        if (externalLink && externalLink.href) {
            window.open(externalLink.href, externalLink.target || '_blank');
        }
    });

    // Add cursor pointer to indicate clickability
    card.style.cursor = 'pointer';
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
function animateCounter(element, duration = 2000) {
    const originalText = element.dataset.originalText || element.textContent.trim();
    element.dataset.originalText = originalText;

    const match = originalText.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!match) {
        element.textContent = originalText;
        return;
    }

    const target = Number(match[1]);
    const suffix = match[2] || '';
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (Number.isNaN(target) || prefersReducedMotion) {
        element.textContent = originalText;
        return;
    }

    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = `${Math.floor(start)}${suffix}`;
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = `${target}${suffix}`;
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
                animateCounter(counter);
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

// Performance monitoring (using modern Performance Observer API)
if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.entryType === 'navigation') {
                console.log(`⚡ Page loaded in ${Math.round(entry.loadEventEnd)}ms`);
            }
        }
    });
    observer.observe({ entryTypes: ['navigation'] });
}

// Category filtering functionality
let currentFilter = 'all';

function filterByCategory(category, origin = 'projects') {
    currentFilter = category;

    // Update active state of category buttons
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(btn => {
        const filterValue = btn.getAttribute('data-filter');
        if (filterValue === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Also update old filter buttons if they exist
    const oldFilterButtons = document.querySelectorAll('.filter-btn');
    oldFilterButtons.forEach(btn => {
        const filterValue = btn.getAttribute('data-filter');
        if (filterValue === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update snippet category tiles
    const snippetCategoryItems = document.querySelectorAll('.snippet-categories .category-item[aria-pressed]');
    snippetCategoryItems.forEach(item => {
        const filterValue = item.getAttribute('data-category');
        const isActive = filterValue === category;
        item.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        item.classList.toggle('active', isActive);
    });

    // Show loading state
    showFilteringLoader();

    // Get all project and snippet cards
    const projectCards = document.querySelectorAll('#projects .col-lg-4, #projects .col-md-6');
    const snippetCards = document.querySelectorAll('#snippets .col-lg-4, #snippets .col-md-6');
    const allCards = [...projectCards, ...snippetCards];

    // Add filter controls if not exists (for backward compatibility)
    addFilterControls();

    // Filter cards with animation
    setTimeout(() => {
        allCards.forEach((card, index) => {
            const cardCategories = card.dataset.category || '';
            const shouldShow = category === 'all' || cardCategories.includes(category);

            if (shouldShow) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });

        // Update section headers
        updateSectionHeaders(category);

        // Hide loading state
        hideFilteringLoader();

        // Scroll to the relevant section
        const scrollTarget = origin === 'snippets'
            ? document.querySelector('#snippets')
            : document.querySelector('#projects');
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (scrollTarget) {
            scrollTarget.scrollIntoView({
                behavior: prefersReducedMotion ? 'auto' : 'smooth',
                block: 'start'
            });
        }

        // Update URL without page reload
        const url = new URL(window.location);
        if (category === 'all') {
            url.searchParams.delete('category');
        } else {
            url.searchParams.set('category', category);
        }
        window.history.pushState({}, '', url);

    }, 300);
}

function addFilterControls() {
    // Check if filter controls already exist
    if (document.querySelector('.filter-controls')) return;

    const projectsSection = document.querySelector('#projects .container');
    const filterControls = document.createElement('div');
    filterControls.className = 'mb-4 filter-controls';
    filterControls.innerHTML = `
        <div class="d-flex justify-content-center align-items-center flex-wrap gap-2">
            <button class="btn btn-outline-primary btn-sm filter-btn ${currentFilter === 'all' ? 'active' : ''}" 
                    onclick="filterByCategory('all')" data-filter="all">
                <i class="fas fa-th me-1"></i>All Projects
            </button>
            <button class="btn btn-outline-primary btn-sm filter-btn ${currentFilter === 'ui-components' ? 'active' : ''}" 
                    onclick="filterByCategory('ui-components')" data-filter="ui-components">
                <i class="fas fa-puzzle-piece me-1"></i>UI Components
            </button>
            <button class="btn btn-outline-primary btn-sm filter-btn ${currentFilter === 'email-templates' ? 'active' : ''}" 
                    onclick="filterByCategory('email-templates')" data-filter="email-templates">
                <i class="fas fa-envelope me-1"></i>Email Templates
            </button>
            <button class="btn btn-outline-primary btn-sm filter-btn ${currentFilter === 'pdf-templates' ? 'active' : ''}" 
                    onclick="filterByCategory('pdf-templates')" data-filter="pdf-templates">
                <i class="fas fa-file-pdf me-1"></i>PDF Templates
            </button>
            <button class="btn btn-outline-primary btn-sm filter-btn ${currentFilter === 'code-utilities' ? 'active' : ''}" 
                    onclick="filterByCategory('code-utilities')" data-filter="code-utilities">
                <i class="fas fa-code me-1"></i>Code Utilities
            </button>
            <button class="btn btn-outline-primary btn-sm filter-btn ${currentFilter === 'office-work' ? 'active' : ''}" 
                    onclick="filterByCategory('office-work')" data-filter="office-work">
                <i class="fas fa-briefcase me-1"></i>Office Work
            </button>
            <button class="btn btn-outline-primary btn-sm filter-btn ${currentFilter === 'portfolio' ? 'active' : ''}" 
                    onclick="filterByCategory('portfolio')" data-filter="portfolio">
                <i class="fas fa-user-tie me-1"></i>Portfolio
            </button>
            <button class="btn btn-outline-primary btn-sm filter-btn ${currentFilter === 'healthcare' ? 'active' : ''}" 
                    onclick="filterByCategory('healthcare')" data-filter="healthcare">
                <i class="fas fa-heart me-1"></i>Healthcare
            </button>
            <button class="btn btn-outline-primary btn-sm filter-btn ${currentFilter === 'react' ? 'active' : ''}" 
                    onclick="filterByCategory('react')" data-filter="react">
                <i class="fab fa-react me-1"></i>React
            </button>
            <button class="btn btn-outline-primary btn-sm filter-btn ${currentFilter === 'magazine' ? 'active' : ''}" 
                    onclick="filterByCategory('magazine')" data-filter="magazine">
                <i class="fas fa-newspaper me-1"></i>Magazine
            </button>
            <button class="btn btn-outline-primary btn-sm filter-btn ${currentFilter === 'blog' ? 'active' : ''}" 
                    onclick="filterByCategory('blog')" data-filter="blog">
                <i class="fas fa-blog me-1"></i>Blog
            </button>
            <button class="btn btn-outline-primary btn-sm filter-btn ${currentFilter === 'entertainment' ? 'active' : ''}" 
                    onclick="filterByCategory('entertainment')" data-filter="entertainment">
                <i class="fas fa-film me-1"></i>Entertainment
            </button>
            <button class="btn btn-outline-primary btn-sm filter-btn ${currentFilter === 'api' ? 'active' : ''}" 
                    onclick="filterByCategory('api')" data-filter="api">
                <i class="fas fa-plug me-1"></i>API
            </button>
            <button class="btn btn-outline-primary btn-sm filter-btn ${currentFilter === 'sustainability' ? 'active' : ''}" 
                    onclick="filterByCategory('sustainability')" data-filter="sustainability">
                <i class="fas fa-leaf me-1"></i>Sustainability
            </button>
            <button class="btn btn-outline-primary btn-sm filter-btn ${currentFilter === 'service' ? 'active' : ''}" 
                    onclick="filterByCategory('service')" data-filter="service">
                <i class="fas fa-concierge-bell me-1"></i>Service
            </button>
            <button class="btn btn-outline-primary btn-sm filter-btn ${currentFilter === 'trading' ? 'active' : ''}" 
                    onclick="filterByCategory('trading')" data-filter="trading">
                <i class="fas fa-chart-line me-1"></i>Trading
            </button>
            <button class="btn btn-outline-primary btn-sm filter-btn ${currentFilter === 'agriculture' ? 'active' : ''}" 
                    onclick="filterByCategory('agriculture')" data-filter="agriculture">
                <i class="fas fa-seedling me-1"></i>Agriculture
            </button>
        </div>
    `;

    const sectionHeader = projectsSection.querySelector('.section-header');
    sectionHeader.insertAdjacentElement('afterend', filterControls);
}

function updateSectionHeaders(category) {
    const projectsTitle = document.querySelector('#projects .section-title');
    const projectsSubtitle = document.querySelector('#projects .section-subtitle');
    const snippetsTitle = document.querySelector('#snippets .section-title');

    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === category) {
            btn.classList.add('active');
        }
    });

    if (category === 'all') {
        projectsTitle.textContent = 'Featured Projects';
        projectsSubtitle.textContent = 'Explore our collection of 25+ professional frontend websites and applications';
        snippetsTitle.textContent = 'Component Snippets & Utilities';
    } else {
        const categoryNames = {
            'ui-components': 'UI Components',
            'email-templates': 'Email Templates',
            'pdf-templates': 'PDF Templates',
            'code-utilities': 'Code Utilities',
            'office-work': 'Office Work',
            'portfolio': 'Portfolio',
            'healthcare': 'Healthcare',
            'react': 'React Projects',
            'magazine': 'Magazine Templates',
            'blog': 'Blog Templates',
            'entertainment': 'Entertainment',
            'api': 'API Integration',
            'sustainability': 'Sustainability',
            'service': 'Service Websites',
            'trading': 'Trading Platforms',
            'agriculture': 'Agriculture',
            'finance': 'Finance',
            'landing': 'Landing Pages'
        };

        const categoryName = categoryNames[category] || category;
        projectsTitle.textContent = `${categoryName} Collection`;
        projectsSubtitle.textContent = `Browse all ${categoryName.toLowerCase()} in our collection`;
        snippetsTitle.textContent = `${categoryName} Snippets & Components`;
    }
}

function showFilteringLoader() {
    // Add loading overlay
    const loader = document.createElement('div');
    loader.id = 'filtering-loader';
    loader.innerHTML = `
        <div class="filtering-overlay">
            <div class="filtering-spinner">
                <i class="fas fa-spinner fa-spin fa-2x text-primary"></i>
                <p class="mt-2">Filtering projects...</p>
            </div>
        </div>
    `;
    document.body.appendChild(loader);
}

function hideFilteringLoader() {
    const loader = document.getElementById('filtering-loader');
    if (loader) {
        loader.remove();
    }
}

// Initialize category filtering from URL on page load
window.addEventListener('load', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFromUrl = urlParams.get('category');

    if (categoryFromUrl) {
        setTimeout(() => {
            filterByCategory(categoryFromUrl);
        }, 1000);
    } else {
        // Set "All Projects" as active by default
        const allButton = document.querySelector('.category-btn[data-filter="all"]');
        if (allButton) {
            allButton.classList.add('active');
        }
    }
});

// Enhanced category item hover effects
document.addEventListener('DOMContentLoaded', function () {
    const categoryItems = document.querySelectorAll('.category-item');

    categoryItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });
});
