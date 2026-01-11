/**
 * Filmo Study - Configuration File
 * Extract all hardcoded values here for easy customization
 */

const siteConfig = {
  // Brand Information
  brand: {
    name: "Filmo Study",
    altName: "CSS Study", // For meta tags
    logo: {
      svg: "images/logo.svg",
      width: 199,
      height: 28
    },
    appUrl: "https://app.filmo.study/",
    copyright: "Filmo Study 2022"
  },

  // Navigation Menu
  navigation: [
    { 
      label: "Opportunities", 
      anchor: "opportunities",
      href: "#opportunities"
    },
    { 
      label: "Gamification", 
      anchor: "gamification",
      href: "#gamification"
    },
    { 
      label: "Comparison", 
      anchor: "comparison",
      href: "#comparison"
    },
    { 
      label: "Plans", 
      anchor: "plans",
      href: "#plans"
    },
    { 
      label: "FAQ", 
      anchor: "faq",
      href: "#faq"
    }
  ],

  // Call-to-Action Buttons
  cta: {
    primary: {
      text: "Start for free",
      href: "https://app.filmo.study/",
      variant: "romantic",
      size: "small"
    },
    secondary: {
      text: "Login",
      href: "https://app.filmo.study/",
      variant: "simple",
      size: "small"
    }
  },

  // Meta Information
  meta: {
    title: "Filmo Study",
    description: "Create and conduct online courses easily with an intuitive interface and built-in gamification. Join the platform now and get 14 days of free access!",
    ogTitle: "Monetize your knowledge in a fun way with CSS Study",
    ogDescription: "Create and conduct online courses easily with an intuitive interface and built-in gamification. Join the platform now and get 14 days of free access!",
    themeColor: "#ffffff",
    tileColor: "#da532c"
  },

  // Loader Configuration
  loader: {
    duration: 10000,
    stop: 98,
    finalTimeout: 1000
  },

  // Language Support (for future i18n)
  language: {
    default: "ru",
    supported: ["ru", "en"],
    content: {
      ru: {
        forms: {
          name: "Ваше имя",
          phone: "Ваш телефон",
          submit: "Оставить заявку"
        }
      },
      en: {
        forms: {
          name: "Your name",
          phone: "Your phone",
          submit: "Submit application"
        }
      }
    }
  }
};

// Export for use in templates
if (typeof module !== 'undefined' && module.exports) {
  module.exports = siteConfig;
} else {
  window.siteConfig = siteConfig;
}
