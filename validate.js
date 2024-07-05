document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('form').addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent the form from submitting

        // Get form field values
        const name = document.querySelector('input[name="name"]').value.trim();
        const email = document.querySelector('input[name="email"]').value.trim();
        const message = document.querySelector('textarea[name="message"]').value.trim();

        // Basic form validation
        if (!name || !email || !message) {
            customAlert("All fields are required.", "error");
            return;
        } else if (!validateEmail(email)) {
            customAlert("Please enter a valid email address.", "error");
            return;
        }

        // Data to be sent to the server (Google Apps Script in this case)
        const formData = {
            name: name,
            email: email,
            message: message
        };

        // Submit the form data to the server using fetch API
        submitFormData(formData);
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function submitFormData(formData) {
        // Replace 'YOUR_WEB_APP_URL' with your Google Apps Script web app URL
        fetch('https://script.google.com/macros/s/AKfycbzrKP5kalfEQmhmmoDQMLFIEgDWJ7wBiVw6YrIBYgE989CoHvpzLJIthG9qAAJdSLkt/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.result === "success") {
                alert("Form submitted successfully");
                document.getElementById('form').reset(); // Reset the form after successful submission
            } else {
                throw new Error(`Error from server: ${data.message}`);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Failed to submit form. Please try again later.");
        });
    }

    function customAlert(message, type = "info") {
        // Customize how alerts are shown, e.g., using a modal or a different UI approach
        alert(message);
    }
});
