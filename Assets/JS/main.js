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
        new TypeWriter(roleElement, ['IT ENGINEER', 'WEB DEVELOPER', 'PYTHON PROGRAMMER', 'AI ENTHUSIAST'], 2000);
    }
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', currentTheme);

// Update icon based on current theme
if (currentTheme === 'light') {
    themeIcon.className = 'las la-moon';
} else {
    themeIcon.className = 'las la-sun';
}

themeToggle.addEventListener('click', function () {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Update icon
    if (newTheme === 'light') {
        themeIcon.className = 'las la-moon';
    } else {
        themeIcon.className = 'las la-sun';
    }
});

// Cursor Magnification Effect
const cursorMagnify = document.getElementById('cursorMagnify');
let isMouseMoving = false;

document.addEventListener('mousemove', function (e) {
    cursorMagnify.style.left = e.clientX + 'px';
    cursorMagnify.style.top = e.clientY + 'px';

    if (!isMouseMoving) {
        cursorMagnify.classList.add('active');
        isMouseMoving = true;
    }
});

document.addEventListener('mouseleave', function () {
    cursorMagnify.classList.remove('active');
    isMouseMoving = false;
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


// Show More Projects Functionality
let projectsExpanded = false;

function toggleProjects() {
    const hiddenProjects = document.querySelectorAll('.hidden-project');
    const btnText = document.getElementById('btnText');
    const projectCount = document.querySelector('.project-count');
    const showMoreBtn = document.getElementById('showMoreBtn');
    
    if (!projectsExpanded) {
        // Show hidden projects
        hiddenProjects.forEach((project, index) => {
            setTimeout(() => {
                project.classList.add('show');
            }, index * 200);
        });
        
        btnText.textContent = 'Show Less Projects';
        projectCount.textContent = '(-2)';
        showMoreBtn.querySelector('i').className = 'las la-minus-circle me-2';
        projectsExpanded = true;
    } else {
        // Hide projects
        hiddenProjects.forEach(project => {
            project.classList.remove('show');
            setTimeout(() => {
                project.style.display = 'none';
            }, 300);
        });
        
        setTimeout(() => {
            hiddenProjects.forEach(project => {
                project.style.display = 'block';
            });
        }, 400);
        
        btnText.textContent = 'Show More Projects';
        projectCount.textContent = '(+2)';
        showMoreBtn.querySelector('i').className = 'las la-plus-circle me-2';
        projectsExpanded = false;
        
        // Scroll to projects section
        const projectsSection = document.getElementById('projectsGrid');
        if (projectsSection) {
            projectsSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    }
}