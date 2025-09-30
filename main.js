document.addEventListener("DOMContentLoaded", function() {
    // --- Hamburger Menu Logic ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    // Create the mobile menu container and clone content into it
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'nav-menu-mobile';
    if(navMenu) {
        mobileMenu.innerHTML = navMenu.innerHTML;
        document.body.appendChild(mobileMenu);
    }
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    // --- Dynamic Auth Button Logic ---
    function populateAuthButtons(container, isMobile) {
        if (!container) return;
        const token = localStorage.getItem('token');
        const logoutId = isMobile ? 'logout-button-nav-mobile' : 'logout-button-nav';
        
        if (token) {
            container.innerHTML = `
                <a href="dashboard.html" class="btn-secondary-nav">Dashboard</a>
                <a href="#" id="${logoutId}" class="btn btn-primary">Logout</a>
            `;
            const logoutButton = document.getElementById(logoutId);
            if (logoutButton) {
                logoutButton.addEventListener('click', (event) => {
                    event.preventDefault();
                    localStorage.removeItem('token');
                    window.location.href = 'index.html';
                });
            }
        } else {
            container.innerHTML = `<a href="auth.html" class="btn btn-primary">Login / Register</a>`;
        }
    }

    // Populate both the desktop and mobile auth buttons
    populateAuthButtons(document.getElementById('auth-container'), false);
    populateAuthButtons(mobileMenu.querySelector('.nav-auth'), true);
});