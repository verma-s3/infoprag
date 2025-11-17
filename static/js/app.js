jQuery(document).ready(function ($) {
  // fixedHeaderOnScroll();
  $('#toggle').click(function () {
    $(this).toggleClass('active');
    $('#overlay').toggleClass('open');
    $('html').toggleClass('hidden');
    // if ($('header').hasClass('fixed-header')) {
    //   $('header').toggleClass('overlay-header');
    // }
  });


  // Closes overlay menu after clicking on the menu link
  $('#site-navigation3 ul li a').on("click", function (e) {
    $('#toggle').click();
  });

  // AOS.init({
  //   startEvent: 'DOMContentLoaded',
  //   duration: 1000,
  //   easing: 'ease-in-quad',
  //   disable: 'mobile',
  //   once: true
  // });
  // Run AOS only after Slick finishes loading the first slide
  // Initialize AOS for all pages
  if ($('.hero-slider').length) {

    // Initialize the slider first
    $('.hero-slider').slick({
      dots: true,
      centerMode: false,
      infinite: false,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      speed: 500,
      fade: true,
      cssEase: 'ease',
      customPaging: function (slider, i) {
        return '<button class="tab">' + $(slider.$slides[i]).data('title') + '<span class="slide-btn"></span></button>';
      },
    });

    // After slider initializes, trigger AOS
    $('.hero-slider').on('init', function () {
      // Wait a short time to ensure first slide is rendered
      setTimeout(function () {
        AOS.init({
          duration: 1000,
          easing: 'ease-in-quad',
          disable: 'mobile',
          once: true
        });
        AOS.refreshHard();
      }, 100);
    });

    // Slick sometimes doesn't fire 'init' on first load if called after slick()
    // So trigger manually if needed
    if ($('.hero-slider').hasClass('slick-initialized')) {
      setTimeout(function () {
        AOS.init({
          duration: 1000,
          easing: 'ease-in-quad',
          disable: 'mobile',
          once: true
        });
        AOS.refreshHard();
      }, 100);
    }

    // Optional: refresh AOS on each slide change
    $('.hero-slider').on('afterChange', function () {
      AOS.refreshHard();
    });

  } else {
    // Pages without slider
    AOS.init({
      duration: 1000,
      easing: 'ease-in-quad',
      disable: 'mobile',
      once: true
    });
  }

  // Force refresh on full page load to animate visible elements immediately
  $(window).on('load', function () {
    AOS.refresh();
  });



  // // Refresh AOS on slide change
  // $('.hero-slider').on('afterChange', function () {
  //   AOS.refreshHard();
  // });


  // window.addEventListener('pageshow', function () {
  //   setTimeout(() => {
  //     window.scrollBy(0, 1); // Nudge scroll to trigger observers
  //     window.scrollBy(0, -1);
  //     AOS.refreshHard();
  //   }, 50);
  // });

  // $(window).one('scroll', function() {
  //   AOS.refresh();
  // });

  // if ('scrollRestoration' in history) {
  //   history.scrollRestoration = 'manual';
  // }


  // //*** Smooth Scroll ***
  window.addEventListener('load', function () {
    const hash = window.location.hash;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100); // buffer for fonts/images
      }
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, null, targetId);
      }
    });
  });


  //*** Fixed header ***
  // function fixedHeaderOnScroll(){
  //   // var heroHeight = window.innerHeight; //use me if want to display fixed header according to innerHeight.
  //   // if ($(this).scrollTop() >= heroHeight) {// 
  //   if ($(this).scrollTop() >= 0) {        // If page is scrolled 
  //       $('header').addClass('fixed-header');    // Fade in the arrow
  //   } else {
  //       $('header').removeClass('fixed-header');   // Else fade out the arrow
  //   }
  // }

  /************************************************
  uncomment follwoing code if window.innerheight is
  included in fixedHeaderOnScroll function.  
  *************************************************/

  // $(window).on('load scroll resize', function () {
  //   fixedHeaderOnScroll();
  // });

  // $(window).on('load', function () {
  //   fixedHeaderOnScroll();
  // });

  // $(window).scroll(function () {
  //   fixedHeaderOnScroll();
  // });


  // $(window).resize(function() {
  //   fixedHeaderOnScroll();
  // });


  //*** Scroll to Top *** use with less *** use with html ***
  // $(window).scroll(function() {
  //     if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
  //         $('#return-to-top').fadeIn(200);    // Fade in the arrow
  //     } else {
  //         $('#return-to-top').fadeOut(200);   // Else fade out the arrow
  //     }
  // });

  // $('#return-to-top').click(function() {      // When arrow is clicked
  //     $('body,html').animate({
  //         scrollTop : 0                       // Scroll to top of body
  //     }, 500);
  // });//End Scroll to Top



  //*** Flexslider ***
  // var $flexslider = $('.flex-slider');
  // $flexslider.flexslider({
  //   smoothHeight: false,
  //   slideshow: true,
  //   arrows: false,
  //   dots: true,
  //   controlNav: true,
  //   directionNav: true,
  //   slideshowSpeed: 5000,
  //   useCSS: false /* Chrome fix*/
  // });// End Flexslider



  //Slick SLider
  $('.hero-slider').slick({
    dots: true,
    centerMode: false,
    infinite: false,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 500,
    fade: true,
    cssEase: 'ease',
    customPaging: function (slider, i) {
      return '<button class="tab">' + $(slider.$slides[i]).data('title') + '<span class="slide-btn"></span></button>';
    },
  });



  function faq($title, $content, $section) {
    $($content).hide();
    $(`${$section} .container .text-content .list .list-item`).first().find($content).show();
    $(`${$section} .container .text-content .list .list-item`).first().find($title).addClass('default-active is-active');
    $($title).click(function () {
      var $thisItem = $(this).closest('.list-item');
      // Close all other items
      $thisItem
        .siblings('.list-item')
        .find($content)
        .slideUp();
      $thisItem
        .siblings('.list-item')
        .find($title)
        .removeClass('is-active default-active');

      // Toggle this item
      $(this)
        .toggleClass('is-active')
        .next($content)
        .slideToggle('ease-out');
    });
  }
  faq('.service-title', '.service-content', '.our-services');
  faq('.approach-title', '.approach-content', '.our-approach');
  faq('.faq-title', '.faq-content', '.core-functionality');

  $('.content-slider').slick({
    dots: true,
    infinite: false,
    swipe: true,
    speed: 500,
    prevArrow: $('.arrowPrev'),
    nextArrow: $('.arrowNext'),
    slidesToShow: 1,
    // slidesToScroll: 1,
    vertical: true,
    focusOnSelect: true,
  });
  // On slide change, update active segment in the circle

  // When slide changes, highlight correct SVG segment
  $('.content-slider').on('afterChange', function (event, slick, currentSlide) {
    const segment = $('.slider-content').eq(currentSlide).data('segment');

    // remove active class from all segments
    $('#mainCircle [id^="segment-"]').removeClass('active');

    // activate current segment
    $('#mainCircle #segment-' + segment).addClass('active');
  });
});