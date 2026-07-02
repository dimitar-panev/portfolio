document.addEventListener('DOMContentLoaded', () => {
    const themeSwitcher = document.getElementById('theme-switcher');
    const htmlElement = document.documentElement; // Target <html> element for theme classes
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');

    // --- Mobile Menu Toggle ---
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            mainNav.classList.toggle('mobile-open');
        });

        // Close menu when clicking on a navigation link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                mainNav.classList.remove('mobile-open');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            if (!mainNav.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
                mobileMenuToggle.classList.remove('active');
                mainNav.classList.remove('mobile-open');
            }
        });
    }

    // --- Theme Switching Logic ---
    const K_THEME_KEY = 'portfolio_theme_lofi_serenity';
    const K_LIGHT_THEME_CLASS = 'theme-serene-dawn'; // Default theme
    const K_DARK_THEME_CLASS = 'theme-quiet-night';

    // Determine initial theme: localStorage, then system preference
    let preferredTheme = localStorage.getItem(K_THEME_KEY);
    if (!preferredTheme) {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            preferredTheme = K_DARK_THEME_CLASS;
        } else {
            preferredTheme = K_LIGHT_THEME_CLASS; 
        }
    }
    
    let currentTheme = preferredTheme;

    function applyTheme(theme) {
        // Remove all potential theme classes first
        htmlElement.classList.remove(K_LIGHT_THEME_CLASS, K_DARK_THEME_CLASS);
        
        // Add the new theme class
        htmlElement.classList.add(theme);
        
        localStorage.setItem(K_THEME_KEY, theme);
        currentTheme = theme; // Update the global tracker
    }

    if (themeSwitcher) {
        themeSwitcher.addEventListener('click', () => {
            if (currentTheme === K_DARK_THEME_CLASS) {
                applyTheme(K_LIGHT_THEME_CLASS);
            } else {
                applyTheme(K_DARK_THEME_CLASS);
            }
        });
    }

    // Apply initial theme on load
    applyTheme(currentTheme);

});