/**
 * Soodong Park - Portfolio
 * JavaScript for interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle (dark/light mode)
    const THEME_KEY = 'portfolio-theme';
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        themeToggle?.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
        themeToggle?.setAttribute('title', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
        try {
            localStorage.setItem(THEME_KEY, theme);
        } catch (e) { /* ignore */ }
    }

    function initTheme() {
        try {
            const saved = localStorage.getItem(THEME_KEY);
            if (saved === 'light' || saved === 'dark') {
                setTheme(saved);
                return;
            }
        } catch (e) { /* ignore */ }
        setTheme('dark');
    }

    initTheme();

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = html.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            setTheme(next);
        });
    }

    // Profile image fallback if image fails to load
    const profileImage = document.getElementById('profileImage');
    const profileFallback = document.getElementById('profileFallback');

    if (profileImage) {
        profileImage.onerror = () => {
            profileImage.style.display = 'none';
            profileFallback?.classList.add('visible');
        };
    }

    // AI Projects button - show modal with list of AI projects
    const aiProjectsBtn = document.getElementById('aiProjectsBtn');
    const aiProjectsModal = document.getElementById('aiProjectsModal');
    const aiProjectsBackdrop = document.getElementById('aiProjectsBackdrop');
    const aiProjectsClose = document.getElementById('aiProjectsClose');

    function openAiProjectsModal() {
        aiProjectsModal?.setAttribute('aria-hidden', 'false');
        aiProjectsModal?.classList.add('open');
    }

    function closeAiProjectsModal() {
        aiProjectsModal?.setAttribute('aria-hidden', 'true');
        aiProjectsModal?.classList.remove('open');
    }

    if (aiProjectsBtn) {
        aiProjectsBtn.addEventListener('click', openAiProjectsModal);
    }
    if (aiProjectsBackdrop) {
        aiProjectsBackdrop.addEventListener('click', closeAiProjectsModal);
    }
    if (aiProjectsClose) {
        aiProjectsClose.addEventListener('click', closeAiProjectsModal);
    }

    // Publications button - open modal
    const publicationsBtn = document.getElementById('publicationsBtn');
    const publicationsModal = document.getElementById('publicationsModal');
    const publicationsBackdrop = document.getElementById('publicationsBackdrop');
    const publicationsClose = document.getElementById('publicationsClose');

    function openPublicationsModal() {
        publicationsModal?.setAttribute('aria-hidden', 'false');
        publicationsModal?.classList.add('open');
    }

    function closePublicationsModal() {
        publicationsModal?.setAttribute('aria-hidden', 'true');
        publicationsModal?.classList.remove('open');
    }

    if (publicationsBtn) {
        publicationsBtn.addEventListener('click', openPublicationsModal);
    }
    if (publicationsBackdrop) {
        publicationsBackdrop.addEventListener('click', closePublicationsModal);
    }
    if (publicationsClose) {
        publicationsClose.addEventListener('click', closePublicationsModal);
    }

    // Contact button - smooth scroll to contact section
    const contactBtn = document.getElementById('contactBtn');
    if (contactBtn) {
        contactBtn.addEventListener('click', () => {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Email button - click event with feedback
    const emailBtn = document.getElementById('emailBtn');
    const clickMessage = document.getElementById('clickMessage');

    if (emailBtn && clickMessage) {
        emailBtn.addEventListener('click', () => {
            // Simulate opening email client (update with your actual email)
            const email = 'soodong.park@example.com';
            const subject = encodeURIComponent('Portfolio Inquiry');
            const body = encodeURIComponent('Hello Soodong,\n\nI came across your portfolio and would like to connect...');
            
            // Show click feedback
            clickMessage.textContent = 'Opening email client...';
            clickMessage.style.opacity = '1';

            // Open mailto link
            window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;

            // Update message after a delay
            setTimeout(() => {
                clickMessage.textContent = 'Thanks for reaching out! I\'ll get back to you soon.';
            }, 1500);
        });
    }

    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu when clicking a nav link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    // Add subtle animation on scroll for project cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.project-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // Ask Soodong's AI Agent (Anthropic API)
    const CHAT_API = (() => {
        const port = 3001;
        if (window.location.protocol === 'file:') return `http://localhost:${port}`;
        const { hostname } = window.location;
        return `http://${hostname}:${port}`;
    })();
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotPanel = document.getElementById('chatbotPanel');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotForm = document.getElementById('chatbotForm');
    const chatbotInput = document.getElementById('chatbotInput');

    let chatHistory = [];

    function appendMessage(role, content, isError = false) {
        const div = document.createElement('div');
        div.className = `chat-message ${role}${isError ? ' chat-error' : ''}`;
        const p = document.createElement('p');
        p.textContent = content;
        div.appendChild(p);
        chatbotMessages.appendChild(div);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function appendLoading() {
        const div = document.createElement('div');
        div.className = 'chat-message bot loading';
        div.innerHTML = '<p class="typing-dots"><span></span><span></span><span></span></p>';
        div.dataset.loading = 'true';
        chatbotMessages.appendChild(div);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function removeLoading() {
        const loading = chatbotMessages.querySelector('[data-loading="true"]');
        if (loading) loading.remove();
    }

    async function sendMessage(userText) {
        chatHistory.push({ role: 'user', content: userText });
        appendMessage('user', userText);

        appendLoading();
        const sendBtn = chatbotForm?.querySelector('.chatbot-send');
        if (sendBtn) sendBtn.disabled = true;

        try {
            const res = await fetch(`${CHAT_API}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: chatHistory })
            });
            const data = await res.json();

            removeLoading();

            if (!res.ok) {
                appendMessage('bot', data.message || data.error || 'Something went wrong. Make sure the API server is running and ANTHROPIC_API_KEY is set.', true);
                return;
            }

            chatHistory.push({ role: 'assistant', content: data.content });
            appendMessage('bot', data.content);
        } catch (err) {
            removeLoading();
            appendMessage('bot', 'Could not reach the chat server. Start it with: cd server && npm install && npm start', true);
        } finally {
            if (sendBtn) sendBtn.disabled = false;
        }
    }

    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', () => {
            const isOpen = chatbotPanel?.classList.toggle('open');
            document.getElementById('chatbot')?.setAttribute('aria-hidden', String(!isOpen));
            if (isOpen) chatbotInput?.focus();
        });
    }

    if (chatbotClose) {
        chatbotClose.addEventListener('click', () => {
            chatbotPanel?.classList.remove('open');
            document.getElementById('chatbot')?.setAttribute('aria-hidden', 'true');
        });
    }

    if (chatbotForm && chatbotInput) {
        chatbotForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = chatbotInput.value.trim();
            if (!text) return;
            chatbotInput.value = '';
            sendMessage(text);
        });
    }
});
