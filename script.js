/**
 * Physics Lover 2.0 - Ultimate Master Script (Optimized & Connected to database.js)
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
                
                const titleText = (titleEl.innerText || titleEl.textContent).toLowerCase();
                const subtitleEl = el.querySelector('.class-subtitle, .feat-subtitle, .qa-subtitle');
                const subText = subtitleEl ? (subtitleEl.innerText || subtitleEl.textContent).toLowerCase() : '';
                
                let isMatch = titleText.includes(query) || subText.includes(query) || query.includes(titleText);

                if (isMatch) {
                    let category = "Link"; let icon = "fa-link";
                    if(el.classList.contains('class-card')) { category = "Class"; icon = "fa-graduation-cap"; }
                    else if(el.classList.contains('note-click-area')) { category = "Note"; icon = "fa-file-pdf"; }
                    else if(el.classList.contains('feature-card')) { category = "Feature"; icon = "fa-star"; }

                    const link = el.getAttribute('href') || '#';
                    if (link === 'javascript:void(0)') return;

                    resultsHTML += `
                        <a href="${link}" class="search-result-item track-recent" data-title="${titleEl.innerText}" data-sub="${category}" data-icon="${icon}" onclick="document.getElementById('searchDropdown').classList.add('hidden-search')">
                            <i class="fa-solid ${icon} highlight-cyan" style="width: 25px; text-align: center;"></i>
                            <div class="search-result-title">${titleEl.innerText}</div>
                            <span class="search-badge">${category}</span>
                        </a>`;
                    matchCount++;
                }
            });

            if (matchCount === 0) {
                searchResults.innerHTML = `<div class="state-message" style="padding: 20px;"><i class="fa-solid fa-face-frown highlight-cyan"></i><br>No content found. Please try simple keywords like "Class 10" or "Notes".</div>`;
            } else {
                searchResults.innerHTML = resultsHTML;
            }
        });
    }
}

/* ==========================================================================
 * Helper Function for Subject Names
 * ========================================================================== */
function getSubjectName(sub) {
    if(sub === 'physical' || sub === 'physics') return 'Physics';
    if(sub === 'life') return 'Life Science';
    if(sub === 'onko') return 'Mathematics';
    if(sub === 'paribesh') return 'Science/Environment';
    return sub;
}

/* ==========================================================================
 * 3. Quick Actions & Modals
 * ========================================================================== */
function setupQuickActions() {
    const qaContinueSub = document.getElementById('qaContinueSub');
    const qaContinueLink = document.getElementById('qaContinueLink');
    const qaRecentSub = document.getElementById('qaRecentSub');
    
    const lastClass = JSON.parse(localStorage.getItem('pl_lastClass'));
    if (lastClass && lastClass.title && qaContinueSub) {
        qaContinueSub.innerText = lastClass.title;
        if (qaContinueLink) qaContinueLink.href = lastClass.link || '#';
    }

    let recentItems = [];
    try {
        recentItems = JSON.parse(localStorage.getItem('pl_recentItems')) || [];
    } catch(e) {}
    
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
 * 4. Fetch Home Page Notes (Dynamically from database.js)
 * ========================================================================== */
function fetchLatestNotes() {
    const container = document.getElementById('latestNotesContainer');
    if (!container) return;

    if (typeof dbCourse === 'undefined') {
        container.innerHTML = '<div class="state-message">Database not connected!</div>';
        return;
    }

    let latestItems = [];

    ['class7', 'class8', 'class9', 'class10', 'class11', 'class12'].forEach(cls => {
        if(dbCourse[cls]) {
            ['physical', 'life', 'onko', 'paribesh', 'physics'].forEach(subject => {
                if(dbCourse[cls][subject]) {
                    dbCourse[cls][subject].forEach(chapter => {
                        let itemsToCheck = chapter.topics ? chapter.topics : [chapter];
                        
                        itemsToCheck.forEach(topic => {
                            let noteLink = topic.link || topic.pdfLink || "";
                            if (topic.uploadDate && noteLink && !noteLink.includes("URL_NOTE")) {
                                latestItems.push({
                                    title: topic.bn || topic.title || chapter.bn,
                                    class: cls.replace('class', 'Class '),
                                    subject: getSubjectName(subject),
                                    pdfLink: noteLink,
                                    date: new Date(topic.uploadDate)
                                });
                            }
                        });
                    });
                }
            });
        }
    });

    latestItems.sort((a, b) => b.date - a.date);
    container.innerHTML = '';

    if (latestItems.length === 0) {
        container.innerHTML = '<div class="state-message">No recent updates found.</div>';
        return;
    }

    latestItems.slice(0, 4).forEach(note => {
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
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    
    if (isStandalone && navInstallBtn) {
        navInstallBtn.style.display = 'none'; 
    }

    window.addEventListener('beforeinstallprompt', (e) => { 
        e.preventDefault(); 
        deferredPrompt = e; 
    });

    window.addEventListener('appinstalled', () => {
        deferredPrompt = null;
        if (navInstallBtn) navInstallBtn.style.display = 'none';
    });

    if (navInstallBtn) {
        navInstallBtn.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                if (outcome === 'accepted') {
                    deferredPrompt = null;
                    navInstallBtn.style.display = 'none';
                }
            } else {
                if (!isStandalone) {
                    openModal(document.getElementById('instructionModal'));
                }
            }
        });
    }

    document.querySelectorAll('[data-close]').forEach(btn => {
        btn.addEventListener('click', (e) => { closeModal(document.getElementById(e.currentTarget.getAttribute('data-close'))); });
    });
}

window.openModal = function(modal) { if (modal) modal.classList.remove('hidden-modal'); };
window.closeModal = function(modal) { if (modal) modal.classList.add('hidden-modal'); };

/* ==========================================================================
 * 6. Internal Pages Loaders (Connected to database.js)
 * ========================================================================== */
function loadAllNotesPage() {
    const container = document.getElementById('notesListContainer');
    if (!container) return;

    if (typeof dbCourse === 'undefined') {
        container.innerHTML = '<p style="color: #ef4444; text-align: center;">Database not found!</p>';
        return;
    }
    
    let allItems = [];
    ['class7', 'class8', 'class9', 'class10', 'class11', 'class12'].forEach(cls => {
        if(dbCourse[cls]) {
            ['physical', 'life', 'onko', 'paribesh', 'physics'].forEach(subject => {
                if(dbCourse[cls][subject]) {
                    dbCourse[cls][subject].forEach(chapter => {
                        let itemsToCheck = chapter.topics ? chapter.topics : [chapter];
                        itemsToCheck.forEach(topic => {
                            let noteLink = topic.link || topic.pdfLink || "";
                            if (topic.uploadDate && noteLink && !noteLink.includes("URL_NOTE")) {
                                allItems.push({
                                    title: topic.bn || topic.title || chapter.bn,
                                    class: cls.replace('class', 'Class '),
                                    subject: getSubjectName(subject),
                                    pdfLink: noteLink,
                                    date: new Date(topic.uploadDate)
                                });
                            }
                        });
                    });
                }
            });
        }
    });

    allItems.sort((a, b) => b.date - a.date);
    container.innerHTML = '';
    
    if (allItems.length === 0) {
        container.innerHTML = '<p style="color: #94A3B8; text-align: center;">No notes uploaded yet.</p>';
        return;
    }

    allItems.forEach(note => {
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
 * 7. Ultra-Smart Auto Suggestions (LocalStorage AI + DOM + database.js)
 * ========================================================================== */
function updateSmartSuggestions() {
    const tagsContainer = document.getElementById('dynamicSuggestionTags');
    const titleText = document.getElementById('suggestionTitleText');
    if (!tagsContainer || !titleText) return;

    titleText.innerHTML = '<i class="fa-solid fa-bolt highlight-cyan"></i> Recommended For You';
    
    let freqMap = JSON.parse(localStorage.getItem('pl_search_freq')) || {};
    let sortedUserHistory = Object.entries(freqMap)
        .sort((a, b) => b[1] - a[1])
        .map(item => item[0]);
    
    let displayedTags = new Set(); 
    let htmlContent = '';

    let historyCount = 0;
    for (let kw of sortedUserHistory) {
        if (historyCount >= 2) break; 
        htmlContent += `<span class="s-tag" style="border-color: #06B6D4; background: rgba(6, 182, 212, 0.15);" onclick="triggerSmartSuggestion('${kw}', true)">
            <i class="fa-solid fa-clock-rotate-left" style="color: #06B6D4; margin-right: 5px;"></i> ${kw}
        </span>`;
        displayedTags.add(kw.toLowerCase());
        historyCount++;
    }

    if (typeof dbCourse !== 'undefined') {
        let allTopics = [];
        ['class7', 'class8', 'class9', 'class10', 'class11', 'class12'].forEach(cls => {
            if(dbCourse[cls]) {
                ['physical', 'life', 'onko', 'paribesh', 'physics'].forEach(subject => {
                    if(dbCourse[cls][subject]) {
                        dbCourse[cls][subject].forEach(chapter => {
                            let itemsToCheck = chapter.topics ? chapter.topics : [chapter];
                            itemsToCheck.forEach(topic => {
                                let noteLink = topic.link || topic.pdfLink || "";
                                if(topic.bn && noteLink && !noteLink.includes("URL_NOTE")) {
                                    allTopics.push(topic.bn || chapter.bn);
                                }
                            });
                        });
                    }
                });
            }
        });

        const shuffledNotes = allTopics.sort(() => 0.5 - Math.random()).slice(0, 2);
        shuffledNotes.forEach(noteTitle => {
            if (!displayedTags.has(noteTitle.toLowerCase())) {
                htmlContent += `<span class="s-tag" onclick="triggerSmartSuggestion('${noteTitle}', true)">
                    <i class="fa-solid fa-file-pdf" style="margin-right: 5px; color: #ef4444;"></i> ${noteTitle}
                </span>`;
                displayedTags.add(noteTitle.toLowerCase());
            }
        });
    }

    const classElements = document.querySelectorAll('.class-card .class-title');
    const featureElements = document.querySelectorAll('.feature-card .feat-title');
    let domKeywords = [];
    
    classElements.forEach(el => domKeywords.push(el.innerText || el.textContent));
    featureElements.forEach(el => {
        const text = el.innerText || el.textContent;
        if (text.includes('Notes') || text.includes('Question')) domKeywords.push(text);
    });

    if (domKeywords.length === 0) domKeywords = ["Class 10", "Class 12", "Question Bank"];

    const shuffledDOM = domKeywords.sort(() => 0.5 - Math.random());
    let domCount = 0;
    for (let kw of shuffledDOM) {
        if (domCount >= 2) break; 
        if (!displayedTags.has(kw.toLowerCase())) {
            htmlContent += `<span class="s-tag" onclick="triggerSmartSuggestion('${kw}', false)">${kw}</span>`;
            displayedTags.add(kw.toLowerCase());
            domCount++;
        }
    }

    tagsContainer.innerHTML = htmlContent;
}

window.triggerSmartSuggestion = function(queryText, isSpecificItem = false) {
    const lowerQuery = queryText.toLowerCase().trim();
    
    let freqMap = JSON.parse(localStorage.getItem('pl_search_freq')) || {};
    freqMap[queryText] = (freqMap[queryText] || 0) + 1;
    localStorage.setItem('pl_search_freq', JSON.stringify(freqMap));

    let targetUrl = '';
    const classMatch = lowerQuery.match(/class\s*(7|8|9|10|11|12)/);
    
    if (classMatch) targetUrl = `class${classMatch[1]}.html`;
    else if (lowerQuery.includes('madhyamik')) targetUrl = 'class10.html';
    else if (lowerQuery.includes('hs') || lowerQuery.includes('higher secondary')) targetUrl = 'class12.html';
    else if (lowerQuery.includes('question') || lowerQuery.includes('bank') || lowerQuery.includes('mcq')) targetUrl = 'pb.html';
    else if (lowerQuery.includes('planner') || lowerQuery.includes('routine')) targetUrl = 'studyplanner.html';
    else if (lowerQuery.includes('notes') && !isSpecificItem) targetUrl = 'notes.html';

    if (targetUrl && !isSpecificItem) {
        window.location.href = targetUrl;
    } else {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = queryText;
            searchInput.dispatchEvent(new Event('input')); 
            searchInput.focus();
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
 * 9. Global Click Tracking
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