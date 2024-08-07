// (async () => {
//   const apiUrl = 'http://localhost:3000/api/checkbox-state';

//   // Create a container for the widget
//   const container = document.createElement('div');
//   container.id = 'widget-container';
//   container.style.border = '1px solid #ccc';
//   container.style.padding = '10px';
//   container.style.width = '200px';

//   // Create the checkbox
//   const checkbox = document.createElement('input');
//   checkbox.type = 'checkbox';
//   checkbox.id = 'widget-checkbox';
//   checkbox.style.marginRight = '10px';

//   // Create a label for the checkbox
//   const label = document.createElement('label');
//   label.innerText = 'Enable feature';
//   label.setAttribute('for', 'widget-checkbox');

//   // Append the checkbox and label to the container
//   container.appendChild(checkbox);
//   container.appendChild(label);

//   // Append the container to the body (or any other element)
//   document.body.appendChild(container);

//   // Fetch the current checkbox state from the server
//   const response = await fetch(apiUrl);
//   const data = await response.json();
//   checkbox.checked = data.checked;

//   // Add an event listener to handle checkbox state changes
//   checkbox.addEventListener('change', async () => {
//     const newState = checkbox.checked;

//     await fetch(apiUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ checked: newState }),
//     });
//   });
// })();

document.addEventListener('DOMContentLoaded', async () => {
	const userId = '21'; // Replace with the dynamic user ID if available
	const apiUrl = `http://localhost:3000/api/checkbox-state?userId=${userId}`;

	// Create a container for the widget
	const container = document.createElement('div');
	container.id = 'widget-container';
	container.style.border = '1px solid #ccc';
	container.style.padding = '10px';
	container.style.width = '200px';

	// Create the checkbox
	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	checkbox.id = 'widget-checkbox';
	checkbox.style.marginRight = '10px';

	// Create a label for the checkbox
	const label = document.createElement('label');
	label.innerText = 'Feature status of User 21 asd';
	label.setAttribute('for', 'widget-checkbox');

	// Append the checkbox and label to the container
	container.appendChild(checkbox);
	container.appendChild(label);

	// Ensure the body element exists before appending the widget
	if (document.body) {
		document.body.appendChild(container);
	} else {
		console.error('The document body is not available');
	}

	// Fetch the current checkbox state from the server
	try {
		const response = await fetch(apiUrl);
		if (response.ok) {
			const data = await response.json();
			checkbox.checked = data.checked;
		} else {
			console.error('Failed to fetch checkbox state:', await response.json());
		}
	} catch (error) {
		console.error('Error fetching checkbox state:', error);
	}

	// Add an event listener to handle checkbox state changes
	checkbox.addEventListener('change', async () => {
		const newState = checkbox.checked;

		try {
			const response = await fetch(apiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ checked: newState }),
			});

			if (!response.ok) {
				console.error('Failed to update checkbox state:', await response.json());
			}
		} catch (error) {
			console.error('Error updating checkbox state:', error);
		}
	});
});
