// main.js

document.addEventListener("DOMContentLoaded", function() {
    // --- 1. ELEMENT SELECTION ---
    const hamburger = document.getElementById('hamburger');
    const desktopNavLinks = document.getElementById('nav-links');
    const desktopAuthContainer = document.getElementById('auth-container');

    // --- 2. DYNAMIC MOBILE MENU CREATION ---
    // Create a container for the mobile menu that will slide in
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'nav-menu-mobile';
    document.body.appendChild(mobileMenu);

    // Clone the desktop links and auth container into the mobile menu
    if (desktopNavLinks) {
        mobileMenu.appendChild(desktopNavLinks.cloneNode(true));
    }
    if (desktopAuthContainer) {
        const mobileAuthContainer = document.createElement('div');
        mobileAuthContainer.id = 'auth-container-mobile'; // Give it a unique ID
        mobileAuthContainer.className = 'nav-auth';
        mobileMenu.appendChild(mobileAuthContainer);
    }
    
    // --- 3. HAMBURGER MENU LOGIC ---
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    // --- 4. DYNAMIC AUTH BUTTON LOGIC ---
    // This function populates a container with the correct auth buttons
    function populateAuthButtons(container, isMobile) {
        const token = localStorage.getItem('token');
        const logoutId = isMobile ? 'logout-button-nav-mobile' : 'logout-button-nav';

        if (token) {
            // If the token exists, show Dashboard and Logout
            container.innerHTML = `
                <a href="dashboard.html" class="btn-secondary-nav">Dashboard</a>
                <a href="#" id="${logoutId}" class="btn btn-primary">Logout</a>
            `;
            const logoutButton = document.getElementById(logoutId);
            if (logoutButton) {
                logoutButton.addEventListener('click', (event) => {
                    event.preventDefault();
                    localStorage.removeItem('token');
                    window.location.href = 'index.html'; // Redirect to home after logout
                });
            }
        } else {
            // If no token, show Login / Register
            container.innerHTML = `
                <a href="auth.html" class="btn btn-primary">Login / Register</a>
            `;
        }
    }

    // Populate the desktop auth buttons
    if (desktopAuthContainer) {
        populateAuthButtons(desktopAuthContainer, false);
    }

    // Populate the mobile auth buttons
    const mobileAuthContainer = document.getElementById('auth-container-mobile');
    if (mobileAuthContainer) {
        populateAuthButtons(mobileAuthContainer, true);
    }
});