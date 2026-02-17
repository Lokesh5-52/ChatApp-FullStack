const API_URL = 'http://localhost:8080';

// Handle Login
async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            // Save token AND email to identify current user later
            localStorage.setItem('token', data.token);
            localStorage.setItem('currentUserEmail', email);
            window.location.href = 'chat.html';
        } else {
            alert('Invalid credentials');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Handle Signup
async function signup() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        if (response.ok) {
            alert('Signup successful! Please login.');
            window.location.href = 'login.html';
        } else {
            alert('Signup failed');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Load Chat
async function loadChat() {
    const token = localStorage.getItem('token');
    const currentUserEmail = localStorage.getItem('currentUserEmail');
    
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch(`${API_URL}/messages`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
            const messages = await response.json();
            const container = document.getElementById('messages-container');
            container.innerHTML = ''; // Clear existing

            messages.forEach(msg => {
                const isMe = msg.sender.email === currentUserEmail;
                const div = document.createElement('div');
                div.className = `message ${isMe ? 'sent' : 'received'}`;
                
                div.innerHTML = `
                    ${!isMe ? `<span class="sender-name">${msg.sender.username}</span>` : ''}
                    ${msg.content}
                    <div class="meta">${new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                `;
                container.appendChild(div);
            });
            // Auto scroll to bottom
            container.scrollTop = container.scrollHeight;
        }
    } catch (error) {
        console.error('Error loading messages:', error);
    }
}

// Send Message
async function sendMessage() {
    const input = document.getElementById('message-input');
    const content = input.value;
    const token = localStorage.getItem('token');

    if (!content || !token) return;

    try {
        const response = await fetch(`${API_URL}/messages/send`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ content })
        });

        if (response.ok) {
            input.value = ''; // Clear input
            loadChat(); // Refresh chat (Simple polling simulation)
        }
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

// Logout
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUserEmail');
    window.location.href = 'login.html';
}

// Auto-refresh chat every 2 seconds (Simple polling)
if (window.location.pathname.endsWith('chat.html')) {
    loadChat();
    setInterval(loadChat, 2000); 
}