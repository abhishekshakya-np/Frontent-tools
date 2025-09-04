document.addEventListener("scroll", function() {
    const navbar = document.querySelector(".nav-bg");
    if (window.scrollY > 50) { // Adjust scroll threshold if needed
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});


// not mine
(function () {
    'use strict';

    document
        .querySelector('[data-toggle="offcanvas"]')
        .addEventListener('click', function () {
            document
                .querySelector('.offcanvas-collapse')
                .classList.toggle('open');
        });
})();

$(document).ready(function ($) {
    // Owl carousel
    'use strict';

    // Owl carousel f-list
    $('.owl-facilities').owlCarousel({
        loop: true,
        margin: 25,
        padding: 10,
        nav: false,
        autoplay: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 2,
            },
            1000: {
                items: 3,
            },
        },
    });

    // Owl carousel services
    $('.owl-service').owlCarousel({
        loop: true,
        margin: 25,
        padding: 10,
        nav: false,

        autoplay: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 2,
            },
            1000: {
                items: 3,
            },
        },
    });
    // Owl carousel companies
    $('.owl-companies').owlCarousel({
        loop: true,
        margin: 25,
        padding: 10,
        nav: true,
        dots: false,
        autoplay: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 3,
            },
            1000: {
                items: 4,
            },
        },
    });

    new WOW().init();
    //Shrink Navbar
    $(document).on('scroll', function () {
        if ($(document).scrollTop() > 100) {
            $('.nav-bg').addClass('nav-shrink');
        } else {
            $('.nav-bg').removeClass('nav-shrink');
        }
    });

    $(document).on('scroll', function () {
        if ($(document).scrollTop() > 800) {
            $('.navbar-display').removeClass('navbar-display-none');
        } else {
            $('.navbar-display').addClass('navbar-display-none');
        }
    });
    // scrolling for top
    const scroller = document.getElementById('progress-scroll');
    if (scroller) {
        scroller.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    //achivement//
    const counters = document.querySelectorAll('.counter');

    counters.forEach((counter) => {
        counter.innerText = '0';
        const updateCounter = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / 200;
            if (count < target) {
                counter.innerText = `${Math.ceil(count + increment)}`;
                setTimeout(updateCounter, 1);
            } else counter.innerText = target;
        };
        updateCounter();
    });

    var owl = $('.subscription-slider');
    owl.owlCarousel({
        animateOut: 'slideOutDown',
        animateIn: 'flipInX',
        items: 3,
        margin: 30,
        stagePadding: 30,
        smartSpeed: 450,
        loop: true,
        autoplay: true,
        autoplayTimeout: 9000,
        autoplayHoverPause: true,
    });
    $('.play').on('click', function () {
        owl.trigger('play.owl.autoplay', [1000]);
    });
    $('.stop').on('click', function () {
        owl.trigger('stop.owl.autoplay');
    });

    // show the alert
    $('.alert')
        .first()
        .hide()
        .slideDown(500)
        .delay(4000)
        .slideUp(500, function () {
            $(this).remove();
        });
    //  TESTIMONIALS CAROUSEL HOOK
    $('#subscription-process').owlCarousel({
        loop: true,
        center: true,
        items: 3,
        margin: 0,
        autoplay: false,
        dots: true,
        autoplayTimeout: 8500,
        smartSpeed: 450,
        nav: true,
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 2,
            },
            1170: {
                items: 3,
            },
        },
    });
});

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

//scroll to
var qValue = getParameterByName('scrollTo');

// Scroll to the element with the 'm-' prefix followed by the 'q' value
if (qValue) {
    var $targetElement = $('#' + qValue);

    if ($targetElement.length > 0) {
        $('html, body').animate(
            {
                scrollTop: $targetElement.offset().top,
            },
            1000
        ); // You can adjust the animation speed (1000 milliseconds = 1 second)
    }
}

// Scroll back to top
('use strict');
document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    // Scroll back to top
    const progressPath = document.querySelector('.progress-wrap path');
    if (progressPath) {
        const pathLength = progressPath.getTotalLength();
        progressPath.style.transition = 'none';
        progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
        progressPath.style.strokeDashoffset = `${pathLength}`;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = 'stroke-dashoffset 10ms linear';
        const updateProgress = () => {
            const scroll = window.scrollY || document.documentElement.scrollTop;
            const height =
                document.documentElement.scrollHeight - window.innerHeight;
            const progress = pathLength - (scroll * pathLength) / height;
            progressPath.style.strokeDashoffset = `${progress}`;
        };
        window.addEventListener('scroll', updateProgress);
        const offset = 50;
        window.addEventListener('scroll', () => {
            if (window.scrollY > offset) {
                const progressWrap = document.querySelector('.progress-wrap');
                if (progressWrap) {
                    progressWrap.classList.add('active-progress');
                }
            } else {
                const progressWrap = document.querySelector('.progress-wrap');
                if (progressWrap) {
                    progressWrap.classList.remove('active-progress');
                }
            }
        });
    }
});

//sweet alert
document.addEventListener('swal:modal', (event) => {
    const redirectUrl = event.detail[0].redirect_url;
    const confirmUrl = event.detail[0].confirm_url;

    if (redirectUrl) {
        Swal.fire({
            position: 'center',
            icon: event.detail[0].icon,
            title: event.detail[0].title,
            showConfirmButton: false,
            timer: 2000,
            didClose: function () {
                window.location.href = redirectUrl;
            },
        });
    } else if (confirmUrl) {
        Swal.fire({
            confirmButtonColor: '#3085d6',
            denyButtonColor: '#d33',
            position: 'center',
            icon: event.detail[0].icon,
            title: event.detail[0].title,
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = confirmUrl;
            }
        });
    } else {
        Swal.fire({
            position: 'center',
            icon: event.detail[0].icon,
            title: event.detail[0].title,
            showConfirmButton: false,
            timer: 1500,
        });
    }
});

//marquee
    $(document).ready(function(){
var marquee_width = $(".marquee-content-primary").width();
document.documentElement.style.setProperty('--marquee-padding', marquee_width + 'px');
})

//Auto increment text-area
// Dealing with Textarea Height
function calcHeight(value) {
    let numberOfLineBreaks = (value.match(/\n/g) || []).length;
    // min-height + lines x line-height + padding + border
    let newHeight = 20 + numberOfLineBreaks * 20 + 12 + 2;
    return newHeight;
  }

let textarea = document.querySelector(".resize-ta");
if (textarea){
    textarea.addEventListener("keyup", () => {
        textarea.style.height = calcHeight(textarea.value) + "px";
    });
}
