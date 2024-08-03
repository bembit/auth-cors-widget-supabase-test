document.getElementById('login-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Store the JWT token in localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', username);

            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        } else {
            // Display error message
            errorMessage.textContent = data.message;
        }
    } catch (error) {
        errorMessage.textContent = 'An error occurred. Please try again later.';
    }
});
