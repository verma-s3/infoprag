jQuery(document).ready(function ($) {
  // fixedHeaderOnScroll();
  $('#toggle').click(function () {
    $(this).toggleClass('active');
    $('#overlay').toggleClass('open');
    $('html').toggleClass('hidden');
  });


  // Closes overlay menu after clicking on the menu link
  $('#site-navigation3 ul li a').on("click", function (e) {
    $('#toggle').click();
  });


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
          duration: 800,
          easing: 'ease-in-quad',
          disable: 'mobile',
          offset: 150,
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
      duration: 800,
      easing: 'ease-in-quad',
      disable: 'mobile',
      offset: 150,
      once: true
    });
  }

  // Force refresh on full page load to animate visible elements immediately
  $(window).on('load', function () {
    AOS.refresh();
  });


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

  //*** Scroll to Top *** use with less *** use with html ***
  $(window).scroll(function () {
    if ($(this).scrollTop() >= 600) {        // If page is scrolled more than 50px
      $('#return-to-top').fadeIn(200);    // Fade in the arrow
    } else {
      $('#return-to-top').fadeOut(200);   // Else fade out the arrow
    }
  });

  $('#return-to-top').click(function () {      // When arrow is clicked
    $('body,html').animate({
      scrollTop: 0                       // Scroll to top of body
    }, 500);
  });//End Scroll to Top


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
    // speed: 500,
    prevArrow: $('.arrowPrev'),
    nextArrow: $('.arrowNext'),
    slidesToShow: 1,
    vertical: true,
    focusOnSelect: true,
  });

  // Function to set active SVG segment
  function setActiveSegment(segment) {
    $('#mainCircle [id^="segment-"]').removeClass('active');
    $('#mainCircle #segment-' + segment).addClass('active');
  }

  // Update SVG when slide changes (swipe/arrows)
  $('.content-slider').on('afterChange', function (event, slick, currentSlide) {
    const segment = $('.slider-content').eq(currentSlide).data('segment');
    setActiveSegment(segment);
  });

  // Click on SVG segment
  $('#mainCircle [id^="segment-"]').on('click', function () {
    const segment = $(this).data('segment');
    const slideIndex = segment - 1;

    setActiveSegment(segment);       // **update SVG immediately**
    $('.content-slider').slick('slickGoTo', slideIndex);
  });

  // Optional: click on slide content itself to jump to another slide
  $('.slider-content').on('click', function () {
    const segment = $(this).data('segment');
    const slideIndex = segment - 1;

    setActiveSegment(segment);       // **update SVG immediately**
    $('.content-slider').slick('slickGoTo', slideIndex);
  });

});