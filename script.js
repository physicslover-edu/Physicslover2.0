/**
 * Physics Lover 2.0 - Ultimate Master Script (100% Bug Free)
 */

let deferredPrompt; 

document.addEventListener('DOMContentLoaded', () => {
    initApp();
    loadAllNotesPage();
    loadAllQuestionsPage();
});

function initApp() {
    setupNavigation();
    setupTopActions(); 
    setupQuickActions(); 
    fetchLatestNotes();
    fetchTopQuestions(); 
    setupPWAInstall(); 
    updateSmartSuggestions(); 
}

/* ==========================================================================
 * 1. Mobile Navigation
 * ========================================================================== */
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

/* ==========================================================================
 * 2. Theme & Search 
 * ========================================================================== */
function setupTopActions() {
    const themeBtn = document.getElementById('themeToggle');
    const searchBtn = document.querySelector('button[aria-label="Search"]'); 
    const searchDropdown = document.getElementById('searchDropdown');
    const closeSearchBtn = document.getElementById('closeSearchBtn');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const searchSuggestions = document.getElementById('searchSuggestions');

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

    if (searchBtn && searchDropdown) {
        searchBtn.addEventListener('click', () => {
            searchDropdown.classList.remove('hidden-search');
            if (searchInput) {
                searchInput.value = '';
                setTimeout(() => searchInput.focus(), 300); 
            }
            if (searchResults) searchResults.classList.add('hidden-element');
            if (searchSuggestions) searchSuggestions.classList.remove('hidden-element');
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

            if (!searchResults) return;
            searchResults.innerHTML = '';
            
            const searchableElements = document.querySelectorAll('.class-card, .feature-card, .note-click-area, .quick-action-card');
            let resultsHTML = '';
            let matchCount = 0;

            searchableElements.forEach(el => {
                const titleEl = el.querySelector('h3, h4, .qa-title'); 
                if (!titleEl) return;
                
                const titleText = titleEl.innerText || titleEl.textContent;
                if (titleText.toLowerCase().includes(query)) {
                    let category = "Link"; let icon = "fa-link";
                    if(el.classList.contains('class-card')) { category = "Class"; icon = "fa-graduation-cap"; }
                    else if(el.classList.contains('note-click-area')) { category = "Note"; icon = "fa-file-pdf"; }
                    else if(el.classList.contains('feature-card')) { category = "Feature"; icon = "fa-star"; }

                    const link = el.getAttribute('href') || '#';
                    if (link === 'javascript:void(0)') return;

                    resultsHTML += `
                        <a href="${link}" class="search-result-item" onclick="document.getElementById('searchDropdown').classList.add('hidden-search')">
                            <i class="fa-solid ${icon} highlight-cyan" style="width: 25px; text-align: center;"></i>
                            <div class="search-result-title">${titleText}</div>
                            <span class="search-badge">${category}</span>
                        </a>`;
                    matchCount++;
                }
            });

            if (matchCount === 0) {
                searchResults.innerHTML = `<div class="state-message" style="padding: 20px;"><i class="fa-solid fa-face-frown highlight-cyan"></i><br>No content found.</div>`;
            } else {
                searchResults.innerHTML = resultsHTML;
            }
        });
    }
}

/* ==========================================================================
 * 3. Quick Actions & Modals (History & Saved Notes)
 * ========================================================================== */
function setupQuickActions() {
    const qaContinueSub = document.getElementById('qaContinueSub');
    const qaContinueLink = document.getElementById('qaContinueLink');
    const qaRecentSub = document.getElementById('qaRecentSub');
    const qaSavedSub = document.getElementById('qaSavedSub');
    
    const lastClass = JSON.parse(localStorage.getItem('pl_lastClass'));
    if (lastClass && lastClass.title && qaContinueSub) {
        qaContinueSub.innerText = lastClass.title;
        if (qaContinueLink) qaContinueLink.href = lastClass.link || '#';
    }

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
                recentItems.slice(0, 5).forEach(item => {
                    listDiv.innerHTML += `
                        <a href="${item.link}" class="history-item" target="_blank">
                            <div class="history-icon"><i class="fa-solid ${item.icon || 'fa-file'}"></i></div>
                            <div class="history-info">
                                <span class="history-title">${item.title}</span>
                                <span class="history-sub">${item.sub}</span>
                            </div>
                        </a>`;
                });
            }
            openModal(document.getElementById('recentModal'));
        });
    }

    const savedNotes = JSON.parse(localStorage.getItem('pl_savedNotes')) || [];
    if (qaSavedSub) qaSavedSub.innerText = savedNotes.length > 0 ? `${savedNotes.length} notes saved` : '0 notes saved';

    const qaSavedLink = document.getElementById('qaSavedLink');
    if (qaSavedLink) {
        qaSavedLink.addEventListener('click', () => {
            const listDiv = document.getElementById('savedList');
            if(!listDiv) return;
            listDiv.innerHTML = '';
            if (savedNotes.length === 0) {
                listDiv.innerHTML = '<div class="state-message">No saved notes found.</div>';
            } else {
                savedNotes.forEach(note => {
                    listDiv.innerHTML += `
                        <a href="${note.link}" class="history-item" target="_blank">
                            <div class="history-icon"><i class="fa-solid ${note.icon || 'fa-bookmark'}"></i></div>
                            <div class="history-info">
                                <span class="history-title">${note.title}</span>
                                <span class="history-sub">${note.sub}</span>
                            </div>
                        </a>`;
                });
            }
            openModal(document.getElementById('savedModal'));
        });
    }
}

/* ==========================================================================
 * 4. Fetch Home Page Notes (With Separated Link & Button FIX)
 * ========================================================================== */
async function fetchLatestNotes() {
    const container = document.getElementById('latestNotesContainer');
    if (!container) return;
    try {
        const response = await fetch('assets/json/latest-notes.json');
        const notes = await response.json();
        container.innerHTML = '';
        if (notes.length === 0) return;

        notes.forEach(note => {
            let saved = JSON.parse(localStorage.getItem('pl_savedNotes')) || [];
            const isSaved = saved.some(n => n.link === note.pdfLink);
            const btnClass = isSaved ? 'saved' : '';
            const iconClass = isSaved ? 'fa-solid' : 'fa-regular';

            // ম্যাজিক ফিক্স: লিংক এবং বাটন সম্পূর্ণ আলাদা করা হয়েছে
            container.insertAdjacentHTML('beforeend', `
                <div class="note-item" style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px;">
                    <a href="${note.pdfLink}" target="_blank" class="note-click-area" style="flex: 1; display: flex; align-items: center; gap: 14px; text-decoration: none; color: inherit;" onclick="addRecentItem('${note.title}', '${note.pdfLink}', '${note.class}', 'fa-file-pdf')">
                        <div class="pdf-icon-box"><i class="fa-solid fa-file-pdf"></i></div>
                        <div class="note-info">
                            <h4 class="note-title">${note.title}</h4>
                            <div class="note-meta"><span>${note.class} &bull; ${note.subject}</span></div>
                        </div>
                    </a>
                    <button class="save-note-btn ${btnClass}" onclick="handleSaveNote(event, this, '${note.title}', '${note.pdfLink}', '${note.class}', 'fa-bookmark')">
                        <i class="${iconClass} fa-bookmark"></i>
                    </button>
                </div>
            `);
        });
    } catch (error) {
        console.error("Notes error");
    }
}

async function fetchTopQuestions() {
    const container = document.getElementById('topQuestionsContainer');
    if (!container) return;
    try {
        const response = await fetch('assets/json/top-questions.json');
        const questions = await response.json();
        container.innerHTML = '';
        questions.forEach(q => {
            container.insertAdjacentHTML('beforeend', `
                <a href="${q.link}" class="note-item" target="_blank" onclick="addRecentItem('${q.title}', '${q.link}', '${q.class}', 'fa-clipboard-question')">
                    <div class="note-left">
                        <div class="q-icon-box">Q.</div>
                        <div class="note-info"><h4 class="note-title">${q.title}</h4><div class="note-meta"><span>${q.class} &bull; ${q.chapter}</span></div></div>
                    </div>
                </a>
            `);
        });
    } catch (error) {
        console.error("Questions error");
    }
}

/* ==========================================================================
 * 5. Global Modals & PWA
 * ========================================================================== */
function setupPWAInstall() {
    const navInstallBtn = document.getElementById('navInstallBtn');
    window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferredPrompt = e; });
    if (navInstallBtn) {
        navInstallBtn.addEventListener('click', () => {
            if (deferredPrompt) openModal(document.getElementById('pwaInstallModal'));
            else openModal(document.getElementById('instructionModal'));
        });
    }
    document.querySelectorAll('[data-close]').forEach(btn => {
        btn.addEventListener('click', (e) => { closeModal(document.getElementById(e.currentTarget.getAttribute('data-close'))); });
    });
}
window.openModal = function(modal) { if (modal) modal.classList.remove('hidden-modal'); };
window.closeModal = function(modal) { if (modal) modal.classList.add('hidden-modal'); };

/* ==========================================================================
 * 6. Internal Pages Loaders (notes.html & pb.html)
 * ========================================================================== */
async function loadAllNotesPage() {
    const container = document.getElementById('notesListContainer');
    if (!container) return;
    try {
        const response = await fetch('assets/json/latest-notes.json');
        const notes = await response.json();
        container.innerHTML = '';
        
        notes.forEach(note => {
            let saved = JSON.parse(localStorage.getItem('pl_savedNotes')) || [];
            const isSaved = saved.some(n => n.link === note.pdfLink);
            const btnClass = isSaved ? 'saved' : '';
            const iconClass = isSaved ? 'fa-solid' : 'fa-regular';

            // ফিক্স: লিংক এবং বাটন আলাদা
            container.insertAdjacentHTML('beforeend', `
                <div class="note-item glass-panel" style="display: flex; align-items: center; justify-content: space-between; padding: 12px; border-radius: 14px;">
                    <a href="${note.pdfLink}" target="_blank" class="note-click-area" style="flex: 1; display: flex; align-items: center; gap: 15px; text-decoration: none; color: inherit;" onclick="addRecentItem('${note.title}', '${note.pdfLink}', '${note.class}', 'fa-file-pdf')">
                        <div class="pdf-icon-box"><i class="fa-solid fa-file-pdf"></i></div>
                        <div class="note-info">
                            <h4 class="note-title">${note.title}</h4>
                            <div class="note-meta">${note.class} • ${note.subject}</div>
                        </div>
                    </a>
                    <button class="save-note-btn ${btnClass}" onclick="handleSaveNote(event, this, '${note.title}', '${note.pdfLink}', '${note.class}', 'fa-bookmark')">
                        <i class="${iconClass} fa-bookmark"></i>
                    </button>
                </div>
            `);
        });
    } catch (error) {
        container.innerHTML = `<p style="color: #ef4444; text-align: center;">Failed to load notes.</p>`;
    }
}

async function loadAllQuestionsPage() {
    const container = document.getElementById('questionsListContainer');
    if (!container) return;
    try {
        const response = await fetch('assets/json/top-questions.json');
        const questions = await response.json();
        container.innerHTML = '';
        questions.forEach(q => {
            container.insertAdjacentHTML('beforeend', `
                <a href="${q.link}" class="note-item glass-panel" target="_blank" style="padding: 12px; border-radius: 14px;" onclick="addRecentItem('${q.title}', '${q.link}', '${q.class}', 'fa-clipboard-question')">
                    <div class="note-left" style="display: flex; align-items: center; gap: 15px;">
                        <div class="pdf-icon-box" style="background: rgba(59, 130, 246, 0.15); color: #3B82F6;">Q.</div>
                        <div class="note-info"><h4 class="note-title">${q.title}</h4><div class="note-meta">${q.class} • ${q.chapter}</div></div>
                    </div>
                </a>
            `);
        });
    } catch (error) {
        container.innerHTML = `<p style="color: #ef4444; text-align: center;">Failed to load questions.</p>`;
    }
}

/* ==========================================================================
 * 7. Smart Auto Suggestions
 * ========================================================================== */
async function updateSmartSuggestions() {
    const tagsContainer = document.getElementById('dynamicSuggestionTags');
    const titleText = document.getElementById('suggestionTitleText');
    if (!tagsContainer || !titleText) return;

    const currentMonth = new Date().getMonth(); 
    let suggestions = ["Class 12 Electrostatics", "Class 11 Kinematics", "Smart Notes"];
    let sectionTitle = "✨ Trending Learning Resources";

    if (currentMonth === 3 || currentMonth === 4) { sectionTitle = "🔥 1st Summative Special"; suggestions = ["Class 10 1st Summative", "Class 9 Physics"]; } 
    else if (currentMonth === 6 || currentMonth === 7) { sectionTitle = "⚡ 2nd Summative Trending"; suggestions = ["Class 10 2nd Summative", "Class 9 2nd Summative"]; } 
    else if (currentMonth === 8 || currentMonth === 9) { sectionTitle = "📚 Semester 1 & 3 Special"; suggestions = ["Class 12 Semester 3", "Class 11 Semester 1"]; } 
    else if (currentMonth === 1 || currentMonth === 2) { sectionTitle = "🎓 Board Exam Special"; suggestions = ["Madhyamik Physics", "Class 12 Semester 4"]; }

    titleText.innerText = sectionTitle;
    tagsContainer.innerHTML = '';

    try {
        const response = await fetch('assets/json/latest-notes.json');
        if (response.ok) {
            const notes = await response.json();
            notes.slice(0, 3).forEach(note => {
                tagsContainer.insertAdjacentHTML('beforeend', `<span class="s-tag" onclick="triggerSmartSuggestion('${note.title}')"><i class="fa-solid fa-file-pdf" style="margin-right: 5px; color: #ef4444;"></i> ${note.title}</span>`);
            });
        }
    } catch (e) {}

    suggestions.forEach(tagText => { tagsContainer.insertAdjacentHTML('beforeend', `<span class="s-tag" onclick="triggerSmartSuggestion('${tagText}')">${tagText}</span>`); });
}

window.triggerSmartSuggestion = function(queryText) {
    const input = document.getElementById('searchInput');
    if (input) { input.value = queryText; input.dispatchEvent(new Event('input')); }
};

/* ==========================================================================
 * 8. Core Data Handlers (Save, Recent, Toast)
 * ========================================================================== */
window.setContinueLearning = function(title, link) {
    localStorage.setItem('pl_lastClass', JSON.stringify({ title: title, link: link }));
    if (typeof setupQuickActions === 'function') setupQuickActions();
};

window.addRecentItem = function(title, link, sub, icon) {
    let recent = JSON.parse(localStorage.getItem('pl_recentItems')) || [];
    recent = recent.filter(item => item.link !== link);
    recent.unshift({ title: title, link: link, sub: sub, icon: icon }); 
    if (recent.length > 10) recent.pop(); 
    localStorage.setItem('pl_recentItems', JSON.stringify(recent));
    if (typeof setupQuickActions === 'function') setupQuickActions();
};

window.showToast = function(isSaved) {
    const toast = document.getElementById('toastPopup');
    const toastIcon = document.getElementById('toastIcon');
    const toastText = document.getElementById('toastText');
    if (!toast) return;

    toast.className = isSaved ? 'toast-popup success' : 'toast-popup removed';
    toastIcon.innerHTML = isSaved ? '<i class="fa-solid fa-check"></i>' : '<i class="fa-solid fa-trash-can"></i>';
    toastText.innerText = isSaved ? 'Note saved to collection!' : 'Removed from saved notes!';

    setTimeout(() => { toast.classList.add('show'); }, 10);
    setTimeout(() => { toast.classList.remove('show'); }, 3000);
};

// ইভেন্ট পাস করে দেওয়া হয়েছে যাতে বাটন ক্লিক করলে পেজ রিডাইরেক্ট না হয়
window.handleSaveNote = function(e, btnElement, title, link, sub, icon) {
    if (e) {
        e.preventDefault();
        e.stopPropagation(); // এটি ব্রাউজারকে বোঝাবে যে লিংকে ক্লিক হয়নি
    }
    
    let saved = JSON.parse(localStorage.getItem('pl_savedNotes')) || [];
    const existsIndex = saved.findIndex(note => note.link === link);
    
    if (existsIndex > -1) {
        saved.splice(existsIndex, 1);
        btnElement.classList.remove('saved');
        btnElement.innerHTML = '<i class="fa-regular fa-bookmark"></i>';
        showToast(false); 
    } else {
        saved.push({ title: title, link: link, sub: sub, icon: icon });
        btnElement.classList.add('saved');
        btnElement.innerHTML = '<i class="fa-solid fa-bookmark"></i>';
        showToast(true); 
    }
    
    localStorage.setItem('pl_savedNotes', JSON.stringify(saved));
    if (typeof setupQuickActions === 'function') setupQuickActions();
};