// Mobile Menu Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
        }
    });
});

// HubSpot Form Integration
document.addEventListener('DOMContentLoaded', function() {
    // Wait for HubSpot form to load
    const checkFormLoaded = setInterval(function() {
        const hsForm = document.querySelector('.hs-form-frame iframe');
        if (hsForm) {
            clearInterval(checkFormLoaded);
            
            // Listen for form submission
            hsForm.addEventListener('load', function() {
                const iframeDoc = hsForm.contentDocument || hsForm.contentWindow.document;
                const form = iframeDoc.querySelector('form');
                
                if (form) {
                    form.addEventListener('submit', function() {
                        // Redirect to thank you page after form submission
                        setTimeout(function() {
                            window.location.href = 'thankyou.html';
                        }, 1000);
                    });
                }
            });
        }
    }, 500);
    
    // Add scroll functionality to form on desktop
    if (window.innerWidth > 768) {
        const formContainer = document.getElementById('formContainer');
        const formWrapper = document.querySelector('.form-wrapper');
        
        if (formContainer && formWrapper) {
            formContainer.style.overflow = 'hidden';
            formWrapper.style.height = '568px';
            formWrapper.style.overflowY = 'auto';
            formWrapper.style.paddingRight = '15px';
            
            // Add custom scrollbar styling
            formWrapper.style.scrollbarWidth = 'thin';
            formWrapper.style.scrollbarColor = 'var(--primary) var(--light-gray)';
            
            // Show scroll indicator
            const scrollIndicator = document.querySelector('.form-scroll-indicator');
            if (scrollIndicator) {
                scrollIndicator.style.display = 'block';
                
                // Hide indicator when user scrolls
                formWrapper.addEventListener('scroll', function() {
                    if (formWrapper.scrollTop > 50) {
                        scrollIndicator.style.opacity = '0';
                        scrollIndicator.style.transition = 'opacity 0.5s ease';
                    } else {
                        scrollIndicator.style.opacity = '1';
                    }
                });
            }
        }
    }
});

// Ensure form is scrollable on mobile
if (window.innerWidth <= 768) {
    const formWrapper = document.querySelector('.form-wrapper');
    if (formWrapper) {
        formWrapper.style.height = 'auto';
        formWrapper.style.minHeight = '600px';
    }
}