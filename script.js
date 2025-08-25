// Mobile Menu Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
        }
    });
});

// Form submission with reCAPTCHA
document.getElementById('roofingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate reCAPTCHA
    const recaptchaResponse = grecaptcha.getResponse();
    if (!recaptchaResponse) {
        alert('Please complete the reCAPTCHA verification.');
        return;
    }
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        issue: document.getElementById('issue').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString(),
        recaptcha: recaptchaResponse
    };
    
    // Store form data in sessionStorage for thank you page
    sessionStorage.setItem('formData', JSON.stringify(formData));
    
    // Send data to Go HighLevel CRM
    sendToGoHighLevel(formData);
});

// Function to send form data to Go HighLevel CRM
function sendToGoHighLevel(formData) {
    // Replace with your Go HighLevel form endpoint
    // You can find this in your Go HighLevel account under:
    // Settings → Inbound Form → Create Inbound Form
    const goHighLevelEndpoint = 'https://services.leadconnectorhq.com/hooks/YOUR_FORM_ID/webhook-trigger/YOUR_WEBHOOK_ID';
    
    // Prepare data for Go HighLevel
    const highLevelData = {
        formId: 'YOUR_FORM_ID', // Replace with your form ID
        firstName: formData.name.split(' ')[0],
        lastName: formData.name.split(' ').slice(1).join(' ') || 'Not provided',
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        source: 'Website Form',
        notes: `Roofing Issue: ${formData.issue}\nAdditional Details: ${formData.message}`
    };
    
    // Send data to Go HighLevel
    fetch(goHighLevelEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(highLevelData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Successfully sent to Go HighLevel:', data);
        // Redirect to thank you page
        window.location.href = 'thankyou.html';
    })
    .catch((error) => {
        console.error('Error sending to Go HighLevel:', error);
        // Fallback: Still redirect to thank you page even if CRM submission fails
        window.location.href = 'thankyou.html';
    });
}

// Ensure form is scrollable on mobile
if (window.innerWidth <= 768) {
    const formWrapper = document.querySelector('.form-wrapper');
    if (formWrapper) {
        formWrapper.style.height = 'auto';
        formWrapper.style.minHeight = '600px';
    }
}
