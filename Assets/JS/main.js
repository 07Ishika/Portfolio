// Initialize AOS
AOS.init({
    offset: 120,
    delay: 0,
    duration: 1000,
    easing: 'ease',
    once: false,
    mirror: false,
    anchorPlacement: 'top-bottom',
});

window.addEventListener("scroll", () => {
    AOS.refresh();
});

// Typing Animation
class TypeWriter {
    constructor(element, words, wait = 3000) {
        this.element = element;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.element.innerHTML = this.txt;

        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize typing animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    const nameElement = document.getElementById('typingName');
    const roleElement = document.getElementById('typingRole');

    if (nameElement) {
        new TypeWriter(nameElement, ['ISHIKA ANAM'], 2000);
    }

    if (roleElement) {
        new TypeWriter(roleElement, ['IT ENGINEER', 'WEB DEVELOPER', 'DATA ANALYST', 'AI ENTHUSIAST'], 2000);
    }
});

// Theme Toggle — removed per user request

// Professional Custom Cursor
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

// Move dot instantly, ring follows with lerp
document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
});

// Smooth ring follow
function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
}
animateRing();

// Hover state on interactive elements
const hoverTargets = 'a, button, [role="button"], input, textarea, select, label, .project-card, .achievement-card, .logo-item, .nav-link, .btn-project, .btn-show-more';

document.addEventListener('mouseover', function (e) {
    if (e.target.closest(hoverTargets)) {
        cursorDot.classList.add('hovering');
        cursorRing.classList.add('hovering');
    }
});

document.addEventListener('mouseout', function (e) {
    if (e.target.closest(hoverTargets)) {
        cursorDot.classList.remove('hovering');
        cursorRing.classList.remove('hovering');
    }
});

// Click state
document.addEventListener('mousedown', function () {
    cursorDot.classList.add('clicking');
    cursorRing.classList.add('clicking');
});
document.addEventListener('mouseup', function () {
    cursorDot.classList.remove('clicking');
    cursorRing.classList.remove('clicking');
});

// Hide when leaving window
document.addEventListener('mouseleave', function () {
    cursorDot.style.opacity = '0';
    cursorRing.style.opacity = '0';
});
document.addEventListener('mouseenter', function () {
    cursorDot.style.opacity = '1';
    cursorRing.style.opacity = '0.7';
});

// Skills Progress Animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');

    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });
}

// Intersection Observer for progress bars
const progressSection = document.getElementById('skills');
if (progressSection) {
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
            }
        });
    }, { threshold: 0.5 });

    progressObserver.observe(progressSection);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact Form Handling with Formspree
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.innerHTML = '<i class="las la-spinner la-spin me-2"></i>Sending...';
        submitBtn.disabled = true;

        // Submit to Formspree
        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                alert('Thank you for your message! I\'ll get back to you soon.');
                this.reset();
            } else {
                response.json().then(data => {
                    if (Object.hasOwnProperty.call(data, 'errors')) {
                        alert('Error: ' + data.errors.map(error => error.message).join(', '));
                    } else {
                        alert('Oops! There was a problem submitting your form');
                    }
                });
            }
        }).catch(error => {
            alert('Oops! There was a problem submitting your form');
        }).finally(() => {
            // Reset button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    });
}

// Enhanced hover effects for cards
document.querySelectorAll('.card-custom, .achievement-card, .glass-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Parallax effect for background
window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('#home');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.backgroundPosition = `center ${speed}px`;
    }
});

// Loading animation
window.addEventListener('load', function () {
    document.body.classList.add('loaded');
});

// Add floating animation to achievement icons
document.querySelectorAll('.achievement-icon i').forEach((icon, index) => {
    icon.style.animationDelay = `${index * 0.2}s`;
    icon.style.animation = 'float 3s ease-in-out infinite';
});

// Add CSS for floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    .loaded {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
    }
`;
document.head.appendChild(style);


// Project Filter Tabs
document.addEventListener('DOMContentLoaded', function () {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card[data-category]');
    const noProjects = document.getElementById('noProjects');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
            let visibleCount = 0;

            projectCards.forEach((card, i) => {
                const match = filter === 'all' || card.getAttribute('data-category') === filter;
                if (match) {
                    card.classList.remove('hidden-by-filter');
                    // Stagger re-entry
                    card.style.animationDelay = `${visibleCount * 80}ms`;
                    visibleCount++;
                } else {
                    card.classList.add('hidden-by-filter');
                }
            });

            if (noProjects) {
                noProjects.style.display = visibleCount === 0 ? 'block' : 'none';
            }
        });
    });
});