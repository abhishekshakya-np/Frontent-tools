$(document).ready(function() {


    // Navbar fixed to top
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 50) {
            $('header').addClass('fixed-header');
        } else {
            $('header').removeClass('fixed-header');
        }
    });
    
    // Owl carousel
    (function () {
      "use strict";

     // Owl carousel f-list
     $(document).ready(function() {
        $('.owl-facilities').owlCarousel({
            loop:true,
            margin:25,
            padding:10,
            nav:false, 
            autoplay:true,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:2
                },
                1000:{
                    items:3
                }
            }
        })
    });

    // Owl carousel services
    $(document).ready(function() {
        $('.owl-service').owlCarousel({
            loop:true,
            margin:25,
            padding:10,
            nav:false, 

            autoplay:true,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:2
                },
                1000:{
                    items:3
                }
            }
        })
    });

    // Owl carousel companies
    $(document).ready(function() {
        $('.owl-companies').owlCarousel({
            loop:true,
            margin:25,
            padding:10,
            nav:true, 
            dots:false,
            autoplay:true,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:3
                },
                1000:{
                    items:4
                }
            }
        })
    });
    

    (function ($) {
      carousels();
    })
      (jQuery);
    })
  ();

});
