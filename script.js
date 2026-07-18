/**
 * Physics Lover 2.0 - Core Logic
 */

let deferredPrompt; // To store the PWA install event

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    setupNavigation();
    setupQuickActions();
    fetchLatestNotes();
    fetchTopQuestions(); // Initialize Top Questions
    setupPWAInstall(); 
    
    // Connect the Service Worker for PWA capabilities
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(() => console.log('Service Worker Registered Successfully'))
            .catch(err => console.error('Service Worker Registration Failed:', err));
    }
}

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
 * Fetch and Render Latest Notes
 */
async function fetchLatestNotes() {
    const container = document.getElementById('latestNotesContainer');
    if (!container) return;

    try {
        const response = await fetch('assets/json/latest-notes.json');
        if (!response.ok) throw new Error('Network response was not ok');
        
        const notes = await response.json();
        container.innerHTML = '';

        if (notes.length === 0) {
            container.innerHTML = `
                <div class="state-message">
                    <i class="fa-solid fa-folder-open"></i> No notes available.
                </div>`;
            return;
        }

        notes.forEach(note => {
            const noteCard = `
                <a href="${note.pdfLink}" class="note-item" target="_blank" rel="noopener noreferrer">
                    <div class="note-left">
                        <div class="pdf-icon-box">
                            <i class="fa-solid fa-file-pdf"></i>
                        </div>
                        <div class="note-info">
                            <h4 class="note-title">${note.title}</h4>
                            <div class="note-meta">
                                <span>${note.class} &bull; ${note.subject}</span>
                            </div>
                        </div>
                    </div>
                    <div class="pdf-badge">PDF</div>
                </a>
            `;
            container.insertAdjacentHTML('beforeend', noteCard);
        });

    } catch (error) {
        console.error('Error loading latest notes:', error);
        container.innerHTML = `
            <div class="state-message" style="color: #ef4444;">
                <i class="fa-solid fa-circle-exclamation"></i> Failed to load notes.
            </div>`;
    }
}

/**
 * Fetch and Render Top Questions
 */
async function fetchTopQuestions() {
    const container = document.getElementById('topQuestionsContainer');
    if (!container) return;

    try {
        const response = await fetch('assets/json/top-questions.json');
        if (!response.ok) throw new Error('Network response was not ok');
        
        const questions = await response.json();
        container.innerHTML = '';

        if (questions.length === 0) {
            container.innerHTML = `
                <div class="state-message">
                    <i class="fa-solid fa-folder-open"></i> No questions available.
                </div>`;
            return;
        }

        questions.forEach(q => {
            const qCard = `
                <a href="${q.link}" class="note-item">
                    <div class="note-left">
                        <div class="q-icon-box">Q.</div>
                        <div class="note-info">
                            <h4 class="note-title">${q.title}</h4>
                            <div class="note-meta">
                                <span>${q.class} &bull; ${q.chapter}</span>
                            </div>
                        </div>
                    </div>
                </a>
            `;
            container.insertAdjacentHTML('beforeend', qCard);
        });

    } catch (error) {
        console.error('Error loading top questions:', error);
        container.innerHTML = `
            <div class="state-message" style="color: #ef4444;">
                <i class="fa-solid fa-circle-exclamation"></i> Failed to load questions.
            </div>`;
    }
}

/**
 * PWA Install & Custom Modal Logic
 */
function setupPWAInstall() {
    const navInstallBtn = document.getElementById('navInstallBtn');
    const navInstalledBadge = document.getElementById('navInstalledBadge');
    const pwaModal = document.getElementById('pwaInstallModal');
    const instructionModal = document.getElementById('instructionModal');
    const modalInstallBtn = document.getElementById('modalInstallBtn');
    
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
    });

    if (navInstallBtn) {
        navInstallBtn.addEventListener('click', () => {
            if (deferredPrompt) {
                openModal(pwaModal);
            } else {
                showInstructionModal(instructionModal);
            }
        });
    }

    if (modalInstallBtn) {
        modalInstallBtn.addEventListener('click', async () => {
            closeModal(pwaModal);
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                if (outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                }
                deferredPrompt = null;
            }
        });
    }

    window.addEventListener('appinstalled', () => {
        deferredPrompt = null;
        if (navInstallBtn) navInstallBtn.classList.add('hidden-btn');
        if (navInstalledBadge) navInstalledBadge.classList.remove('hidden-btn');
    });

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
        }
    });
}

function showInstructionModal(modal) {
    const content = document.getElementById('instructionContent');
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isAndroid = /Android/.test(navigator.userAgent);

    if (isIOS) {
        content.innerHTML = `
            <div class="install-step"><i class="fa-solid fa-arrow-up-from-bracket highlight-blue"></i> <span>1. Tap the <strong>Share</strong> button in your browser menu.</span></div>
            <div class="install-step"><i class="fa-solid fa-square-plus highlight-blue"></i> <span>2. Scroll down and tap <strong>Add to Home Screen</strong>.</span></div>
        `;
    } else if (isAndroid) {
        content.innerHTML = `
            <div class="install-step"><i class="fa-solid fa-ellipsis-vertical highlight-blue"></i> <span>1. Tap the <strong>Browser Menu</strong> (three dots) at the top right.</span></div>
            <div class="install-step"><i class="fa-solid fa-mobile-screen highlight-blue"></i> <span>2. Tap <strong>Install App</strong> or <strong>Add to Home Screen</strong>.</span></div>
        `;
    } else {
        content.innerHTML = `
            <div class="install-step"><i class="fa-solid fa-desktop highlight-blue"></i> <span>Click the install icon in your address bar, or press <strong>Ctrl + D</strong> to bookmark.</span></div>
        `;
    }
    openModal(modal);
}

function openModal(modal) {
    if (!modal) return;
    modal.classList.remove('hidden-modal');
    const closeBtn = modal.querySelector('.modal-close-btn');
    if (closeBtn) closeBtn.focus();
}

function closeModal(modal) {
    if (!modal) return;
    modal.classList.add('hidden-modal');
}
/**
 * Setup Quick Actions & Local Storage Interactions
 */
function setupQuickActions() {
    const qaContinueSub = document.getElementById('qaContinueSub');
    const qaContinueLink = document.getElementById('qaContinueLink');
    const qaRecentSub = document.getElementById('qaRecentSub');
    const qaSavedSub = document.getElementById('qaSavedSub');

    // 1. Continue Learning Logic
    const lastOpenedNote = JSON.parse(localStorage.getItem('pl_lastOpenedNote'));
    if (lastOpenedNote && lastOpenedNote.title && lastOpenedNote.link) {
        if (qaContinueSub) qaContinueSub.innerText = lastOpenedNote.title;
        if (qaContinueLink) qaContinueLink.href = lastOpenedNote.link;
    }

    // 2. Recently Opened Logic
    const recentNotes = JSON.parse(localStorage.getItem('pl_recentNotes')) || [];
    if (qaRecentSub) {
        if (recentNotes.length > 0) {
            qaRecentSub.innerText = `${recentNotes.length} notes viewed`;
        } else {
            qaRecentSub.innerText = 'History empty';
        }
    }

    // 3. Saved Notes Logic
    const savedNotes = JSON.parse(localStorage.getItem('pl_savedNotes')) || [];
    if (qaSavedSub) {
        if (savedNotes.length > 0) {
            qaSavedSub.innerText = `${savedNotes.length} notes saved`;
        } else {
            qaSavedSub.innerText = '0 notes saved';
        }
    }
                          }
              
