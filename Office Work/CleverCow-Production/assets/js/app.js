// // An object literal
// var app = {
//   init: function() {
//     app.functionOne();
//   },
//   functionOne: function () {
//   },
//   scrollTop: function() {
//     window.scrollTo({top: 0, behavior: 'smooth'});
//   }
// };
// (function() {
//   // your page initialization code here
//   // the DOM will be available here
//   app.init();
// })();



document.addEventListener("scroll", function () {
    const navbar = document.querySelector(".nav-bg");
    const navbarDisplays = document.querySelectorAll(".navbar-display");


    // Define the maximum scroll range for opacity change
    const maxScroll = 600;

    // Get the current scroll position
    const scrollY = window.scrollY;

    // Calculate the opacity (from 0 to 1)
    let opacity = Math.min(scrollY / maxScroll, 1); // Ensure it doesn't exceed 1

    // Apply the opacity to the navbar background
    navbar.style.backgroundColor = `rgba(0, 92, 74, ${opacity})`; // Adjust color values as needed


    // Check if the scroll position exceeds the threshold
    if (scrollY > maxScroll) {
        navbar.classList.add("scrolled");
        navbarDisplays.forEach(navbarDisplay => {
            navbarDisplay.classList.remove("navbar-display-none");
        });
    } else {
        navbar.classList.remove("scrolled");
        navbarDisplays.forEach(navbarDisplay => {
            navbarDisplay.classList.add("navbar-display-none");
        });
    }
});






// document.querySelector(".navbar-toggler").addEventListener("click", function () {
//   this.classList.toggle("toggled");
// });


// document.addEventListener("DOMContentLoaded", function () {
//     const navbarToggler = document.querySelector(".navbar-toggler");
//     const navbarContent = document.querySelector(".offcanvas-collapse");
//     const navbarTogglerIcon = navbarToggler.querySelector(".navbar-toggler-icon");

//  console.log(navbarToggler);


//     navbarToggler.addEventListener("click", function () {
//         navbarContent.classList.toggle("open");
//         navbarToggler.classList.toggle("toggled");
//         if (navbarContent.classList.contains("open")) {
//             navbarTogglerIcon.classList.replace("bx-menu", "bx-x");
//         } else {
//             navbarTogglerIcon.classList.replace("bx-x", "bx-menu");
//         }
//     });
// });

document.querySelector('[data-toggle="offcanvas"]')
    .addEventListener('click', function () {
        const navbar = document.querySelector(".nav-bg");
        const navbarDisplays = document.querySelectorAll(".navbar-display");
        const offcanvas = document.querySelector('.offcanvas-collapse');
        const toggleIcon = document.querySelector('[data-toggle="offcanvas"] span');

        // Toggle the 'open' class on the offcanvas
        offcanvas.classList.toggle('open');
        toggleIcon.classList.toggle('close');

        if (offcanvas.classList.contains('open')) {
            // If the menu is open, add scrolled and remove display-none
            navbar.classList.add("scrolled");
            navbarDisplays.forEach(navbarDisplay => {
                navbarDisplay.classList.remove("navbar-display-none");
            });
        } else {
            // If the menu is closed, remove scrolled and add display-none
            navbar.classList.remove("scrolled");
            navbarDisplays.forEach(navbarDisplay => {
                navbarDisplay.classList.add("navbar-display-none");
            });
        }
    });





// document.addEventListener('DOMContentLoaded', function () {
//     var carouselElement = document.querySelector('#clevercowCarousel');
//     var currentIndexElement = document.querySelector('#carouselCurrentIndex');

//     carouselElement.addEventListener('slide.bs.carousel', function (event) {
//         var currentIndex = event.to + 1;
//         currentIndexElement.textContent = currentIndex + ' / 4';
//     });
// });


/**
* Initiate glightbox
*/
const glightbox = GLightbox({
    selector: '.glightbox'
});
console.log(glightbox)
$(document).ready(function () {
    // Initialize Owl Carousel
    const owl = $(".owl-carousel").owlCarousel({
        loop: true,
        margin: 10,
        nav: false, // Disable default navigation buttons
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });

    // Custom Previous Button
    $(".carousel-btn:not(.carousel-btn-filled)").on("click", function () {
        owl.trigger("prev.owl.carousel");
    });

    // Custom Next Button
    $(".carousel-btn-filled").on("click", function () {
        owl.trigger("next.owl.carousel");
    });
});
