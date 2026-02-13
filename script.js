// Newsletter Subscription Logic
document.addEventListener('DOMContentLoaded', () => {
    const newsletterSection = document.querySelector('.foot-panel1');
    if (newsletterSection) {
        const input = newsletterSection.querySelector('input');
        const btn = newsletterSection.querySelector('button');

        if (btn && input) {
            btn.onclick = async (e) => {
                e.preventDefault();
                const email = input.value.trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!email) {
                    alert("Please enter your email!");
                    return;
                }

                if (!emailRegex.test(email)) {
                    alert("Please enter a valid email address (e.g., name@example.com)");
                    return;
                }

                try {
                    const response = await fetch('/api/subscribe', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email })
                    });
                    const data = await response.json();
                    alert(data.message);
                    if (response.ok) input.value = '';
                } catch (err) {
                    alert("Error connecting to server.");
                }
            };
        }
    }
});

// Featured/Index specific button logic (if still needed)
const indexBtn = document.getElementById("indexbtn");
if (indexBtn) {
    indexBtn.onclick = () => {
        alert("Countdown to savings! Our clearance sale launches next season—don’t miss it!");
    };
}

const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

// Sidebar Functionality
document.addEventListener('DOMContentLoaded', () => {
    const panelAll = document.querySelector('.panel-all');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const sidebarClose = document.getElementById('sidebar-close');

    function openSidebar() {
        if (sidebar) sidebar.classList.add('active');
        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeSidebar() {
        if (sidebar) sidebar.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    if (panelAll) {
        panelAll.addEventListener('click', openSidebar);
    }

    if (sidebarClose) {
        sidebarClose.addEventListener('click', closeSidebar);
    }

    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }
});