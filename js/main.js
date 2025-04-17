/**
 * Masayuki Tanaka Portfolio - Main JavaScript
 * Handles animations and interactivity
 */

document.addEventListener('DOMContentLoaded', function() {
    // Fade-in animation for sections
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeCallback = function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const fadeObserver = new IntersectionObserver(fadeCallback, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });
    
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for potential fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to nav items on scroll (for future nav implementation)
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Function to potentially add navigation highlighting
        // To be implemented if navigation is added
    });

    // Add subtle parallax effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        const scrollPosition = window.scrollY;
        
        if (header && scrollPosition < header.offsetHeight) {
            header.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
        }
    });
});