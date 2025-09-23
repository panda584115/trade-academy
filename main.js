// main.js

document.addEventListener("DOMContentLoaded", function() {
    // --- 1. Hamburger Menu Logic ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // --- 2. Dynamic Auth Button Logic ---
    const authContainer = document.getElementById('auth-container');
    const token = localStorage.getItem('token');

    if (authContainer) {
        if (token) {
            // If the token exists, show Dashboard and Logout
            authContainer.innerHTML = `
                <a href="dashboard.html" class="btn-secondary-nav">Dashboard</a>
                <a href="#" id="logout-button-nav" class="btn btn-primary">Logout</a>
            `;

            // Add event listener for the new logout button
            const logoutButton = document.getElementById('logout-button-nav');
            if (logoutButton) {
                logoutButton.addEventListener('click', (event) => {
                    event.preventDefault();
                    localStorage.removeItem('token');
                    alert('You have been logged out.');
                    window.location.href = 'index.html';
                });
            }

        } else {
            // If no token, show Login / Register
            authContainer.innerHTML = `
                <a href="auth.html" class="btn btn-primary">Login / Register</a>
            `;
        }
    }
});