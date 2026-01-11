# Filmo Study - Reusability Refactoring Plan

## Current State Analysis

### ✅ Already Reusable
- **Modular SCSS Architecture**: BEM methodology with separate component files
- **Component-based CSS**: 30+ reusable blocks (button, modal, header, footer, etc.)
- **Data-driven JavaScript**: Uses data attributes for functionality
- **Responsive Design**: Mobile-first approach with breakpoints

### ❌ Needs Refactoring
- **Hardcoded Content**: Russian/English text mixed, specific branding
- **Monolithic HTML**: Single 7,000-line file
- **No Configuration**: Content embedded directly in HTML
- **Hardcoded URLs**: `https://app.filmo.study/` throughout

## Refactoring Strategy

### Phase 1: Extract Configuration
Create a `config.js` file for all dynamic content:

```javascript
const siteConfig = {
  brand: {
    name: "Filmo Study",
    logo: "images/logo.svg",
    appUrl: "https://app.filmo.study/",
  },
  navigation: [
    { label: "Opportunities", anchor: "opportunities" },
    { label: "Gamification", anchor: "gamification" },
    { label: "Comparison", anchor: "comparison" },
    { label: "Plans", anchor: "plans" },
    { label: "FAQ", anchor: "faq" },
  ],
  cta: {
    primary: "Start for free",
    secondary: "Login",
  },
  // ... more config
};
```

### Phase 2: Component Templates
Break HTML into reusable components:

```
components/
  ├── header.html
  ├── footer.html
  ├── loader.html
  ├── hero.html
  ├── plans.html
  ├── faq.html
  └── modals/
      ├── application.html
      └── consultation.html
```

### Phase 3: Template Engine
Use a simple template engine or build system:

**Option A: Handlebars/Mustache**
```html
<!-- header.html -->
<header class="header" data-header>
  <div class="container">
    <nav>
      {{#each navigation}}
        <a href="#{{anchor}}">{{label}}</a>
      {{/each}}
    </nav>
  </div>
</header>
```

**Option B: JavaScript Template Literals**
```javascript
function renderHeader(config) {
  return `
    <header class="header" data-header>
      <nav>
        ${config.navigation.map(item => 
          `<a href="#${item.anchor}">${item.label}</a>`
        ).join('')}
      </nav>
    </header>
  `;
}
```

**Option C: Build Tool (Vite/Webpack)**
- Use component imports
- Hot reload during development
- Optimize assets

### Phase 4: Content Management
Create content files:

```json
// content/hero.json
{
  "title": "Build The Community Your Fans Will Love",
  "description": "Huddle re-imagines the way we build communities...",
  "cta": "Register"
}
```

## Implementation Steps

### Step 1: Create Configuration File
```bash
# Create config structure
mkdir -p website/filmo.study/config
touch website/filmo.study/config/site.js
touch website/filmo.study/config/content.js
```

### Step 2: Extract Components
```bash
# Create component directory
mkdir -p website/filmo.study/components
mkdir -p website/filmo.study/components/modals
```

### Step 3: Build System Setup
Choose one:
- **Simple**: Vanilla JS with template literals
- **Medium**: Handlebars or Mustache
- **Advanced**: Vite, Webpack, or Parcel

### Step 4: Refactor HTML
- Replace hardcoded content with config variables
- Break into component files
- Use template engine to compile

## Reusable Components List

### Core Components (Already Modular)
1. ✅ **Button** (`blocks/button.scss`) - Multiple variants
2. ✅ **Modal** (`blocks/modal.scss`) - Reusable modal system
3. ✅ **Header** (`blocks/header.scss`) - Navigation ready
4. ✅ **Footer** (`blocks/footer.scss`) - Footer component
5. ✅ **Loader** (`blocks/loader.scss`) - Page loader
6. ✅ **Accordion** (`blocks/accordion.scss`) - FAQ component
7. ✅ **Form Input** (`blocks/custom-input.scss`) - Form fields

### Section Components
8. ✅ **Hero/Intro** (`blocks/intro.scss`)
9. ✅ **Plans** (`blocks/plans.scss`)
10. ✅ **Gamification** (`blocks/gamification.scss`)
11. ✅ **Comparison** (`blocks/comparison.scss`)
12. ✅ **Steps** (`blocks/steps.scss`)

## Quick Start: Make It Reusable Now

### Minimal Refactoring (30 minutes)
1. Create `config.js` with all hardcoded values
2. Use JavaScript to inject config into HTML
3. Replace hardcoded URLs with config variables

### Full Refactoring (2-3 hours)
1. Break HTML into component files
2. Set up build system
3. Create content management system
4. Document component API

## Benefits After Refactoring

✅ **Easy Branding Changes**: Update config, rebuild
✅ **Multi-language Support**: Separate content files
✅ **Component Reuse**: Use components in other projects
✅ **Easier Maintenance**: Update one component, affects all uses
✅ **Better Testing**: Test components independently
✅ **Faster Development**: Copy-paste components to new projects

## Example: Reusing Components

After refactoring, you could:

```javascript
// Use in another project
import { Header, Footer, Button, Modal } from './filmo-study-components';

// Customize
const header = new Header({
  logo: 'my-logo.svg',
  nav: [
    { label: 'Home', anchor: 'home' },
    { label: 'About', anchor: 'about' }
  ]
});
```

## Next Steps

1. **Decide on approach**: Simple JS templates or full build system?
2. **Extract config**: Create configuration file
3. **Break HTML**: Start with header/footer components
4. **Test**: Ensure functionality remains intact
5. **Document**: Create component documentation
