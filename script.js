document.addEventListener('DOMContentLoaded', () => {
    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body; // Define body here for broader scope if needed elsewhere
    const currentYearSpan = document.getElementById('current-year');

    // Set current year in footer
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Theme Switching Logic ---
    const K_THEME_KEY = 'portfolio_theme';
    const K_LIGHT_THEME_CLASS = 'theme-kyoto-fog'; // Represents the default state (no specific class on body)
    const K_DARK_THEME_CLASS = 'theme-midnight-mocha';
    const K_LIGHT_ICON = 'fa-sun'; // Icon to show when theme is DARK (indicates clicking will switch to LIGHT)
    const K_DARK_ICON = 'fa-moon'; // Icon to show when theme is LIGHT (indicates clicking will switch to DARK)

    let preferredTheme = localStorage.getItem(K_THEME_KEY);
    if (!preferredTheme) {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            preferredTheme = K_LIGHT_THEME_CLASS;
        } else {
            preferredTheme = K_DARK_THEME_CLASS; // Default to dark if no preference/localStorage
        }
    }
    
    let currentTheme = preferredTheme; // Keep track of the current theme

    function applyTheme(theme) {
        body.classList.remove(K_DARK_THEME_CLASS); // Always remove dark to reset to default light styles
        // Note: K_LIGHT_THEME_CLASS isn't added/removed from body as it's the default CSS :root state.
        // If you had multiple explicit light themes, you'd manage their classes here too.

        const themeSwitcherIcon = themeSwitcher ? themeSwitcher.querySelector('i') : null; // Check if switcher exists

        if (theme === K_DARK_THEME_CLASS) {
            body.classList.add(K_DARK_THEME_CLASS);
            if (themeSwitcherIcon) {
                themeSwitcherIcon.classList.remove(K_DARK_ICON);
                themeSwitcherIcon.classList.add(K_LIGHT_ICON);
            }
        } else { // Theme is light (Kyoto Fog)
            if (themeSwitcherIcon) {
                themeSwitcherIcon.classList.remove(K_LIGHT_ICON);
                themeSwitcherIcon.classList.add(K_DARK_ICON);
            }
        }
        localStorage.setItem(K_THEME_KEY, theme);
        currentTheme = theme; // Update the global tracker
    }

    if (themeSwitcher) { // Ensure the button exists on the page before adding listener
        themeSwitcher.addEventListener('click', () => {
            if (currentTheme === K_DARK_THEME_CLASS) {
                applyTheme(K_LIGHT_THEME_CLASS); // Switch to light
            } else {
                applyTheme(K_DARK_THEME_CLASS); // Switch to dark
            }
        });
    }

    // Apply initial theme on load
    applyTheme(currentTheme);

});