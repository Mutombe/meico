/**
 * Main JavaScript Entry Point
 * Coordinates all modules and initializes the application
 * Future React: App.js or index.js
 */

// Import modules (when using ES6 modules)
// import { Navigation } from './modules/navigation.js';
// import { Animations } from './modules/animations.js';
// import { Forms } from './modules/forms.js';
// import { Countdown } from './modules/countdown.js';
// import { Particles } from './modules/particles.js';

(function(window, document) {
    'use strict';

    /**
     * Application Configuration
     * Future React: config.js or environment variables
     */
    const CONFIG = {
        // Animation settings
        animation: {
            offset: '93%',
            defaultDuration: '1s',
            defaultDelay: '0s'
        },
        
        // Countdown settings
        countdown: {
            targetDate: '', // Empty for "Coming Soon"
            format: 'D:H:M:S'
        },
        
        // Particles settings
        particles: {
            count: 30,
            color: '#fff',
            lineColor: '#2b56f5',
            opacity: 0.3,
            size: 6,
            speed: 6
        },
        
        // Form settings
        forms: {
            contactFormId: 'contact-form',
            newsletterFormId: 'subscribe-form',
            apiEndpoint: 'https://api.web3forms.com/submit'
        },
        
        // Navigation settings
        navigation: {
            stickyOffset: 80,
            scrollSpeed: 1000,
            scrollEasing: 'easeInOutExpo'
        }
    };

    /**
     * Application State
     * Future React: useState, useContext
     */
    const state = {
        isMenuOpen: false,
        activeSection: null,
        isScrolling: false,
        windowWidth: window.innerWidth
    };

    /**
     * DOM Element Cache
     * Future React: useRef
     */
    const elements = {
        header: null,
        navbar: null,
        navToggle: null,
        navMenu: null,
        menuLinks: null,
        preloader: null,
        loader: null
    };

    /**
     * Initialize DOM element cache
     */
    function cacheElements() {
        elements.header = document.querySelector('.site-header');
        elements.navbar = document.querySelector('#mainnav');
        elements.navToggle = document.querySelector('.navbar-toggler');
        elements.navMenu = document.querySelector('#navbarToggle');
        elements.menuLinks = document.querySelectorAll('.menu-link');
        elements.preloader = document.querySelector('#preloader');
        elements.loader = document.querySelector('#loader');
    }

    /**
     * Initialize all modules
     */
    function init() {
        console.log('Initializing Meico application...');
        
        // Cache DOM elements
        cacheElements();
        
        // Initialize modules
        initNavigation();
        initAnimations();
        initForms();
        initCountdown();
        initParticles();
        initPreloader();
        initAccordion();
        initTabs();
        
        // Set up event listeners
        setupEventListeners();
        
        console.log('Meico application initialized successfully');
    }

    /**
     * Set up global event listeners
     */
    function setupEventListeners() {
        // Window resize handler
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                state.windowWidth = window.innerWidth;
                handleResize();
            }, 250);
        });

        // Window scroll handler (throttled)
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (!scrollTimeout) {
                scrollTimeout = setTimeout(function() {
                    handleScroll();
                    scrollTimeout = null;
                }, 100);
            }
        });
    }

    /**
     * Handle window resize
     */
    function handleResize() {
        // Close mobile menu on desktop
        if (state.windowWidth >= 992 && state.isMenuOpen) {
            closeMenu();
        }
    }

    /**
     * Handle window scroll
     */
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Sticky header
        if (elements.header && elements.navbar) {
            const navOffset = elements.navbar.offsetTop;
            if (scrollTop > navOffset && (state.windowWidth > 991 || elements.header.classList.contains('mobile-sticky'))) {
                elements.header.classList.add('has-fixed');
            } else {
                elements.header.classList.remove('has-fixed');
            }
        }
    }

    /**
     * Initialize Navigation
     * Future React: <Navbar> component with hooks
     */
    function initNavigation() {
        if (!elements.navToggle || !elements.menuLinks) return;

        // Mobile menu toggle
        elements.navToggle.addEventListener('click', toggleMenu);

        // Smooth scroll for menu links
        elements.menuLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Only handle anchor links
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        const headerHeight = state.windowWidth >= 992 ? elements.navbar.offsetHeight - 1 : 0;
                        const targetPosition = targetElement.offsetTop - headerHeight;
                        
                        smoothScrollTo(targetPosition, CONFIG.navigation.scrollSpeed);
                        
                        // Close mobile menu
                        if (state.windowWidth < 992) {
                            closeMenu();
                        }
                    }
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (state.isMenuOpen && 
                !elements.navMenu.contains(e.target) && 
                !elements.navToggle.contains(e.target)) {
                closeMenu();
            }
        });
    }

    /**
     * Toggle mobile menu
     */
    function toggleMenu() {
        state.isMenuOpen = !state.isMenuOpen;
        
        if (state.isMenuOpen) {
            elements.navMenu.classList.add('show');
            elements.header.classList.add('active');
        } else {
            closeMenu();
        }
    }

    /**
     * Close mobile menu
     */
    function closeMenu() {
        state.isMenuOpen = false;
        elements.navMenu.classList.remove('show');
        elements.header.classList.remove('active');
    }

    /**
     * Smooth scroll to position
     */
    function smoothScrollTo(targetPosition, duration) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    /**
     * Initialize Animations
     * Future React: Framer Motion or react-intersection-observer
     */
    function initAnimations() {
        const animatedElements = document.querySelectorAll('.animated');
        
        if (animatedElements.length === 0) return;

        // Use Intersection Observer for better performance
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animationType = element.getAttribute('data-animate') || 'fadeInUp';
                    const duration = element.getAttribute('data-duration');
                    const delay = element.getAttribute('data-delay');

                    element.style.visibility = 'visible';
                    element.classList.add('animated', animationType);

                    if (duration) {
                        element.style.animationDuration = duration + 's';
                    }
                    if (delay) {
                        element.style.animationDelay = delay + 's';
                    }

                    observer.unobserve(element);
                }
            });
        }, observerOptions);

        animatedElements.forEach(function(element) {
            observer.observe(element);
        });
    }

    /**
     * Initialize Forms
     * Future React: react-hook-form
     */
    function initForms() {
        // Contact form
        const contactForm = document.getElementById(CONFIG.forms.contactFormId);
        if (contactForm) {
            contactForm.addEventListener('submit', handleContactFormSubmit);
        }

        // Newsletter form
        const newsletterForm = document.getElementById(CONFIG.forms.newsletterFormId);
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', handleNewsletterFormSubmit);
        }

        // Input field focus effects
        const inputFields = document.querySelectorAll('.input-line');
        inputFields.forEach(function(input) {
            if (input.value.length > 0) {
                input.parentElement.classList.add('input-focused');
            }

            input.addEventListener('focus', function() {
                this.parentElement.classList.add('input-focused');
            });

            input.addEventListener('blur', function() {
                if (this.value.length === 0) {
                    this.parentElement.classList.remove('input-focused');
                }
            });
        });
    }

    /**
     * Handle contact form submission
     */
    function handleContactFormSubmit(e) {
        e.preventDefault();
        // Form validation would go here
        // For now, just show the popup
        openPopup('popup1');
    }

    /**
     * Handle newsletter form submission
     */
    function handleNewsletterFormSubmit(e) {
        e.preventDefault();
        // Form validation would go here
        // For now, just show the popup
        openPopup('popup');
    }

    /**
     * Open popup modal
     * Future React: Modal component with state
     */
    function openPopup(popupId) {
        const popup = document.getElementById(popupId);
        if (popup) {
            popup.classList.add(popupId === 'popup' ? 'open-popup' : 'open-popup1');
        }
    }

    /**
     * Close popup modal
     * Future React: Modal component with state
     */
    function closePopup(popupId) {
        const popup = document.getElementById(popupId);
        if (popup) {
            popup.classList.remove(popupId === 'popup' ? 'open-popup' : 'open-popup1');
            window.location.reload();
        }
    }

    // Expose popup functions globally for inline onclick handlers
    window.openPopup = function() { openPopup('popup'); };
    window.closePopup = function() { closePopup('popup'); };
    window.openPopup1 = function() { openPopup('popup1'); };
    window.closePopup1 = function() { closePopup('popup1'); };

    /**
     * Initialize Countdown
     * Future React: Custom countdown component with useEffect
     */
    function initCountdown() {
        const countdownElement = document.querySelector('.token-countdown');
        if (!countdownElement) return;

        const targetDate = countdownElement.getAttribute('data-date');
        
        // If no date is set, show "Coming Soon"
        if (!targetDate) {
            countdownElement.innerHTML = '<p style="color: rgba(255,255,255,0.6);">Date to be announced</p>';
            return;
        }

        // Countdown logic would go here
        // Using a library like countdown.js or custom implementation
    }

    /**
     * Initialize Particles.js
     * Future React: react-tsparticles
     */
    function initParticles() {
        const particlesContainer = document.getElementById('particles-js');
        if (!particlesContainer || typeof particlesJS === 'undefined') return;

        particlesJS('particles-js', {
            particles: {
                number: {
                    value: CONFIG.particles.count,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: CONFIG.particles.color
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: CONFIG.particles.opacity,
                    random: false
                },
                size: {
                    value: CONFIG.particles.size,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: CONFIG.particles.lineColor,
                    opacity: 0.5,
                    width: 1.3
                },
                move: {
                    enable: true,
                    speed: CONFIG.particles.speed,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }

    /**
     * Initialize Preloader
     * Future React: Loading component with state
     */
    function initPreloader() {
        if (!elements.preloader || !elements.loader) return;

        window.addEventListener('load', function() {
            elements.loader.style.opacity = '0';
            setTimeout(function() {
                elements.loader.style.display = 'none';
                document.body.classList.add('loaded');
                elements.preloader.style.opacity = '0';
                setTimeout(function() {
                    elements.preloader.style.display = 'none';
                }, 300);
            }, 700);
        });
    }

    /**
     * Initialize Accordion
     * Future React: Accordion component with state
     */
    function initAccordion() {
        const accordionHeaders = document.querySelectorAll('.accordion-s2 .card-header a');
        
        accordionHeaders.forEach(function(header) {
            header.addEventListener('click', function(e) {
                e.preventDefault();
                const card = this.closest('.card');
                const allCards = document.querySelectorAll('.accordion-s2 .card');
                
                // Remove active class from all cards
                allCards.forEach(function(c) {
                    if (c !== card) {
                        c.classList.remove('active');
                    }
                });
                
                // Toggle active class on clicked card
                card.classList.toggle('active');
            });
        });
    }

    /**
     * Initialize Tabs
     * Future React: Tabs component with state
     */
    function initTabs() {
        const tabLinks = document.querySelectorAll('.nav-tabs .nav-link');
        
        tabLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all tabs
                tabLinks.forEach(function(l) {
                    l.classList.remove('active');
                });
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Show corresponding tab content
                const targetId = this.getAttribute('href');
                const allTabPanes = document.querySelectorAll('.tab-pane');
                
                allTabPanes.forEach(function(pane) {
                    pane.classList.remove('show', 'active');
                });
                
                const targetPane = document.querySelector(targetId);
                if (targetPane) {
                    targetPane.classList.add('show', 'active');
                }
            });
        });
    }

    /**
     * Initialize application when DOM is ready
     */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})(window, document);
