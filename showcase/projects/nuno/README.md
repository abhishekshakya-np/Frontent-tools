# Nuno - Responsive Bootstrap Theme Collection

A comprehensive collection of responsive Bootstrap themes featuring modern design, smooth animations, and professional layouts. This repository contains multiple versions of the Nuno theme across different Bootstrap versions and development stages.

![Nuno Theme](nuno/img/nuno.png)

## 📁 Project Versions

### 🎯 **nuno/** - Complete Production Version
The fully-featured, production-ready Nuno theme with all functionality implemented.

### 🏗️ **Nuno-bootstrap-4-fullsite-website/** - Bootstrap 4 Complete
Full Bootstrap 4 implementation with all sections and features working.

### ⚡ **Nuno-bootstrap-5-creating/** - Bootstrap 5 Modern Version  
Modern Bootstrap 5 version with updated components and styling (Xabickx theme).

### 🔧 **Nuno-bootstrap-4-incomplete/** - Bootstrap 4 Learning Version
Simplified Bootstrap 4 version for learning purposes (now fixed and functional).

## 🌟 Features Across All Versions

### Design & User Experience
- **Responsive Design**: Mobile-first approach with Bootstrap grid system
- **Modern Typography**: Google Fonts integration (Lato, custom font stacks)
- **Smooth Animations**: CSS3 animations and JavaScript libraries
- **Professional Layout**: Clean, business-focused design
- **Cross-browser Compatibility**: Tested across modern browsers

### Content Sections
- **Hero Landing Page**: Full-screen welcome with compelling messaging
- **Features Section**: Service/product highlights with icons
- **Portfolio Gallery**: Lightbox image gallery with filtering
- **Team Section**: Meet the team with carousel functionality
- **Skills/Stats**: Animated counters and progress indicators
- **Client Testimonials**: Customer reviews with carousel
- **Contact Form**: Working PHP contact form with validation
- **Pricing Plans**: Service pricing with call-to-action buttons

### Technical Features
- **Bootstrap Framework**: Responsive grid and components
- **Font Awesome Icons**: Comprehensive icon library
- **Owl Carousel**: Touch-enabled content sliders
- **Lightbox Gallery**: Image popup functionality
- **Smooth Scrolling**: Anchor-based navigation
- **Fixed Navigation**: Sticky header with scroll effects
- **Parallax Sections**: Fixed background image effects

## 🚀 Quick Start Guide

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Web server (for PHP contact form functionality)
- Text editor for customization

### Installation
1. Choose your preferred version:
   - **Production use**: Use `nuno/` or `Nuno-bootstrap-4-fullsite-website/`
   - **Learning**: Start with `Nuno-bootstrap-4-incomplete/`
   - **Modern features**: Try `Nuno-bootstrap-5-creating/`

2. Download or clone the chosen version
3. Open `index.html` in your browser
4. For contact form: Configure PHP settings in `contact/` folder

### Running the Projects
```bash
# Navigate to your chosen version
cd nuno  # or any other version

# Open in browser (Windows)
start index.html

# Open in browser (macOS)
open index.html

# Open in browser (Linux)
xdg-open index.html
```

## 📋 Version Comparison

| Feature | nuno/ | fullsite/ | bootstrap-5/ | incomplete/ |
|---------|-------|-----------|--------------|-------------|
| **Bootstrap Version** | 4.3.1 | 4.3.1 | 5.3.3 | 4.1.3 |
| **Completion Level** | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Fixed |
| **Animations** | ✅ Full | ✅ Full | ✅ Enhanced | ⚠️ Basic |
| **Portfolio Gallery** | ✅ Yes | ✅ Yes | ✅ Yes | ❌ No |
| **Team Carousel** | ✅ Yes | ✅ Yes | ✅ Yes | ❌ No |
| **Contact Form** | ✅ PHP | ✅ PHP | ✅ PHP | ❌ No |
| **Pricing Section** | ✅ Yes | ✅ Yes | ✅ Yes | ❌ No |
| **Skills/Stats** | ✅ Yes | ✅ Yes | ✅ Counters | ❌ No |
| **File Size** | Large | Large | Medium | Small |
| **Best For** | Production | Production | Modern sites | Learning |

## 🎨 Design System

### Color Palette
- **Primary**: `#1EBBA3` (Teal) - Main accent color
- **Primary Hover**: `#189582` (Darker teal) - Interactive states
- **Dark**: `#40474e` (Charcoal) - Footer and dark sections
- **Text**: `#505962` (Dark gray) - Main content text
- **Light**: `#ffffff` (White) - Light backgrounds and text

### Typography
- **Primary Font**: Lato (Google Fonts) - Clean, modern sans-serif
- **Weights**: 300 (Light), 400 (Regular), 700 (Bold)
- **Hierarchy**: Consistent sizing with rem units

### Responsive Breakpoints
- **Extra Small**: < 576px (Portrait phones)
- **Small**: 576px+ (Landscape phones) 
- **Medium**: 768px+ (Tablets)
- **Large**: 992px+ (Desktops)
- **Extra Large**: 1200px+ (Large desktops)

## 🔧 Technical Implementation

### HTML Structure
```html
<!-- Semantic HTML5 structure -->
<nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
<main>
  <section id="home" class="hero">
  <section id="features" class="features">
  <section id="portfolio" class="portfolio">
  <!-- Additional sections -->
</main>
<footer>
```

### CSS Architecture
- **Bootstrap Framework**: Grid system and components
- **Custom Styles**: Theme-specific styling
- **Fixed Backgrounds**: Parallax-style sections
- **Responsive Design**: Mobile-first approach
- **CSS3 Features**: Transitions, transforms, animations

### JavaScript Libraries
```javascript
// Core libraries used across versions
- jQuery (3.4.1+)
- Bootstrap JS (4.3.1+ or 5.3.3)
- Font Awesome (5.5.0+)
- Animate.css (3.7.2+)
- Lightbox2 (2.11.1+)
- Owl Carousel (2.3.4+)
- Waypoints (4.0.1+)
- CounterUp (2.1.0+)
```

## 📱 Mobile Responsiveness

### Mobile Features
- **Collapsible Navigation**: Bootstrap navbar with hamburger menu
- **Touch-friendly**: Optimized button and link sizes
- **Stacked Layout**: Single-column content arrangement
- **Optimized Images**: Responsive image scaling
- **Fast Loading**: Optimized for mobile connections

### Desktop Enhancements
- **Multi-column Layouts**: Grid-based content sections
- **Hover Effects**: Interactive elements with smooth transitions
- **Fixed Backgrounds**: Parallax-style scrolling effects
- **Enhanced Navigation**: Full horizontal menu
- **Advanced Animations**: Scroll-triggered effects

## 🛠️ Customization Guide

### Changing Brand Colors
Update the CSS custom properties or find/replace color values:
```css
/* Primary brand color */
#1EBBA3 → Your brand color
#189582 → Your darker shade

/* Update in all CSS files */
background-color: #1EBBA3;
color: #1EBBA3;
border-color: #1EBBA3;
```

### Updating Content
1. **Company Information**: Update text in HTML sections
2. **Logo**: Replace `img/nuno.png` with your logo
3. **Images**: Replace portfolio, team, and background images
4. **Contact Details**: Update footer and contact section
5. **Social Links**: Update href attributes in social icons

### Adding New Sections
1. Create new section HTML following the existing pattern
2. Add corresponding CSS styles
3. Update navigation menu
4. Add scroll animations if desired
5. Test responsive behavior

### Contact Form Setup
```php
// Configure contact/contact.php
$to = 'your-email@domain.com';
$subject = 'Website Contact Form';

// Update SMTP settings in gmail-contact.php
$mail->Username = 'your-gmail@gmail.com';
$mail->Password = 'your-app-password';
```

## 🌐 Browser Support

### Fully Supported
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

### Features Used
- CSS Grid and Flexbox
- CSS3 Transforms and Transitions
- ES6 JavaScript features
- Bootstrap framework features
- Font loading optimization

## 📊 Performance Optimization

### Current Optimizations
- **CDN Resources**: External libraries from CDN
- **Optimized Images**: Compressed image assets
- **Minified Libraries**: Production-ready JavaScript
- **Efficient CSS**: Organized stylesheets
- **Lazy Loading**: Deferred script loading

### Recommendations
- **Image Optimization**: Convert to WebP format
- **CSS/JS Minification**: Minify custom files
- **Critical CSS**: Inline above-the-fold styles
- **Service Worker**: Add offline functionality
- **Bundle Optimization**: Combine and compress assets

## 🔍 SEO & Accessibility

### SEO Features
- Semantic HTML5 structure
- Proper heading hierarchy (H1-H6)
- Meta tags for social sharing
- Clean URL structure
- Alt text for images
- Fast loading speeds

### Accessibility Features
- Keyboard navigation support
- Screen reader compatibility
- High contrast color ratios
- Focus indicators
- ARIA labels where needed
- Responsive text scaling

## 🚀 Deployment Options

### Static Hosting
- **Netlify**: Drag-and-drop deployment with form handling
- **Vercel**: Git-based deployment with optimizations
- **GitHub Pages**: Free hosting for public repositories
- **AWS S3**: Scalable static website hosting

### Dynamic Hosting (for PHP contact form)
- **cPanel Hosting**: Traditional web hosting
- **DigitalOcean**: VPS with PHP support
- **AWS EC2**: Cloud server instances
- **Heroku**: Platform-as-a-service

### Deployment Checklist
1. ✅ Test all functionality locally
2. ✅ Verify image paths and links
3. ✅ Configure contact form settings
4. ✅ Test responsive design
5. ✅ Validate HTML and CSS
6. ✅ Check loading speeds
7. ✅ Test contact form delivery

## 🎯 Business Use Cases

### Perfect For
- **Business Websites**: Professional service companies
- **Portfolio Sites**: Creative professionals and agencies
- **Startup Landing Pages**: Product launches and services
- **Corporate Sites**: Established businesses
- **Freelancer Portfolios**: Individual professionals
- **Learning Projects**: Bootstrap and web development education

### Industry Applications
- Technology and software companies
- Creative agencies and studios
- Consulting and professional services
- E-commerce and retail
- Education and training
- Non-profit organizations

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Choose the version to work on
3. Create a feature branch
4. Make your changes
5. Test across browsers and devices
6. Submit a pull request

### Contribution Guidelines
- Follow existing code style
- Test responsive design
- Update documentation
- Maintain browser compatibility
- Optimize for performance

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support & Troubleshooting

### Common Issues

**Contact Form Not Working**
- Verify PHP server configuration
- Check email settings in contact.php
- Ensure proper file permissions
- Test SMTP credentials

**Images Not Loading**
- Verify file paths are correct
- Check image file extensions
- Ensure images exist in img/ folder
- Test with different browsers

**Responsive Issues**
- Check Bootstrap CSS is loaded
- Verify viewport meta tag
- Test with browser dev tools
- Validate HTML structure

**JavaScript Errors**
- Check browser console for errors
- Verify all CDN links are working
- Ensure proper script loading order
- Test with JavaScript enabled

### Getting Help
- Check browser developer console
- Validate HTML and CSS
- Test with different browsers
- Review Bootstrap documentation

## 📋 Changelog

### Version History
- **v1.0** - Initial Nuno theme release
- **v1.1** - Bootstrap 4 fullsite version
- **v1.2** - Bootstrap 5 modern version (Xabickx)
- **v1.3** - Fixed incomplete version, added documentation

### Recent Updates
- ✅ Fixed CSS syntax errors in incomplete version
- ✅ Added comprehensive documentation
- ✅ Updated browser compatibility
- ✅ Enhanced responsive design
- ✅ Improved performance recommendations

---

**Built for Modern Web Development** 🚀

*Professional Bootstrap themes for businesses and developers.*

## 🎓 Learning Path

### For Beginners
1. Start with `Nuno-bootstrap-4-incomplete/`
2. Study the HTML structure
3. Understand Bootstrap grid system
4. Learn CSS customization
5. Add JavaScript functionality

### For Intermediate Developers
1. Explore `Nuno-bootstrap-4-fullsite-website/`
2. Study advanced Bootstrap components
3. Learn carousel and lightbox implementation
4. Understand PHP contact form setup
5. Practice responsive design principles

### For Advanced Developers
1. Analyze `Nuno-bootstrap-5-creating/`
2. Study modern Bootstrap 5 features
3. Learn advanced animation techniques
4. Implement performance optimizations
5. Create custom variations

---

*Happy coding! 🎉*
