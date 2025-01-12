AOS.init();

// You can also pass an optional settings object
// below listed default settings
AOS.init({
  
  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 1000, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});

window.addEventListener("scroll", () => {
    AOS.refresh();
});

  // Hide the carousel when scrolling down past the Home section
  window.addEventListener('scroll', function() {
    var carousel = document.getElementById('verticalCarousel');
    var homeSection = document.getElementById('home');

    // Get the position of the home section
    var homeSectionBottom = homeSection.getBoundingClientRect().bottom;

    // If the user has scrolled past the Home section, hide the carousel
    if (homeSectionBottom <= 0) {
        carousel.style.opacity = '0'; // Hide carousel
    } else {
        carousel.style.opacity = '1'; // Show carousel
    }
});
    // Function to open links when images are clicked
    document.querySelector(".linkedin").addEventListener("click", function () {
        window.open("https://www.linkedin.com/in/ishika-anam-12a44328a/");
    });

    document.querySelector(".instagram").addEventListener("click", function () {
        window.open("https://www.instagram.com/_07_ishika?utm_source=qr&igsh=MW01MDlmc3VsMXYzZw==");
    });

    document.querySelector(".gitHub").addEventListener("click", function () {
      window.open("https://github.com/07Ishika");
  });

