/**
 * Example: Reusable Header Component
 * This shows how to make the header reusable
 */

function renderHeader(config) {
  const navItems = config.navigation.map(item => `
    <li class="header__inner-item">
      <a class="header__inner-link" href="${item.href}" data-scroll-to="${item.anchor}">
        ${item.label}
      </a>
    </li>
  `).join('');

  return `
    <header class="header" data-header data-fix-block>
      <div class="container">
        <div class="header__wrapper">
          <div class="header__top-block">
            <span class="logo header__logo">
              <svg width="${config.brand.logo.width}" height="${config.brand.logo.height}" 
                   viewBox="0 0 ${config.brand.logo.width} ${config.brand.logo.height}" 
                   fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Logo SVG paths here -->
              </svg>
            </span>
            <button class="header__nav-toggle" type="button" 
                    aria-label="Menu display switch" aria-pressed="false" 
                    data-header-toggler></button>
          </div>
          <nav class="header__nav">
            <ul class="header__inner-nav">
              ${navItems}
            </ul>
            <div class="header__button-block">
              <a class="button header__button button--${config.cta.primary.variant} button--${config.cta.primary.size}" 
                 href="${config.cta.primary.href}" data-cursor="inverse">
                <span class="button__text-wrapper">
                  <span class="button__text" data-text="${config.cta.primary.text}">
                    ${config.cta.primary.text}
                  </span>
                </span>
                <span class="button__bg"><span></span></span>
              </a>
              <a class="button header__button button--${config.cta.secondary.variant} button--${config.cta.secondary.size}" 
                 href="${config.cta.secondary.href}">
                <span class="button__text">${config.cta.secondary.text}</span>
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  `;
}

// Usage Example:
// const headerHTML = renderHeader(siteConfig);
// document.getElementById('header-container').innerHTML = headerHTML;

/**
 * Example: Reusable Button Component
 */
function renderButton(config) {
  const { text, href, variant = 'simple', size = 'medium', cursor } = config;
  
  const cursorAttr = cursor ? `data-cursor="${cursor}"` : '';
  const sizeClass = size !== 'medium' ? `button--${size}` : '';
  
  if (variant === 'romantic') {
    return `
      <a class="button button--romantic ${sizeClass}" href="${href}" ${cursorAttr}>
        <span class="button__text-wrapper">
          <span class="button__text" data-text="${text}">${text}</span>
        </span>
        <span class="button__bg"><span></span></span>
      </a>
    `;
  }
  
  return `
    <a class="button button--${variant} ${sizeClass}" href="${href}" ${cursorAttr}>
      <span class="button__text">${text}</span>
    </a>
  `;
}

// Usage:
// const btn = renderButton({ text: 'Click me', href: '#', variant: 'nero', size: 'large' });

/**
 * Example: Reusable Modal Component
 */
function renderModal(config) {
  const { id, title, content, closeLabel = 'Close' } = config;
  
  return `
    <div class="modal modal--preload" data-modal="${id}">
      <div class="modal__wrapper">
        <div class="modal__overlay" data-close-modal></div>
        <div class="modal__content">
          <h2>${title}</h2>
          <div class="modal__body">
            ${content}
          </div>
          <button class="modal__close-btn" type="button" 
                  aria-label="${closeLabel}" data-close-modal>
            <svg width="48" height="48" aria-hidden="true">
              <use xlink:href="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    renderHeader,
    renderButton,
    renderModal
  };
} else {
  window.FilmoComponents = {
    renderHeader,
    renderButton,
    renderModal
  };
}
