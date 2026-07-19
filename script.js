/**
 * Physics Lover 2.0 - Complete Core Logic (Perfect Edition)
 */

let deferredPrompt; // PWA Install ইভেন্ট স্টোর করার জন্য

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    setupNavigation();
    setupTopActions(); 
    setupQuickActions(); 
    fetchLatestNotes();
    fetchTopQuestions(); 
    fetchAnnouncements();
    setupPWAInstall(); 
    
    // Service Worker Registration for PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(() => console.log('Service Worker Registered Successfully'))
            .catch(err => console.error('Service Worker Registration Failed:', err));
    }
}

/**
 * ==========================================
 * 1. Mobile Navigation Logic
 * ==========================================
 */
function setupNavigation() {
    const menuBtn = document.getElementById('menuToggle');
    const sideNav = document.getElementById('sideNav');
    
    if (menuBtn && sideNav) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            sideNav.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!sideNav.contains(e.target) && !menuBtn.contains(e.target)) {
                sideNav.classList.remove('active');
            }
        });
    }
}

/**
 * ==========================================
 * 2. Theme Toggle & Live Search Logic
 * ==========================================
 */
function setupTopActions() {
    const themeBtn = document.getElementById('themeToggle');
    const searchBtn = document.querySelector('button[aria-label="Search"]');
    const searchDropdown = document.getElementById('searchDropdown');
    const closeSearchBtn = document.getElementById('closeSearchBtn');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const searchSuggestions = document.getElementById('searchSuggestions');

    // --- Theme Logic ---
    const currentTheme = localStorage.getItem('pl_theme');
    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
        if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const isLight = document.body.classList.contains('light-mode');
            localStorage.setItem('pl_theme', isLight ? 'light' : 'dark');
            themeBtn.innerHTML = isLight ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
        });
    }

    // --- Connected Search Logic ---
    if (searchBtn && searchDropdown) {
        searchBtn.addEventListener('click', () => {
            searchDropdown.classList.remove('hidden-search');
            if (searchInput) searchInput.value = '';
            if (searchResults) searchResults.classList.add('hidden-element');
            if (searchSuggestions) searchSuggestions.classList.remove('hidden-element');
            setTimeout(() => { if (searchInput) searchInput.focus(); }, 300); 
        });
    }

    if (closeSearchBtn && searchDropdown) {
        closeSearchBtn.addEventListener('click', () => {
            searchDropdown.classList.add('hidden-search');
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            
            if (query.length === 0) {
                if (searchResults) searchResults.classList.add('hidden-element');
                if (searchSuggestions) searchSuggestions.classList.remove('hidden-element');
                return;
            } else {
                if (searchResults) searchResults.classList.remove('hidden-element');
                if (searchSuggestions) searchSuggestions.classList.add('hidden-element');
            }

            searchResults.innerHTML = '';
            const searchableElements = document.querySelectorAll('.class-card, .feature-card, .note-item, .quick-action-card, .announcement-card');
            let resultsHTML = '';
            let matchCount = 0;

            searchableElements.forEach(el => {
                const titleEl = el.querySelector('h3, h4'); 
                if (!titleEl) return;
                
                const titleText = titleEl.innerText || titleEl.textContent;
                
                if (titleText.toLowerCase().includes(query)) {
                    let category = "Link";
                    let icon = "fa-link";
                    
                    if(el.classList.contains('class-card')) { category = "Class"; icon = "fa-graduation-cap"; }
                    else if(el.classList.contains('note-item')) { category = "Note"; icon = "fa-file-lines"; }
                    else if(el.classList.contains('feature-card')) { category = "Feature"; icon = "fa-star"; }
                    else if(el.classList.contains('announcement-card')) { category = "Update"; icon = "fa-bullhorn"; }

                    const link = el.getAttribute('href') || '#';

                    resultsHTML += `
                        <a href="${link}" class="search-result-item" onclick="document.getElementById('searchDropdown').classList.add('hidden-search')">
                            <i class="fa-solid ${icon} highlight-cyan" style="width: 25px; text-align: center;"></i>
                            <div class="search-result-title">${titleText}</div>
                            <span class="search-badge">${category}</span>
                        </a>
                    `;
                    matchCount++;
                }
            });

            if (matchCount === 0) {
                searchResults.innerHTML = `
                    <div class="state-message" style="padding: 20px;">
                        <i class="fa-solid fa-face-frown highlight-cyan" style="font-size: 1.5rem; margin-bottom: 10px;"></i>
                        <br>No matching content found.
                    </div>`;
            } else {
                searchResults.innerHTML = resultsHTML;
            }
        });
    }
}

// Global Helper function for suggestion tags
window.triggerSuggestion = function(text) {
    const input = document.getElementById('searchInput');
    if(input) {
        input.value = text;
        input.dispatchEvent(new Event('input'));
    }
};

/**
 * ==========================================
 * 3. Quick Actions & Local Storage
 * ==========================================
 */
function setupQuickActions() {
    // ডেমো ডেটা (যাতে এখন ক্লিক করলেই কাজ করে, পরে এগুলো অটোমেটিক সেট হবে)
    if (!localStorage.getItem('pl_lastClass')) {
        localStorage.setItem('pl_lastClass', JSON.stringify({ title: "Class 12", link: "class12.html" }));
    }
    if (!localStorage.getItem('pl_recentItems')) {
        const dummys = [
            { title: "Electrostatics Notes", sub: "Class 12 • Physics", icon: "fa-file-lines", link: "notes.html" },
            { title: "Kinematics MCQs", sub: "Class 11 • Questions", icon: "fa-clipboard-list", link: "question-bank.html" },
            { title: "Newton's Laws Video", sub: "Class 11 • Video", icon: "fa-youtube", link: "https://youtube.com/@physics_lover2.o" }
        ];
        localStorage.setItem('pl_recentItems', JSON.stringify(dummys));
    }
    if (!localStorage.getItem('pl_savedNotes')) {
        const saved = [
            { title: "Gravitation Formula Sheet", sub: "Class 11", icon: "fa-bookmark", link: "notes.html" },
            { title: "Thermodynamics Short Notes", sub: "Class 11", icon: "fa-bookmark", link: "notes.html" }
        ];
        localStorage.setItem('pl_savedNotes', JSON.stringify(saved));
    }

    // HTML Elements Connect
    const qaContinueSub = document.getElementById('qaContinueSub');
    const qaContinueLink = document.getElementById('qaContinueLink');
    const qaRecentSub = document.getElementById('qaRecentSub');
    const qaSavedSub = document.getElementById('qaSavedSub');
    
    // 1. Continue Learning
    const lastClass = JSON.parse(localStorage.getItem('pl_lastClass'));
    if (lastClass && lastClass.title) {
        if (qaContinueSub) qaContinueSub.innerText = lastClass.title;
        if (qaContinueLink) qaContinueLink.href = lastClass.link || '#';
    }

    // 2. Recently Opened (Modal Logic)
    const recentItems = JSON.parse(localStorage.getItem('pl_recentItems')) || [];
    if (qaRecentSub) qaRecentSub.innerText = recentItems.length > 0 ? `${recentItems.length} items viewed` : 'History empty';
    
    const qaRecentLink = document.getElementById('qaRecentLink');
    if (qaRecentLink) {
        qaRecentLink.addEventListener('click', () => {
            const listDiv = document.getElementById('recentList');
            if(!listDiv) return;
            listDiv.innerHTML = '';
            if (recentItems.length === 0) {
                listDiv.innerHTML = '<div class="state-message">No history found.</div>';
            } else {
                recentItems.slice(0, 4).forEach(item => {
                    let iconClass = item.icon.includes('youtube') ? 'fa-brands' : 'fa-solid';
                    listDiv.innerHTML += `
                        <a href="${item.link}" class="history-item">
                            <div class="history-icon"><i class="${iconClass} ${item.icon}"></i></div>
                            <div class="history-info">
                                <span class="history-title">${item.title}</span>
                                <span class="history-sub">${item.sub}</span>
                            </div>
                        </a>
                    `;
                });
            }
            openModal(document.getElementById('recentModal'));
        });
    }

    // 3. Saved Notes (Modal Logic)
    const savedNotes = JSON.parse(localStorage.getItem('pl_savedNotes')) || [];
    if (qaSavedSub) qaSavedSub.innerText = savedNotes.length > 0 ? `${savedNotes.length} notes saved` : '0 notes saved';

    const qaSavedLink = document.getElementById('qaSavedLink');
    if (qaSavedLink) {
        qaSavedLink.addEventListener('click', () => {
            const listDiv = document.getElementById('savedList');
            if(!listDiv) return;
            listDiv.innerHTML = '';
            if (savedNotes.length === 0) {
                listDiv.innerHTML = '<div class="state-message">No saved notes.</div>';
            } else {
                savedNotes.forEach(note => {
                    listDiv.innerHTML += `
                        <a href="${note.link}" class="history-item">
                            <div class="history-icon"><i class="fa-solid ${note.icon}"></i></div>
                            <div class="history-info">
                                <span class="history-title">${note.title}</span>
                                <span class="history-sub">${note.sub}</span>
                            </div>
                        </a>
                    `;
                });
            }
            openModal(document.getElementById('savedModal'));
        });
    }
}

/**
 * ==========================================
 * 4. Fetch JSON Data
 * ==========================================
 */
async function fetchLatestNotes() {
    const container = document.getElementById('latestNotesContainer');
    if (!container) return;
    try {
        const response = await fetch('assets/json/latest-notes.json');
        if (!response.ok) throw new Error('Network error');
        const notes = await response.json();
        container.innerHTML = '';
        if (notes.length === 0) {
            container.innerHTML = `<div class="state-message"><i class="fa-solid fa-folder-open"></i> No notes available.</div>`;
            return;
        }
        notes.forEach(note => {
            container.insertAdjacentHTML('beforeend', `
                <a href="${note.pdfLink}" class="note-item" target="_blank">
                    <div class="note-left">
                        <div class="pdf-icon-box"><i class="fa-solid fa-file-pdf"></i></div>
                        <div class="note-info">
                            <h4 class="note-title">${note.title}</h4>
                            <div class="note-meta"><span>${note.class} &bull; ${note.subject}</span></div>
                        </div>
                    </div>
                    <div class="pdf-badge">PDF</div>
                </a>
            `);
        });
    } catch (error) {
        container.innerHTML = `<div class="state-message" style="color: #ef4444;"><i class="fa-solid fa-circle-exclamation"></i> Failed to load notes.</div>`;
    }
}

async function fetchTopQuestions() {
    const container = document.getElementById('topQuestionsContainer');
    if (!container) return;
    try {
        const response = await fetch('assets/json/top-questions.json');
        if (!response.ok) throw new Error('Network error');
        const questions = await response.json();
        container.innerHTML = '';
        if (questions.length === 0) {
            container.innerHTML = `<div class="state-message"><i class="fa-solid fa-folder-open"></i> No questions available.</div>`;
            return;
        }
        questions.forEach(q => {
            container.insertAdjacentHTML('beforeend', `
                <a href="${q.link}" class="note-item">
                    <div class="note-left">
                        <div class="q-icon-box">Q.</div>
                        <div class="note-info">
                            <h4 class="note-title">${q.title}</h4>
                            <div class="note-meta"><span>${q.class} &bull; ${q.chapter}</span></div>
                        </div>
                    </div>
                </a>
            `);
        });
    } catch (error) {
        container.innerHTML = `<div class="state-message" style="color: #ef4444;"><i class="fa-solid fa-circle-exclamation"></i> Failed to load questions.</div>`;
    }
}

async function fetchAnnouncements() {
    const container = document.getElementById('announcementsContainer');
    if (!container) return;
    try {
        const response = await fetch('assets/json/announcements.json');
        if (!response.ok) throw new Error('Network error');
        const announcements = await response.json();
        container.innerHTML = '';
        if (announcements.length === 0) {
            container.innerHTML = `<div class="state-message"><i class="fa-solid fa-bell-slash highlight-cyan"></i> No announcements available.</div>`;
            return;
        }
        announcements.forEach((ann, index) => {
            const hasUrl = ann.url && ann.url.trim() !== '';
            const tag = hasUrl ? 'a' : 'div';
            const hrefAttr = hasUrl ? `href="${ann.url}"` : '';
            const clickableClass = hasUrl ? 'is-clickable' : '';
            const arrowIconHtml = hasUrl ? `<div class="ann-arrow"><i class="fa-solid fa-angle-right"></i></div>` : '';
            
            let badgeClass = 'badge-new';
            if (ann.badge && ann.badge.toLowerCase() === 'updated') badgeClass = 'badge-updated';
            if (ann.badge && ann.badge.toLowerCase() === 'important') badgeClass = 'badge-important';
            const badgeHtml = ann.badge ? `<span class="ann-badge ${badgeClass}">${ann.badge}</span>` : '';

            container.insertAdjacentHTML('beforeend', `
                <${tag} ${hrefAttr} class="announcement-card ${clickableClass}" style="animation-delay: ${index * 0.1}s">
                    <div class="ann-left">
                        <div class="ann-icon-box"><i class="fa-solid ${ann.icon || 'fa-bell'}"></i></div>
                        <div class="ann-info">
                            <div class="ann-header"><h4 class="ann-title">${ann.title}</h4>${badgeHtml}</div>
                            <p class="ann-desc">${ann.description}</p>
                            <span class="ann-date">${ann.date}</span>
                        </div>
                    </div>
                    ${arrowIconHtml}
                </${tag}>
            `);
        });
    } catch (error) {
        container.innerHTML = `<div class="state-message" style="color: #ef4444;"><i class="fa-solid fa-circle-exclamation"></i> Failed to load announcements.</div>`;
    }
}

/**
 * ==========================================
 * 5. PWA Install Logic
 * ==========================================
 */
function setupPWAInstall() {
    const navInstallBtn = document.getElementById('navInstallBtn');
    const navInstalledBadge = document.getElementById('navInstalledBadge');
    const pwaModal = document.getElementById('pwaInstallModal');
    const instructionModal = document.getElementById('instructionModal');
    const modalInstallBtn = document.getElementById('modalInstallBtn');
    
    // ব্রাউজার যখন ইন্সটল করার জন্য রেডি থাকে, তখন এই ইভেন্টটি ফায়ার হয়
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
    });

    if (navInstallBtn) {
        navInstallBtn.addEventListener('click', () => {
            if (deferredPrompt) {
                openModal(pwaModal); // আসল পপআপ দেখাবে
            } else {
                showInstructionModal(instructionModal); // ফলব্যাক পপআপ দেখাবে
            }
        });
    }

    if (modalInstallBtn) {
        modalInstallBtn.addEventListener('click', async () => {
            closeModal(pwaModal);
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                deferredPrompt = null;
            }
        });
    }

    // অ্যাপ সাকসেসফুলি ইন্সটল হয়ে গেলে সবুজ টিক চিহ্ন দেখাবে
    window.addEventListener('appinstalled', () => {
        deferredPrompt = null;
        if (navInstallBtn) navInstallBtn.classList.add('hidden-btn');
        if (navInstalledBadge) navInstalledBadge.classList.remove('hidden-btn');
    });

    // --- Modal Closing System ---
    document.querySelectorAll('[data-close]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modalId = e.currentTarget.getAttribute('data-close');
            closeModal(document.getElementById(modalId));
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.custom-modal-overlay:not(.hidden-modal)').forEach(modal => {
                closeModal(modal);
            });
            const searchDropdown = document.getElementById('searchDropdown');
            if(searchDropdown) searchDropdown.classList.add('hidden-search');
        }
    });
}

function showInstructionModal(modal) {
    const content = document.getElementById('instructionContent');
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isAndroid = /Android/.test(navigator.userAgent);

    if (isIOS) {
        content.innerHTML = `<div class="install-step"><i class="fa-solid fa-arrow-up-from-bracket highlight-blue"></i> <span>1. Tap the <strong>Share</strong> button.</span></div>
                             <div class="install-step"><i class="fa-solid fa-square-plus highlight-blue"></i> <span>2. Tap <strong>Add to Home Screen</strong>.</span></div>`;
    } else if (isAndroid) {
        content.innerHTML = `<div class="install-step"><i class="fa-solid fa-ellipsis-vertical highlight-blue"></i> <span>1. Tap the <strong>Browser Menu</strong> (three dots).</span></div>
                             <div class="install-step"><i class="fa-solid fa-mobile-screen highlight-blue"></i> <span>2. Tap <strong>Install App</strong>.</span></div>`;
    } else {
        content.innerHTML = `<div class="install-step"><i class="fa-solid fa-desktop highlight-blue"></i> <span>Click the install icon in your address bar, or press<strong>Ctrl + D</strong>.</span></div>`;
    }
    openModal(modal);
}

/**
 * ==========================================
 * 6. Global Modal Utilities
 * ==========================================
 */
window.openModal = function(modal) {
    if (!modal) return;
    modal.classList.remove('hidden-modal');
};

window.closeModal = function(modal) {
    if (!modal) return;
    modal.classList.add('hidden-modal');
};