// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function () {
  const menuBtn = document.querySelector('.menu.cta');
  const overlay = document.querySelector('.overlay');
  const closeBtn = document.querySelector('.overlay .close');

  // Open overlay menu
  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      if (overlay) {
        overlay.style.height = '100%';
      }
    });
  }

  // Close overlay menu
  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      if (overlay) {
        overlay.style.height = '0%';
      }
    });
  }

  // Close overlay when clicking on overlay links
  const overlayLinks = document.querySelectorAll('.overlay__content a');
  overlayLinks.forEach(link => {
    link.addEventListener('click', function () {
      if (overlay) {
        overlay.style.height = '0%';
      }
    });
  });

  // Close overlay when clicking outside (on overlay background)
  if (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) {
        overlay.style.height = '0%';
      }
    });
  }
});
