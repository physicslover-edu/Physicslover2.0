/**
 * Physics Lover 2.0 - Ultimate Master Script (Optimized & Cleaned)
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
    loadAnnouncements(); 
    setupGlobalTracking(); 
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
                        <a href="${link}" class="search-result-item track-recent" data-title="${titleText}" data-sub="${category}" data-icon="${icon}" onclick="document.getElementById('searchDropdown').classList.add('hidden-search')">
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
 * 3. Quick Actions & Modals (History Only)
 * ========================================================================== */
function setupQuickActions() {
    const qaContinueSub = document.getElementById('qaContinueSub');
    const qaContinueLink = document.getElementById('qaContinueLink');
    const qaRecentSub = document.getElementById('qaRecentSub');
    
    // Load last viewed class
    const lastClass = JSON.parse(localStorage.getItem('pl_lastClass'));
    if (lastClass && lastClass.title && qaContinueSub) {
        qaContinueSub.innerText = lastClass.title;
        if (qaContinueLink) qaContinueLink.href = lastClass.link || '#';
    }

    // Load recent history items
    let recentItems = [];
    try {
        recentItems = JSON.parse(localStorage.getItem('pl_recentItems')) || [];
    } catch(e) {}
    
    if (qaRecentSub) qaRecentSub.innerText = recentItems.length > 0 ? `${recentItems.length} items viewed` : 'History empty';
    
    // Setup history modal trigger
    const qaRecentLink = document.getElementById('qaRecentLink');
    if (qaRecentLink) {
        qaRecentLink.addEventListener('click', () => {
            const listDiv = document.getElementById('recentList');
            if(!listDiv) return;
            listDiv.innerHTML = '';
            if (recentItems.length === 0) {
                listDiv.innerHTML = '<div class="state-message">No history found.</div>';
            } else {
                recentItems.slice(0, 10).forEach(item => {
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
            openModal(document.getElementById('recentModal'));
        });
    }
}

/* ==========================================================================
 * 4. Fetch Home Page Notes (Shows only 4 on Home)
 * ========================================================================== */
async function fetchLatestNotes() {
    const container = document.getElementById('latestNotesContainer');
    if (!container) return;
    try {
        const response = await fetch('assets/json/latest-notes.json');
        const notes = await response.json();
        container.innerHTML = '';
        if (notes.length === 0) return;

        notes.slice(0, 4).forEach(note => {
            container.insertAdjacentHTML('beforeend', `
                <a href="${note.pdfLink}" target="_blank" class="note-item track-recent" data-title="${note.title}" data-sub="${note.class}" data-icon="fa-file-pdf" style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; text-decoration: none; color: inherit;">
                    <div style="flex: 1; display: flex; align-items: center; gap: 14px;">
                        <div class="pdf-icon-box"><i class="fa-solid fa-file-pdf"></i></div>
                        <div class="note-info">
                            <h4 class="note-title">${note.title}</h4>
                            <div class="note-meta"><span>${note.class} &bull; ${note.subject}</span></div>
                        </div>
                    </div>
                </a>
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
        
        questions.slice(0, 4).forEach(q => {
            container.insertAdjacentHTML('beforeend', `
                <a href="${q.link}" class="note-item track-recent" data-title="${q.title}" data-sub="${q.class}" data-icon="fa-clipboard-question" target="_blank">
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
 * 5. Direct Native PWA Install Button Logic
 * ========================================================================== */
function setupPWAInstall() {
    const navInstallBtn = document.getElementById('navInstallBtn');
    
    // Check if app is already installed/running in standalone mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    
    if (isStandalone && navInstallBtn) {
        navInstallBtn.style.display = 'none'; // Hide if already installed
    }

    // Capture the install prompt event
    window.addEventListener('beforeinstallprompt', (e) => { 
        e.preventDefault(); 
        deferredPrompt = e; 
    });

    // Automatically hide button if installation succeeds
    window.addEventListener('appinstalled', () => {
        deferredPrompt = null;
        if (navInstallBtn) navInstallBtn.style.display = 'none';
    });

    if (navInstallBtn) {
        navInstallBtn.addEventListener('click', async () => {
            if (deferredPrompt) {
                // Show native install popup directly (No custom modal)
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                if (outcome === 'accepted') {
                    deferredPrompt = null;
                    navInstallBtn.style.display = 'none';
                }
            } else {
                // Fallback for iOS or unsupported browsers
                if (!isStandalone) {
                    openModal(document.getElementById('instructionModal'));
                }
            }
        });
    }

    // Close Modals setup (Kept for history/instruction modals)
    document.querySelectorAll('[data-close]').forEach(btn => {
        btn.addEventListener('click', (e) => { closeModal(document.getElementById(e.currentTarget.getAttribute('data-close'))); });
    });
}

window.openModal = function(modal) { if (modal) modal.classList.remove('hidden-modal'); };
window.closeModal = function(modal) { if (modal) modal.classList.add('hidden-modal'); };

/* ==========================================================================
 * 6. Internal Pages Loaders (notes.html & question-bank.html - Shows ALL)
 * ========================================================================== */
async function loadAllNotesPage() {
    const container = document.getElementById('notesListContainer');
    if (!container) return;
    try {
        const response = await fetch('assets/json/latest-notes.json');
        const notes = await response.json();
        container.innerHTML = '';
        
        notes.forEach(note => {
            container.insertAdjacentHTML('beforeend', `
                <a href="${note.pdfLink}" target="_blank" class="note-item glass-panel track-recent" data-title="${note.title}" data-sub="${note.class}" data-icon="fa-file-pdf" style="display: flex; align-items: center; justify-content: space-between; padding: 12px; border-radius: 14px; text-decoration: none; color: inherit;">
                    <div style="flex: 1; display: flex; align-items: center; gap: 15px;">
                        <div class="pdf-icon-box"><i class="fa-solid fa-file-pdf"></i></div>
                        <div class="note-info">
                            <h4 class="note-title">${note.title}</h4>
                            <div class="note-meta">${note.class} • ${note.subject}</div>
                        </div>
                    </div>
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
                <a href="${q.link}" class="note-item glass-panel track-recent" data-title="${q.title}" data-sub="${q.class}" data-icon="fa-clipboard-question" target="_blank" style="padding: 12px; border-radius: 14px; display: block; text-decoration: none; color: inherit;">
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
/* ==========================================================================
 * 7. Smart Auto Suggestions (Dynamic Academic Calendar Logic)
 * ========================================================================== */
async function updateSmartSuggestions() {
    const tagsContainer = document.getElementById('dynamicSuggestionTags');
    const titleText = document.getElementById('suggestionTitleText');
    if (!tagsContainer || !titleText) return;

    // JavaScript-এ মাস 0 থেকে শুরু হয় (0 = Jan, 1 = Feb, 2 = Mar... 11 = Dec)
    const currentMonth = new Date().getMonth(); 
    let suggestions = ["Class 10 Notes", "Class 12 Physics", "Smart Study"];
    let sectionTitle = "✨ Trending Learning Resources";

    // 🎓 ফেব্রুয়ারি (1): ক্লাস 10 থার্ড সামেটিভ (মাধ্যমিক), 11 সেম 2, 12 সেম 4
    if (currentMonth === 1) { 
        sectionTitle = "🎓 Board & Final Semester Special"; 
        suggestions = ["Class 10 Madhyamik", "Class 12 Semester 4", "Class 11 Semester 2"]; 
    } 
    // 🔥 মার্চ (2) - এপ্রিল (3): ফার্স্ট সামেটিভ (7-10) + মার্চে মাধ্যমিক/সেমিস্টার শেষ পর্যায়
    else if (currentMonth === 2 || currentMonth === 3) { 
        sectionTitle = "🔥 1st Summative & Finals"; 
        suggestions = ["Class 10 1st Summative", "Class 9 1st Summative", "Class 12 Semester 4"]; 
    }
    // ⚡ অগাস্ট (7): সেকেন্ড সামেটিভ (7-10)
    else if (currentMonth === 7) { 
        sectionTitle = "⚡ 2nd Summative Trending"; 
        suggestions = ["Class 10 2nd Summative", "Class 9 2nd Summative", "Class 8 2nd Summative"]; 
    } 
    // 📚 সেপ্টেম্বর (8) - অক্টোবর (9): 11 সেম 1, 12 সেম 3 (+ 2nd সামেটিভ ওভারল্যাপ)
    else if (currentMonth === 8 || currentMonth === 9) { 
        sectionTitle = "📚 Semester 1 & 3 Special"; 
        suggestions = ["Class 12 Semester 3", "Class 11 Semester 1", "Class 10 2nd Summative"]; 
    } 
    // 🏆 নভেম্বর (10) - ডিসেম্বর (11): থার্ড সামেটিভ (7-9)
    else if (currentMonth === 10 || currentMonth === 11) { 
        sectionTitle = "🏆 3rd Summative Special"; 
        suggestions = ["Class 9 3rd Summative", "Class 8 3rd Summative", "Class 7 3rd Summative"]; 
    }

    titleText.innerText = sectionTitle;
    tagsContainer.innerHTML = '';

    // API থেকে লেটেস্ট ২টো নোটস লোড করা
    try {
        const response = await fetch('assets/json/latest-notes.json');
        if (response.ok) {
            const notes = await response.json();
            notes.slice(0, 2).forEach(note => {
                tagsContainer.insertAdjacentHTML('beforeend', `<span class="s-tag" onclick="triggerSmartSuggestion('${note.title}')"><i class="fa-solid fa-file-pdf" style="margin-right: 5px; color: #ef4444;"></i> ${note.title}</span>`);
            });
        }
    } catch (e) {
        console.error("Smart suggestions notes error");
    }

    // তোমার দেওয়া মাস অনুযায়ী রুটিন থেকে ট্যাগগুলো বসানো
    suggestions.forEach(tagText => { 
        tagsContainer.insertAdjacentHTML('beforeend', `<span class="s-tag" onclick="triggerSmartSuggestion('${tagText}')">${tagText}</span>`); 
    });
}
/* ==========================================================================
 * 7. Smart Auto Suggestions (Advanced Routing Logic)
 * ========================================================================== */
window.triggerSmartSuggestion = function(queryText) {
    const lowerQuery = queryText.toLowerCase().trim();
    let targetUrl = '';

    // ১. স্মার্ট ক্লাস ডিটেকশন (Regex দিয়ে): 
    // লেখা থেকে নিজে নিজেই ক্লাস ৭ থেকে ১২ বের করে নেবে
    const classMatch = lowerQuery.match(/class\s*(7|8|9|10|11|12)/);
    
    if (classMatch) {
        // যদি ক্লাস মিলে যায় (যেমন: "Class 10 1st Summative"), তাহলে সরাসরি class10.html এ যাবে
        targetUrl = `class${classMatch[1]}.html`;
    } 
    // ২. বোর্ড পরীক্ষার স্পেশাল কি-ওয়ার্ড
    else if (lowerQuery.includes('madhyamik')) {
        targetUrl = 'class10.html';
    } 
    else if (lowerQuery.includes('hs') || lowerQuery.includes('higher secondary')) {
        targetUrl = 'class12.html';
    } 
    // ৩. স্টাডি মেটেরিয়াল ও প্রশ্নপত্র ডিটেকশন
    else if (lowerQuery.includes('question') || lowerQuery.includes('bank') || lowerQuery.includes('mcq') || lowerQuery.includes('pyq')) {
        targetUrl = 'pb.html';
    } 
    else if (lowerQuery.includes('note') || lowerQuery.includes('pdf')) {
        targetUrl = 'notes.html';
    } 
    else if (lowerQuery.includes('planner') || lowerQuery.includes('routine')) {
        targetUrl = 'studyplanner.html';
    }

    // ৪. এক্সিকিউশন ও ফলব্যাক লজিক
    if (targetUrl) {
        // যদি টার্গেট ইউআরএল পাওয়া যায়, তাহলে সরাসরি সেই পেজ লোড হবে
        window.location.href = targetUrl;
    } else {
        // যদি নির্দিষ্ট কোনো পেজ না মেলে, তবে লেখাটা সার্চ বক্সে বসিয়ে নিজে থেকে সার্চ শুরু করবে
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = queryText;
            searchInput.dispatchEvent(new Event('input')); // লাইভ সার্চ ট্রিগার করবে
            searchInput.focus(); // ইউজারের সুবিধার্থে সার্চ বক্সে ফোকাস ধরে রাখবে
        }
    }
};




/* ==========================================================================
 * 8. Dynamic YouTube Announcements Loader
 * ========================================================================== */
async function loadAnnouncements() {
    const marqueeContainer = document.getElementById('announcementMarquee');
    if (!marqueeContainer) return;

    const channelId = 'UC-Miznr3vVMOC2-lVO-XzpA';
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.status !== 'ok' || !data.items || data.items.length === 0) {
            marqueeContainer.innerHTML = '<span style="padding:0;">No new updates at the moment.</span>';
            return;
        }

        let htmlContent = '';
        data.items.slice(0, 3).forEach(video => {
            let shortTitle = video.title.length > 50 ? video.title.substring(0, 50) + "..." : video.title;

            htmlContent += `
                <a href="${video.link}" class="ann-item track-recent" data-title="${shortTitle}" data-sub="YouTube Video" data-icon="fa-youtube" target="_blank">
                    <span class="ann-tag" style="background: rgba(239, 68, 68, 0.2); color: #EF4444; border: 1px solid rgba(239, 68, 68, 0.3);">New Video</span>
                    <i class="fa-brands fa-youtube" style="color: #FF0000;"></i>
                    ${shortTitle}
                </a>
            `;
        });

        marqueeContainer.innerHTML = htmlContent + htmlContent;

    } catch (error) {
        marqueeContainer.innerHTML = '<span style="color:red; padding:0;">Failed to load latest videos.</span>';
    }
}

/* ==========================================================================
 * 9. Global Click Tracking (Captures any link with class 'track-recent')
 * ========================================================================== */
function setupGlobalTracking() {
    document.addEventListener('click', function(e) {
        const linkElement = e.target.closest('a.track-recent, a.class-card');
        if (linkElement) {
            let title = linkElement.getAttribute('data-title');
            if(!title) {
                const titleEl = linkElement.querySelector('h3, h4');
                title = titleEl ? titleEl.innerText : 'Viewed Page';
            }
            
            const link = linkElement.getAttribute('href');
            let sub = linkElement.getAttribute('data-sub') || 'Visited';
            if(linkElement.classList.contains('class-card')) sub = 'Entered Class';
            
            let icon = linkElement.getAttribute('data-icon') || 'fa-link';
            if(linkElement.classList.contains('class-card')) icon = 'fa-graduation-cap';
            
            if(linkElement.classList.contains('class-card')) {
                setContinueLearning(title, link);
            }

            addRecentItem(title, link, sub, icon);
        }
    });
}

/* ==========================================================================
 * 10. Core Data Handlers (Recent History)
 * ========================================================================== */
window.setContinueLearning = function(title, link) {
    localStorage.setItem('pl_lastClass', JSON.stringify({ title: title, link: link }));
    if (typeof setupQuickActions === 'function') setupQuickActions();
};

window.addRecentItem = function(title, link, sub, icon) {
    if(!title || !link || link === '#' || link === 'javascript:void(0)') return;

    let recent = [];
    try { recent = JSON.parse(localStorage.getItem('pl_recentItems')) || []; } catch(e){}
    
    recent = recent.filter(item => item.link !== link);
    recent.unshift({ title: title, link: link, sub: sub, icon: icon }); 
    if (recent.length > 10) recent.pop(); 
    
    localStorage.setItem('pl_recentItems', JSON.stringify(recent));
    if (typeof setupQuickActions === 'function') setupQuickActions();
};
