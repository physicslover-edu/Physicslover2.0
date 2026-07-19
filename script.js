/* ==========================================================================
 * 1. Global Variables & Initialization
 * ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize modals
    setupModals();
    // Initialize navigation
    setupNavigation();
    // Load announcements from JSON (FIXED LOGIC)
    fetchAnnouncements();
    // Load top questions from JSON
    fetchTopQuestions();
    // Load latest notes from JSON
    fetchLatestNotes();
    
    // Only load all notes if we are on the page containing the container
    if (document.getElementById('notesListContainer')) {
        loadAllNotesPage();
    }
    
    // Setup quick actions (history, saved notes stats)
    setupQuickActions();
});

/* ==========================================================================
 * 2. Modals Setup
 * ========================================================================== */
function setupModals() {
    const modals = document.querySelectorAll('.modal');
    const closeBtns = document.querySelectorAll('.close-modal');

    // Open modals via data-target attribute
    document.querySelectorAll('[data-target]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = btn.getAttribute('data-target');
            const targetModal = document.getElementById(targetId);
            if (targetModal) openModal(targetModal);
        });
    });

    // Close modals on clicking the 'X' button
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) closeModal(modal);
        });
    });

    // Close modals when clicking outside the modal content (overlay)
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
}

window.openModal = function(modal) {
    if (!modal) return;
    modal.classList.add('active');
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
};

window.closeModal = function(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    // Restore background scrolling
    document.body.style.overflow = 'auto';
};

/* ==========================================================================
 * 3. Quick Actions (Dashboard Stats, History & Saved Notes)
 * ========================================================================== */
window.setupQuickActions = function() {
    const qaContinueSub = document.getElementById('qaContinueSub');
    const qaContinueLink = document.getElementById('qaContinueLink');
    const qaRecentSub = document.getElementById('qaRecentSub');
    const qaSavedSub = document.getElementById('qaSavedSub');
    
    // -----------------------------------------------------
    // Continue Learning (Last viewed class)
    // -----------------------------------------------------
    try {
        const lastClass = JSON.parse(localStorage.getItem('pl_lastClass'));
        if (lastClass && lastClass.title && qaContinueSub) {
            qaContinueSub.innerText = lastClass.title;
            if (qaContinueLink) qaContinueLink.href = lastClass.link || '#';
        }
    } catch(e) {
        console.warn("Could not load last class info.");
    }

    // -----------------------------------------------------
    // Recent Items (History) Setup
    // -----------------------------------------------------
    let recentItems = [];
    try {
        recentItems = JSON.parse(localStorage.getItem('pl_recentItems')) || [];
    } catch(e) { 
        recentItems = []; 
    }
    
    if (qaRecentSub) {
        qaRecentSub.innerText = recentItems.length > 0 ? `${recentItems.length} items viewed` : 'History empty';
    }
    
    const qaRecentLink = document.getElementById('qaRecentLink');
    if (qaRecentLink) {
        // Clone and replace to prevent duplicate event listeners
        const newQaRecentLink = qaRecentLink.cloneNode(true);
        qaRecentLink.parentNode.replaceChild(newQaRecentLink, qaRecentLink);
        
        newQaRecentLink.addEventListener('click', () => {
            const listDiv = document.getElementById('recentList');
            if (!listDiv) return;
            listDiv.innerHTML = '';
            
            const currentRecent = JSON.parse(localStorage.getItem('pl_recentItems')) || [];
            
            if (currentRecent.length === 0) {
                listDiv.innerHTML = '<div class="state-message">No history found.</div>';
            } else {
                currentRecent.slice(0, 10).forEach(item => {
                    listDiv.innerHTML += `
                        <a href="${item.link}" class="history-item track-recent" data-title="${item.title}" data-sub="${item.sub}" data-icon="${item.icon}" target="_blank">
                            <div class="history-icon"><i class="fa-solid ${item.icon || 'fa-file'}"></i></div>
                            <div class="history-info">
                                <span class="history-title">${item.title}</span>
                                <span class="history-sub">${item.sub}</span>
                            </div>
                        </a>`;
                });
            }
            const recentModal = document.getElementById('recentModal');
            if (recentModal && typeof openModal === 'function') {
                openModal(recentModal);
            }
        });
    }

    // -----------------------------------------------------
    // Saved Notes UI Update & Setup
    // -----------------------------------------------------
    let savedNotes = [];
    try {
        savedNotes = JSON.parse(localStorage.getItem('pl_savedNotes')) || [];
        if (!Array.isArray(savedNotes)) savedNotes = []; 
    } catch(e) { 
        savedNotes = []; 
    }
    
    if (qaSavedSub) {
        qaSavedSub.innerText = savedNotes.length > 0 ? `${savedNotes.length} notes saved` : '0 notes saved';
    }

    const qaSavedLink = document.getElementById('qaSavedLink');
    if (qaSavedLink) {
        const newQaSavedLink = qaSavedLink.cloneNode(true);
        qaSavedLink.parentNode.replaceChild(newQaSavedLink, qaSavedLink);
        
        newQaSavedLink.addEventListener('click', () => {
            const listDiv = document.getElementById('savedList');
            if (!listDiv) return;
            listDiv.innerHTML = '';
            
            const currentSaved = JSON.parse(localStorage.getItem('pl_savedNotes')) || [];
            
            if (currentSaved.length === 0) {
                listDiv.innerHTML = '<div class="state-message">No saved notes found.</div>';
            } else {
                currentSaved.forEach(note => {
                    listDiv.innerHTML += `
                        <div style="display:flex; align-items:center; justify-content:space-between; width:100%; gap:10px;">
                            <a href="${note.link}" class="history-item track-recent" style="flex:1; border:none; margin:0;" data-title="${note.title}" data-sub="${note.sub}" data-icon="${note.icon}" target="_blank">
                                <div class="history-icon"><i class="fa-solid ${note.icon || 'fa-bookmark'}"></i></div>
                                <div class="history-info">
                                    <span class="history-title">${note.title}</span>
                                    <span class="history-sub">${note.sub}</span>
                                </div>
                            </a>
                            <button class="icon-btn saved" style="background: rgba(225,29,72,0.1); color: #E11D48; border:none;" onclick="handleSaveNote(event, null, '${note.title}', '${note.link}', '${note.sub}', '${note.icon}')" aria-label="Remove note">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                        <hr style="border-color: rgba(255,255,255,0.05); margin: 5px 0;">`;
                });
            }
            const savedModal = document.getElementById('savedModal');
            if (savedModal && typeof openModal === 'function') {
                openModal(savedModal);
            }
        });
    }
}

/* ==========================================================================
 * 4. Fetch JSON Data (Announcements, Notes, Questions)
 * ========================================================================== */

// 4.1 Announcements (FIXED LOGIC)
window.fetchAnnouncements = async function() {
    const container = document.getElementById('announcementsContainer');
    if (!container) return;
    
    try {
        const response = await fetch('assets/json/announcements.json');
        if (!response.ok) throw new Error('Failed to fetch announcements');
        
        const announcements = await response.json();
        container.innerHTML = '';
        
        if (announcements.length === 0) {
            container.innerHTML = '<p style="color:#aaa; text-align:center; padding: 10px;">No new announcements.</p>';
            return;
        }

        announcements.forEach(item => {
            // Generate valid HTML based on JSON structure
            container.insertAdjacentHTML('beforeend', `
                <div class="announcement-item">
                    <div class="a-header">
                        <span class="a-badge" style="background: ${item.badgeColor || '#3B82F6'}20; color: ${item.badgeColor || '#3B82F6'};">${item.badge}</span>
                        <span class="a-date">${item.date}</span>
                    </div>
                    <h4 class="a-title">${item.title}</h4>
                    <p class="a-desc">${item.description}</p>
                    <a href="${item.url}" class="a-link track-recent" data-title="${item.title}" data-sub="Announcement" data-icon="${item.icon || 'fa-bullhorn'}" target="_blank">
                        View Details <i class="fa-solid fa-arrow-right"></i>
                    </a>
                </div>
            `);
        });
    } catch (error) {
        console.error("Announcements fetch error:", error);
        container.innerHTML = '<p style="color:#ef4444; text-align:center;">Failed to load announcements.</p>';
    }
};

// 4.2 Top Questions
window.fetchTopQuestions = async function() {
    const container = document.getElementById('topQuestionsContainer');
    if (!container) return;
    
    try {
        const response = await fetch('assets/json/top-questions.json');
        if (!response.ok) throw new Error('Failed to fetch top questions');
        
        const questions = await response.json();
        container.innerHTML = '';
        
        if (questions.length === 0) {
            container.innerHTML = '<p style="color:#aaa; text-align:center; padding: 10px;">No questions available.</p>';
            return;
        }

        questions.forEach(q => {
            container.insertAdjacentHTML('beforeend', `
                <a href="${q.link}" class="question-card track-recent" data-title="${q.title}" data-sub="${q.chapter}" data-icon="fa-clipboard-question" target="_blank">
                    <div class="q-icon"><i class="fa-solid fa-clipboard-question"></i></div>
                    <div class="q-content">
                        <h4>${q.title}</h4>
                        <span>${q.class} &bull; ${q.chapter}</span>
                    </div>
                    <i class="fa-solid fa-chevron-right q-arrow"></i>
                </a>
            `);
        });
    } catch (error) {
         console.error("Top Questions fetch error:", error);
         container.innerHTML = '<p style="color:#ef4444; text-align:center;">Failed to load top questions.</p>';
    }
};

// 4.3 Latest Notes (Dashboard View)
window.fetchLatestNotes = async function() {
    const container = document.getElementById('latestNotesContainer');
    if (!container) return;
    
    try {
        const response = await fetch('assets/json/latest-notes.json');
        if (!response.ok) throw new Error('Failed to fetch latest notes');
        
        const notes = await response.json();
        container.innerHTML = '';
        
        if (notes.length === 0) {
             container.innerHTML = '<p style="color:#aaa; text-align:center; padding: 10px;">No notes available.</p>';
             return;
        }

        let saved = [];
        try { 
            saved = JSON.parse(localStorage.getItem('pl_savedNotes')) || []; 
        } catch(e){}

        // Limit to first 3-5 notes for the dashboard if needed, or show all
        notes.slice(0, 5).forEach(note => {
            const isSaved = saved.some(n => n.link === note.pdfLink);
            const btnClass = isSaved ? 'saved' : '';
            const iconClass = isSaved ? 'fa-solid' : 'fa-regular';

            container.insertAdjacentHTML('beforeend', `
                <div class="note-item" style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px;">
                    <a href="${note.pdfLink}" target="_blank" class="note-click-area track-recent" data-title="${note.title}" data-sub="${note.class}" data-icon="fa-file-pdf" style="flex: 1; display: flex; align-items: center; gap: 14px; text-decoration: none; color: inherit;">
                        <div class="pdf-icon-box"><i class="fa-solid fa-file-pdf"></i></div>
                        <div class="note-info">
                            <h4 class="note-title">${note.title}</h4>
                            <div class="note-meta"><span>${note.class} &bull; ${note.subject}</span></div>
                        </div>
                    </a>
                    <button class="save-note-btn ${btnClass}" data-link="${note.pdfLink}" onclick="handleSaveNote(event, this, '${note.title}', '${note.pdfLink}', '${note.class}', 'fa-bookmark')" aria-label="Save note">
                        <i class="${iconClass} fa-bookmark"></i>
                    </button>
                </div>
            `);
        });
    } catch (error) { 
        console.error("Latest Notes fetch error:", error); 
        container.innerHTML = '<p style="color:#ef4444; text-align:center;">Failed to load notes.</p>';
    }
};

// 4.4 All Notes (Dedicated Page View)
window.loadAllNotesPage = async function() {
    const container = document.getElementById('notesListContainer');
    if (!container) return;
    
    try {
        const response = await fetch('assets/json/latest-notes.json');
        if (!response.ok) throw new Error('Failed to fetch all notes');
        
        const notes = await response.json();
        container.innerHTML = '';
        
        let saved = [];
        try { 
            saved = JSON.parse(localStorage.getItem('pl_savedNotes')) || []; 
        } catch(e){}

        notes.forEach(note => {
            const isSaved = saved.some(n => n.link === note.pdfLink);
            const btnClass = isSaved ? 'saved' : '';
            const iconClass = isSaved ? 'fa-solid' : 'fa-regular';

            container.insertAdjacentHTML('beforeend', `
                <div class="note-item glass-panel" style="display: flex; align-items: center; justify-content: space-between; padding: 12px; border-radius: 14px; margin-bottom: 10px;">
                    <a href="${note.pdfLink}" target="_blank" class="note-click-area track-recent" data-title="${note.title}" data-sub="${note.class}" data-icon="fa-file-pdf" style="flex: 1; display: flex; align-items: center; gap: 15px; text-decoration: none; color: inherit;">
                        <div class="pdf-icon-box"><i class="fa-solid fa-file-pdf"></i></div>
                        <div class="note-info">
                            <h4 class="note-title">${note.title}</h4>
                            <div class="note-meta">${note.class} • ${note.subject}</div>
                        </div>
                    </a>
                    <button class="save-note-btn ${btnClass}" data-link="${note.pdfLink}" onclick="handleSaveNote(event, this, '${note.title}', '${note.pdfLink}', '${note.class}', 'fa-bookmark')" aria-label="Save note">
                        <i class="${iconClass} fa-bookmark"></i>
                    </button>
                </div>
            `);
        });
    } catch (error) {
        console.error("All Notes fetch error:", error);
        container.innerHTML = `<p style="color: #ef4444; text-align: center; padding: 20px;">Failed to load notes data.</p>`;
    }
};

/* ==========================================================================
 * 5. Navigation Logic
 * ========================================================================== */
function setupNavigation() {
    const menuBtn = document.getElementById('menuBtn');
    const bottomNav = document.getElementById('bottomNav');
    const pageOverlay = document.getElementById('pageOverlay');

    if (menuBtn && bottomNav && pageOverlay) {
        menuBtn.addEventListener('click', () => {
            const isActive = bottomNav.classList.contains('active');
            if (isActive) {
                closeNav();
            } else {
                openNav();
            }
        });

        pageOverlay.addEventListener('click', closeNav);
    }

    function openNav() {
        bottomNav.classList.add('active');
        pageOverlay.classList.add('active');
        menuBtn.innerHTML = '<i class="fa-solid fa-times"></i>';
        document.body.style.overflow = 'hidden'; // Stop background scroll
    }

    function closeNav() {
        bottomNav.classList.remove('active');
        pageOverlay.classList.remove('active');
        menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        document.body.style.overflow = 'auto'; // Resume background scroll
    }
}

/* ==========================================================================
 * 6. Core Data Handlers (Save Logic & Tracking)
 * ========================================================================== */

// Sync ALL buttons on the page dynamically via data-link
window.syncPageSaveButtons = function(link, isSaving) {
    const buttons = document.querySelectorAll(`.save-note-btn[data-link="${link}"]`);
    buttons.forEach(btn => {
        if (isSaving) {
            btn.classList.add('saved');
            btn.innerHTML = '<i class="fa-solid fa-bookmark"></i>';
        } else {
            btn.classList.remove('saved');
            btn.innerHTML = '<i class="fa-regular fa-bookmark"></i>';
        }
    });
};

// Handle saving/unsaving a note
window.handleSaveNote = function(e, btnElement, title, link, sub, icon) {
    if (e) {
        e.preventDefault();
        e.stopPropagation(); 
    }
    if (!title || !link) return;
    
    let saved = [];
    try { 
        saved = JSON.parse(localStorage.getItem('pl_savedNotes'));
        if (!Array.isArray(saved)) saved = [];
    } catch(err) { 
        saved = []; 
    }

    const existsIndex = saved.findIndex(note => note.link === link);
    const isSaving = (existsIndex === -1);
    
    if (isSaving) {
        // Add to saved list
        saved.unshift({ title, link, sub, icon: icon || 'fa-bookmark' });
        if (typeof showToast === 'function') showToast(true); 
    } else {
        // Remove from saved list
        saved.splice(existsIndex, 1);
        if (typeof showToast === 'function') showToast(false); 
    }
    
    // 1. Update LocalStorage immediately
    localStorage.setItem('pl_savedNotes', JSON.stringify(saved));
    
    // 2. Sync ALL buttons on the UI instantly
    syncPageSaveButtons(link, isSaving);

    // 3. Update Quick Actions stats
    if (typeof setupQuickActions === 'function') setupQuickActions();
};

/* ==========================================================================
 * 7. Track Recent Items & History
 * ========================================================================== */
// Global click listener for tracking
document.body.addEventListener('click', (e) => {
    const trackEl = e.target.closest('.track-recent');
    if (trackEl) {
        const title = trackEl.getAttribute('data-title');
        const link = trackEl.getAttribute('href');
        const sub = trackEl.getAttribute('data-sub') || 'Resource';
        const icon = trackEl.getAttribute('data-icon') || 'fa-file';
        
        if (title && link && link !== '#') {
            addToRecent(title, link, sub, icon);
            
            // If it's a class page, update last class specifically
            if (sub.toLowerCase().includes('class')) {
                localStorage.setItem('pl_lastClass', JSON.stringify({ title, link }));
            }
        }
    }
});

function addToRecent(title, link, sub, icon) {
    let recent = [];
    try {
        recent = JSON.parse(localStorage.getItem('pl_recentItems')) || [];
    } catch(e) {
        recent = [];
    }

    // Remove if already exists to push it to the top (most recent)
    recent = recent.filter(item => item.link !== link);
    
    // Add to beginning
    recent.unshift({ title, link, sub, icon, timestamp: Date.now() });
    
    // Limit history length to 20 items to save storage
    if (recent.length > 20) recent = recent.slice(0, 20);
    
    localStorage.setItem('pl_recentItems', JSON.stringify(recent));
    
    // Update Dashboard Stats UI if applicable
    if (typeof setupQuickActions === 'function') setupQuickActions();
}

/* ==========================================================================
 * 8. Toast Notifications
 * ========================================================================== */
window.showToast = function(isSaved) {
    let toast = document.getElementById('saveToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'saveToast';
        toast.className = 'toast-notification';
        document.body.appendChild(toast);
    }
    
    if (isSaved) {
        toast.innerHTML = '<i class="fa-solid fa-circle-check"></i> Note saved to collection';
        toast.style.background = 'rgba(16, 185, 129, 0.9)'; // Green
    } else {
        toast.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Note removed from collection';
        toast.style.background = 'rgba(239, 68, 68, 0.9)'; // Red
    }
    
    // Force reflow for animation restart if clicked rapidly
    toast.classList.remove('show');
    void toast.offsetWidth;
    
    toast.classList.add('show');
    
    // Clear previous timeout if exists
    if (toast.timeoutId) clearTimeout(toast.timeoutId);
    
    toast.timeoutId = setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
};

/* ==========================================================================
 * 9. Cross-Tab / Cross-Page Live Sync
 * ========================================================================== */
// Automatically sync UI if user saves/removes notes on another tab
window.addEventListener('storage', (e) => {
    if (e.key === 'pl_savedNotes') {
        let saved = [];
        try { 
            saved = JSON.parse(e.newValue) || []; 
        } catch(err) { 
            saved = []; 
        }
        
        // Update all visible buttons based on the new storage state
        document.querySelectorAll('.save-note-btn').forEach(btn => {
            const link = btn.getAttribute('data-link');
            if (link) {
                const isNowSaved = saved.some(n => n.link === link);
                if (isNowSaved) {
                    btn.classList.add('saved');
                    btn.innerHTML = '<i class="fa-solid fa-bookmark"></i>';
                } else {
                    btn.classList.remove('saved');
                    btn.innerHTML = '<i class="fa-regular fa-bookmark"></i>';
                }
            }
        });

        // Update Dashboard Stats
        if (typeof setupQuickActions === 'function') setupQuickActions();
    }
    
    if (e.key === 'pl_recentItems') {
         if (typeof setupQuickActions === 'function') setupQuickActions();
    }
});
