document.addEventListener('DOMContentLoaded', async function () {
    const welcomeMessage = document.getElementById('welcome-message');
    const username = localStorage.getItem('username');
    const stateCheckbox = document.getElementById('state-checkbox');
    const token = localStorage.getItem('token');

    if (username) {
        welcomeMessage.textContent += username;
    } else {
        window.location.href = 'index.html'; // Redirect to login if not authenticated
    }

    // Fetch the checkbox state from the server
    try {
        const response = await fetch('http://localhost:3000/api/checkbox/checkbox-state', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        const data = await response.json();

        if (response.ok) {
            stateCheckbox.checked = data.isChecked;
        } else {
            console.error('Error fetching checkbox state:', data.message);
        }
    } catch (error) {
        console.error('Error fetching checkbox state:', error);
    }

    // Save the checkbox state to the server
    document.getElementById('save-button').addEventListener('click', async function () {
        try {
            const response = await fetch('http://localhost:3000/api/checkbox/checkbox-state', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ isChecked: stateCheckbox.checked })
            });

            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error('Error saving checkbox state:', error);
        }
    });

    // inprog with ui
    document.getElementById('add-domain-button').addEventListener('click', async () => {
        const newDomainInput = document.getElementById('new-domain');
        const newDomain = newDomainInput.value.trim();
    
        if (!newDomain) {
            alert('Please enter a domain.');
            return;
        }
    
        try {
            const response = await fetch('/api/cors/cors-preferences', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Ensure `token` is defined and valid
                },
                body: JSON.stringify({ domain: newDomain }),
            });
    
            const data = await response.json();
            if (response.ok) {
                // Update the UI with the new domain
                // For example, refresh the list of domains or append the new domain to a list
                newDomainInput.value = ''; // Clear input field
                console.log('Domain added successfully:', data);
                // Optionally update the UI here
            } else {
                console.error('Failed to add domain:', data.message);
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An unexpected error occurred. Please try again later.');
        }
    });


    // Logout
    document.getElementById('logout-button').addEventListener('click', function () {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.href = 'index.html';
    });
});
