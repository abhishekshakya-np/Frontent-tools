# The Rosa Restaurant Website

A modern, elegant restaurant website built with HTML5, CSS3, and JavaScript. Features a responsive design with smooth animations and an intuitive user interface perfect for fine dining establishments.

![The Rosa Website](images/hero.jpg)

## 🌟 Features

### Design & User Experience
- **Elegant Typography**: Custom font combinations using Google Fonts (Source Sans Pro, Herr Von Muellerhoff, Cabin)
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Smooth Animations**: CSS keyframe animations and ScrollReveal library integration
- **Modern UI/UX**: Clean, minimalist design with golden accent colors (#c59d5f)
- **Interactive Elements**: Hover effects, smooth transitions, and engaging animations

### Navigation & Functionality
- **Responsive Navigation**: Desktop horizontal menu with mobile hamburger menu
- **Smooth Scrolling**: Seamless navigation between page sections
- **Dynamic Header**: Background changes on scroll for better visibility
- **Back-to-Top Button**: Animated floating button for easy navigation
- **Mobile Menu**: Slide-in navigation panel for mobile devices

### Content Sections
- **Hero Section**: Full-screen welcome with animated text and call-to-action
- **About Section**: "Discover Our Story" with engaging content and imagery
- **Menu Showcase**: "Tasteful Recipes" and menu gallery with grid layout
- **Perfect Blend**: Featured section with background imagery
- **Footer**: Social media links, newsletter signup, and contact information

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server setup required - runs as static HTML

### Installation
1. Clone or download the project files
2. Ensure all files are in the same directory:
   ```
   the-rosa/
   ├── index.html
   ├── styles.css
   ├── main.js
   ├── images/
   │   ├── hero.jpg
   │   ├── logo-rosa.png
   │   ├── our-story-1.jpg
   │   ├── tasteful-recipes.jpg
   │   ├── perfect-blend.jpg
   │   ├── menu-group-1.jpg
   │   ├── menu-group-2.jpg
   │   ├── menu-group-3.jpg
   │   └── menu-group-4.jpg
   └── README.md
   ```
3. Open `index.html` in your web browser

### Running the Website
```bash
# Navigate to the project directory
cd the-rosa

# Open in default browser (Windows)
start index.html

# Open in default browser (macOS)
open index.html

# Open in default browser (Linux)
xdg-open index.html
```

## 📁 Project Structure

```
the-rosa/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── main.js             # JavaScript functionality
├── images/             # Image assets
│   ├── hero.jpg        # Hero section background
│   ├── logo-rosa.png   # Restaurant logo
│   ├── our-story-1.jpg # About section image
│   ├── tasteful-recipes.jpg # Recipes section background
│   ├── perfect-blend.jpg    # Perfect blend section background
│   └── menu-group-*.jpg     # Menu showcase images
└── README.md           # Project documentation
```

## 🎨 Design System

### Color Palette
- **Primary Dark**: `#252525` - Main text and dark elements
- **Secondary Gold**: `#c59d5f` - Accent color, buttons, highlights
- **Body Text**: `#515151` - Regular text content
- **White**: `#ffffff` - Light text and backgrounds
- **Dark Background**: `#121212` - Footer and dark sections

### Typography
- **Main Font**: Source Sans Pro (headings, navigation)
- **Secondary Font**: Herr Von Muellerhoff (decorative text)
- **Body Font**: Cabin (paragraph text)

### Responsive Breakpoints
- **Mobile**: < 900px (hamburger menu, stacked layout)
- **Desktop**: ≥ 900px (horizontal navigation, side-by-side layout)

## 🔧 Technical Implementation

### HTML Structure
- Semantic HTML5 elements
- Accessible navigation with proper ARIA labels
- SEO-friendly meta tags and structure
- Clean, maintainable code organization

### CSS Features
- **CSS Custom Properties**: Centralized color and font management
- **Flexbox & Grid**: Modern layout techniques
- **CSS Animations**: Keyframe animations for engaging interactions
- **Media Queries**: Responsive design implementation
- **Smooth Scrolling**: Native CSS smooth scroll behavior

### JavaScript Functionality
```javascript
// Key features implemented:
- Mobile menu toggle
- Scroll-based header styling
- Smooth scroll navigation
- ScrollReveal animations
- Back-to-top functionality
```

## 📱 Mobile Responsiveness

### Mobile Features (< 900px)
- Hamburger menu with slide-in navigation
- Optimized typography scaling
- Touch-friendly button sizes
- Stacked content layout
- Optimized image sizing

### Desktop Features (≥ 900px)
- Horizontal navigation menu
- Side-by-side content layout
- Larger typography and spacing
- Enhanced hover effects
- Multi-column footer layout

## 🎬 Animations & Effects

### CSS Animations
- **fadeUp**: Elements slide up while fading in
- **scale**: Elements scale from large to normal size
- **grow**: Lines grow from 0 to full width
- **spin**: Rotating asterisk decorations
- **fadeDown**: Elements slide down while fading in
- **up**: Continuous floating animation for back-to-top button

### ScrollReveal Animations
- **animate-left**: Elements reveal from the left
- **animate-right**: Elements reveal from the right
- **animate-top**: Elements reveal from the top
- **animate-bottom**: Elements reveal from the bottom

## 🛠️ Customization Guide

### Changing Colors
Update the CSS custom properties in `styles.css`:
```css
:root{
    --main-font-color-dark: #252525;
    --secondary-font-color: #c59d5f;
    --body-font-color: #515151;
}
```

### Updating Content
1. **Restaurant Name**: Update in `index.html` title tags and hero section
2. **Logo**: Replace `images/logo-rosa.png` with your logo
3. **Images**: Replace images in the `images/` folder
4. **Text Content**: Update paragraph text and headings in `index.html`
5. **Social Links**: Update href attributes in the footer social icons

### Adding Sections
1. Add new section HTML in `index.html`
2. Add corresponding CSS styles in `styles.css`
3. Update navigation links if needed
4. Add ScrollReveal animations for new elements

## 🌐 Browser Support

### Fully Supported
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Features Used
- CSS Grid and Flexbox
- CSS Custom Properties
- Smooth Scroll Behavior
- ES6 JavaScript Features
- ScrollReveal Library

## 📊 Performance Optimization

### Implemented Optimizations
- **Minified CSS**: Organized and efficient stylesheets
- **Optimized Images**: Properly sized image assets
- **Efficient JavaScript**: Minimal DOM manipulation
- **CDN Resources**: Font Awesome and ScrollReveal from CDN
- **Semantic HTML**: Clean, accessible markup

### Recommendations
- Compress images for web (WebP format recommended)
- Implement lazy loading for images
- Minify CSS and JavaScript for production
- Add service worker for offline functionality
- Optimize Google Fonts loading

## 🔍 SEO Features

- Semantic HTML5 structure
- Proper heading hierarchy (H1, H2, etc.)
- Meta description and viewport tags
- Alt text for all images
- Clean URL structure ready
- Schema markup ready for implementation

## 🚀 Deployment

### Static Hosting Options
- **Netlify**: Drag and drop deployment
- **Vercel**: Git-based deployment
- **GitHub Pages**: Free hosting for public repos
- **Firebase Hosting**: Google's hosting solution

### Deployment Steps
1. Upload all files maintaining folder structure
2. Ensure `index.html` is in root directory
3. Verify all image paths are correct
4. Test all functionality after deployment

## 🤝 Contributing

To contribute to this project:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test across different devices and browsers
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

For questions or issues:
1. Check browser console for JavaScript errors
2. Verify all files are properly linked
3. Ensure images are in the correct directory
4. Test on different browsers and devices

## 📋 Changelog

### Version 1.0.0
- Initial release
- Complete responsive restaurant website
- Mobile navigation implementation
- ScrollReveal animations
- Full CSS styling and JavaScript functionality

---

**Built with ❤️ for The Rosa Restaurant**

*A modern, elegant web presence for fine dining establishments.*
