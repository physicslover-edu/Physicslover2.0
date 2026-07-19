/**
 * Physics Lover 2.0 - Master Script
 * All Features: Search, Modals, PWA, Auto-Suggestions, History, Save Notes
 */

let deferredPrompt; 

document.addEventListener('DOMContentLoaded', () => {
    initApp();
    
    // Internal Pages Loaders (এগুলো শুধু নির্দিষ্ট পেজে কাজ করবে)
    loadAllNotesPage();
    loadAllQuestionsPage();
});

function initApp() {
    setupNavigation();
    setupTopActions(); 
    setupQuickActions(); 
    fetchLatestNotes();
    fetchTopQuestions(); 
    fetchAnnouncements();
    setupPWAInstall(); 
    updateSmartSuggestions(); 
}

/* ==========================================================================
 * 1. Mobile Navigation Logic
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
 * 2. Theme Toggle & Bulletproof Live Search Logic
 * ========================================================================== */
function setupTopActions() {
    const themeBtn = document.getElementById('themeToggle');
    const searchBtn = document.querySelector('button[aria-label="Search"]'); 
    const searchDropdown = document.getElementById('searchDropdown');
    const closeSearchBtn = document.getElementById('closeSearchBtn');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const searchSuggestions = document.getElementById('searchSuggestions');

    // Theme Logic
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

    // Search Dropdown 
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

    // Live Search 
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
            
            const searchableElements = document.querySelectorAll('.class-card, .feature-card, .note-item, .quick-action-card, .announcement-card, .note-item-premium');
            let resultsHTML = '';
            let matchCount = 0;

            searchableElements.forEach(el => {
                const titleEl = el.querySelector('h3, h4, .qa-title'); 
                if (!titleEl) return;
                
                const titleText = titleEl.innerText || titleEl.textContent;
                
                if (titleText.toLowerCase().includes(query)) {
                    let category = "Link";
                    let icon = "fa-link";
                    
                    if(el.classList.contains('class-card')) { category = "Class"; icon = "fa-graduation-cap"; }
                    else if(el.classList.contains('note-item') || el.classList.contains('note-item-premium')) { category = "Note"; icon = "fa-file-pdf"; }
                    else if(el.classList.contains('feature-card')) { category = "Feature"; icon = "fa-star"; }
                    else if(el.classList.contains('quick-action-card')) { category = "Action"; icon = "fa-bolt"; }

                    const link = el.getAttribute('href') || '#';
                    if (link === 'javascript:void(0)') return;

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
                        <br>No matching content found for "${query}".
                    </div>`;
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
    
    // Continue Learning Load
    const lastClass = JSON.parse(localStorage.getItem('pl_lastClass'));
    if (lastClass && lastClass.title && qaContinueSub) {
        qaContinueSub.innerText = lastClass.title;
        if (qaContinueLink) qaContinueLink.href = lastClass.link || '#';
    }

    // Recently Opened Load
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
                        <a href="${item.link}" class="history-item">
                            <div class="history-icon"><i class="fa-solid ${item.icon || 'fa-file'}"></i></div>
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

    // Saved Notes Load
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
                        </a>
                    `;
                });
            }
            openModal(document.getElementById('savedModal'));
        });
    }
}

/* ==========================================================================
 * 4. Fetch API Logic (Home Page Data)
 * ========================================================================== */
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
            let saved = JSON.parse(localStorage.getItem('pl_savedNotes')) || [];
            const isSaved = saved.some(n => n.link === note.pdfLink);
            const btnClass = isSaved ? 'saved' : '';
            const iconClass = isSaved ? 'fa-solid' : 'fa-regular';

            container.insertAdjacentHTML('beforeend', `
                <a href="${note.pdfLink}" class="note-item" target="_blank"
                   onclick="addRecentItem('${note.title}', '${note.pdfLink}', '${note.class}', 'fa-file-pdf')">
                    <div class="note-left">
                        <div class="pdf-icon-box"><i class="fa-solid fa-file-pdf"></i></div>
                        <div class="note-info">
                            <h4 class="note-title">${note.title}</h4>
                            <div class="note-meta"><span>${note.class} &bull; ${note.subject}</span></div>
                        </div>
                    </div>
                    <!-- Save Button (Independent Click Logic) -->
                    <button class="save-note-btn ${btnClass}" 
                            style="margin-left: auto;"
                            onclick="event.preventDefault(); event.stopPropagation(); handleSaveNote(this, '${note.title}', '${note.pdfLink}', '${note.class}', 'fa-bookmark');">
                        <i class="${iconClass} fa-bookmark"></i>
                    </button>
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
                <a href="${q.link}" class="note-item" target="_blank" onclick="addRecentItem('${q.title}', '${q.link}', '${q.class}', 'fa-clipboard-question')">
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
        const announcements = await response.json();
        // Assuming announcement rendering is handled here
    } catch (error) {
        // Silent fail
    }
}

/* ==========================================================================
 * 5. PWA Install Logic & Global Modal Handlers
 * ========================================================================== */
function setupPWAInstall() {
    const navInstallBtn = document.getElementById('navInstallBtn');
    const navInstalledBadge = document.getElementById('navInstalledBadge');
    
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
    });

    if (navInstallBtn) {
        navInstallBtn.addEventListener('click', () => {
            if (deferredPrompt) {
                openModal(document.getElementById('pwaInstallModal'));
            } else {
                openModal(document.getElementById('instructionModal'));
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
}

window.openModal = function(modal) {
    if (!modal) return;
    modal.classList.remove('hidden-modal');
};
window.closeModal = function(modal) {
    if (!modal) return;
    modal.classList.add('hidden-modal');
};

/* ==========================================================================
 * 6. Internal Pages Loaders (For notes.html & question-bank.html)
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

            container.insertAdjacentHTML('beforeend', `
                <a href="${note.pdfLink}" class="note-item-premium" target="_blank" 
                   onclick="addRecentItem('${note.title}', '${note.pdfLink}', '${note.class}', 'fa-file-pdf')">
                    <div class="note-left" style="display: flex; align-items: center; gap: 15px;">
                        <div class="pdf-icon-box"><i class="fa-solid fa-file-pdf"></i></div>
                        <div class="note-info">
                            <h4 class="note-title">${note.title}</h4>
                            <div class="note-meta">${note.class} • ${note.subject}</div>
                        </div>
                    </div>
                    <!-- Save Button (Independent Click Logic) -->
                    <button class="save-note-btn ${btnClass}" 
                            onclick="event.preventDefault(); event.stopPropagation(); handleSaveNote(this, '${note.title}', '${note.pdfLink}', '${note.class}', 'fa-bookmark');">
                        <i class="${iconClass} fa-bookmark"></i>
                    </button>
                </a>
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
                <a href="${q.link}" class="note-item-premium" target="_blank" onclick="addRecentItem('${q.title}', '${q.link}', '${q.class}', 'fa-clipboard-question')">
                    <div class="note-left" style="display: flex; align-items: center; gap: 15px;">
                        <div class="pdf-icon-box">Q.</div>
                        <div class="note-info">
                            <h4 class="note-title">${q.title}</h4>
                            <div class="note-meta">${q.class} • ${q.chapter}</div>
                        </div>
                    </div>
                </a>
            `);
        });
    } catch (error) {
        container.innerHTML = `<p style="color: #ef4444; text-align: center;">Failed to load questions.</p>`;
    }
}

/* ==========================================================================
 * 7. Smart Auto Suggestions (Exam & Month Based)
 * ========================================================================== */
async function updateSmartSuggestions() {
    const tagsContainer = document.getElementById('dynamicSuggestionTags');
    const titleText = document.getElementById('suggestionTitleText');
    if (!tagsContainer || !titleText) return;

    const currentMonth = new Date().getMonth(); 
    let suggestions = [];
    let sectionTitle = "Popular Searches";

    if (currentMonth === 3 || currentMonth === 4) {
        sectionTitle = "🔥 1st Summative Exam Special";
        suggestions = ["Class 10 1st Summative", "Class 9 Physics", "Class 8 Science"];
} else if (currentMonth === 6 || currentMonth === 7) {
        sectionTitle = "⚡ 2nd Summative Exam Trending";
        suggestions = ["Class 10 2nd Summative", "Class 9 2nd Summative", "Class 8 2nd Summative"];
    } else if (currentMonth === 8 || currentMonth === 9) {
        sectionTitle = "📚 Semester 1 & 3 Special";
        suggestions = ["Class 12 Semester 3", "Class 11 Semester 1", "Class 10 Final"];
    } else if (currentMonth === 1 || currentMonth === 2) {
        sectionTitle = "🎓 Board Exam Special";
        suggestions = ["Madhyamik Physics", "Class 12 Semester 4", "Class 11 Semester 2"];
    } else {
        sectionTitle = "✨ Trending Learning Resources";
        suggestions = ["Class 12 Electrostatics", "Class 11 Kinematics", "Smart Notes"];
    }

    titleText.innerText = sectionTitle;
    tagsContainer.innerHTML = '';

    try {
        const response = await fetch('assets/json/latest-notes.json');
        if (response.ok) {
            const notes = await response.json();
            notes.slice(0, 3).forEach(note => {
                tagsContainer.insertAdjacentHTML('beforeend', `
                    <span class="s-tag note-tag" onclick="triggerSmartSuggestion('${note.title}')">
                        <i class="fa-solid fa-file-pdf" style="margin-right: 5px; color: #ef4444;"></i> ${note.title}
                    </span>
                `);
            });
        }
    } catch (e) {
        // Skip live notes if JSON fails
    }

    suggestions.forEach(tagText => {
        tagsContainer.insertAdjacentHTML('beforeend', `<span class="s-tag" onclick="triggerSmartSuggestion('${tagText}')">${tagText}</span>`);
    });
}

window.triggerSmartSuggestion = function(queryText) {
    const input = document.getElementById('searchInput');
    if (input) {
        input.value = queryText;
        input.dispatchEvent(new Event('input')); 
    }
};

/* ==========================================================================
 * 8. Global Cross-Page Memory System (LocalStorage)
 * ========================================================================== */
window.setContinueLearning = function(title, link) {
    const classData = { title: title, link: link };
    localStorage.setItem('pl_lastClass', JSON.stringify(classData));
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

    if (isSaved) {
        toast.className = 'toast-popup success';
        toastIcon.innerHTML = '<i class="fa-solid fa-check"></i>';
        toastText.innerText = 'Note saved to collection!';
    } else {
        toast.className = 'toast-popup removed';
        toastIcon.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        toastText.innerText = 'Removed from saved notes!';
    }

    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => { 
        toast.classList.remove('show'); 
    }, 3000);
};

window.handleSaveNote = function(btnElement, title, link, sub, icon) {
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