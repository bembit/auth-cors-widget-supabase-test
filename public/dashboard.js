document.addEventListener('DOMContentLoaded', function () {
    const welcomeMessage = document.getElementById('welcome-message');
    const username = localStorage.getItem('username');

    if (username) {
        welcomeMessage.textContent += username;
    } else {
        // Redirect to login if not authenticated
        window.location.href = 'index.html';
    }

    document.getElementById('logout-button').addEventListener('click', function () {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.href = 'index.html';
    });
});
