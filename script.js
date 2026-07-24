/**
 * Physics Lover 2.0 - Ultimate Advanced JS Logic
 * Flawless implementation for Theme, Search, Modals, History, and Auto-Data from database.js
 */

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

const App = {
    init() {
        this.Theme.init();
        this.Navigation.init();
        this.Modals.init(); 
        this.DataLoader.init(); // Fetches and parses database.js automatically
        this.Search.init();
        this.History.init();
        this.PWA.init();
    }
};

/* ==========================================================================
 * Theme Manager
 * ========================================================================== */
App.Theme = {
    init() {
        this.btn = document.getElementById('themeToggle');
        this.body = document.body;
        
        const savedTheme = localStorage.getItem('pl_theme') || 'dark';
        if (savedTheme === 'light') {
            this.body.classList.add('light-mode');
            if (this.btn) this.btn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else {
            this.body.classList.remove('light-mode');
            if (this.btn) this.btn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }

        if (this.btn) {
            this.btn.addEventListener('click', () => {
                const isLight = this.body.classList.toggle('light-mode');
                localStorage.setItem('pl_theme', isLight ? 'light' : 'dark');
                
                this.btn.style.transform = 'scale(0.5)';
                setTimeout(() => {
                    this.btn.innerHTML = isLight ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
                    this.btn.style.transform = 'scale(1)';
                }, 150);
            });
        }
    }
};

/* ==========================================================================
 * Navigation
 * ========================================================================== */
App.Navigation = {
    init() {
        const menuBtn = document.getElementById('menuToggle');
        const sideNav = document.getElementById('sideNav');
        const topNav = document.getElementById('mainHeader');

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

        if (topNav) {
            window.addEventListener('scroll', () => {
                if(window.scrollY > 50) topNav.classList.add('scrolled');
                else topNav.classList.remove('scrolled');
            });
        }
    }
};

/* ==========================================================================
 * Global State for Auto-Fetched Notes
 * ========================================================================== */
const GlobalData = {
    notes: [] 
};

/* ==========================================================================
 * Auto Data Loader (Directly from database.js)
 * ========================================================================== */
App.DataLoader = {
    init() {
        this.parseDatabase();
        this.renderLatestNotes();
        this.loadMarquee();
    },
    
    // Core Logic to scan database.js and find valid links
    parseDatabase() {
        if (typeof dbCourse === 'undefined') {
            console.error("database.js is not loaded or dbCourse is missing!");
            return;
        }

        let allValidNotes = [];

        // Loop through every class in the database
        ['class7', 'class8', 'class9', 'class10', 'class11', 'class12'].forEach(cls => {
            if(dbCourse[cls]) {
                // Loop through subjects (excluding 'exams' and 'formulas' for main notes)
                Object.keys(dbCourse[cls]).forEach(subject => {
                    if (subject === 'exams' || subject === 'formulas') return;

                    let chapters = dbCourse[cls][subject];
                    chapters.forEach(chapter => {
                        // Some have nested 'topics' array, some are direct objects
                        let itemsToCheck = chapter.topics ? chapter.topics : [chapter];
                        
                        itemsToCheck.forEach(item => {
                            let noteLink = item.link || item.pdfLink || "";
                            
                            // Condition: If a real link is provided (not empty and not "URL_NOTE")
                            if(noteLink && !noteLink.includes("URL_NOTE")) {
                                
                                // Parse Date for sorting (if empty, defaults to 0)
                                let noteDate = item.uploadDate ? new Date(item.uploadDate).getTime() : 0;
                                
                                // Determine if note is newly added (within last 7 days)
                                let isNew = false;
                                if (noteDate > 0) {
                                    const sevenDaysAgo = new Date().getTime() - (7 * 24 * 60 * 60 * 1000);
                                    isNew = noteDate > sevenDaysAgo;
                                }

                                // Format Subject Name for UI
                                let displaySubject = subject.charAt(0).toUpperCase() + subject.slice(1);
                                if(subject === 'onko') displaySubject = 'Math';
                                if(subject === 'paribesh') displaySubject = 'Environment';

                                allValidNotes.push({
                                    title: item.bn || item.en || chapter.bn,
                                    url: noteLink,
                                    class_name: cls.replace('class', 'Class '),
                                    subject: displaySubject,
                                    is_new: isNew,
                                    dateVal: noteDate
                                });
                            }
                        });
                    });
                });
            }
        });

        // Sort by Date (Newest First)
        allValidNotes.sort((a, b) => b.dateVal - a.dateVal);
        
        GlobalData.notes = allValidNotes; // Store globally for Search function
    },

    renderLatestNotes() {
        const box = document.getElementById('latestNotesContainer');
        if (!box) return;

        if (GlobalData.notes.length > 0) {
            box.innerHTML = ''; // Clear loading message
            
            // Take top 4 recent notes
            GlobalData.notes.slice(0, 4).forEach((note, index) => {
                const delay = index * 0.1;
                const newBadge = note.is_new ? `<span style="font-size:0.6rem; background:rgba(239,68,68,0.2); color:#EF4444; padding:3px 6px; border-radius:4px; margin-left:8px; border:1px solid rgba(239,68,68,0.4);">NEW</span>` : '';
                
                box.innerHTML += `
                    <a href="${note.url}" target="_blank" class="note-item track-recent" data-title="${note.title}" data-sub="${note.class_name}" data-icon="fa-file-pdf" style="animation: fadeUpIn 0.5s ease forwards; animation-delay: ${delay}s; opacity: 0;">
                        <div class="note-left">
                            <div class="pdf-icon-box"><i class="fa-solid fa-file-pdf"></i></div>
                            <div class="note-info">
                                <h4 class="note-title">${note.title} ${newBadge}</h4>
                                <div class="note-meta">${note.class_name} • ${note.subject}</div>
                            </div>
                        </div>
                        <div class="pdf-badge"><i class="fa-solid fa-download"></i> PDF</div>
                    </a>
                `;
            });
        } else {
            // Fallback if no valid links found in database.js yet
            box.innerHTML = `
                <div style="padding: 20px; text-align: center; color: var(--text-secondary); background: var(--bg-card); border-radius: 16px; border: 1px dashed var(--border-glass);">
                    <i class="fa-solid fa-folder-open" style="font-size: 2.5rem; margin-bottom: 15px; color: var(--text-muted);"></i>
                    <h4 style="color: var(--text-primary); margin-bottom: 5px;">No New Updates</h4>
                    <p style="font-size: 0.85rem;">Update the links in your database to see notes here.</p>
                </div>
            `;
        }
    },

    async loadMarquee() {
        const box = document.getElementById('announcementMarquee');
        if (!box) return;
        
        try {
            const rssUrl = encodeURIComponent('https://www.youtube.com/feeds/videos.xml?channel_id=UC-Miznr3vVMOC2-lVO-XzpA');
            const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`);
            if (!res.ok) throw new Error();
            const data = await res.json();
            
            if (data.status === 'ok' && data.items.length > 0) {
                let html = '';
                data.items.slice(0, 4).forEach(v => {
                    let title = v.title.length > 45 ? v.title.substring(0, 45) + '...' : v.title;
                    html += `
                        <a href="${v.link}" target="_blank" class="ann-item track-recent" data-title="${title}" data-sub="YouTube Update" data-icon="fa-youtube">
                            <span class="ann-tag"><i class="fa-brands fa-youtube"></i> Video</span> ${title}
                        </a>
                    `;
                });
                box.innerHTML = html + html; 
            } else {
                throw new Error("No videos found");
            }
        } catch(e) {
            box.innerHTML = '<span style="color:var(--text-secondary);">Welcome to Physics Lover 2.0 - Keep Learning, Keep Growing! <i class="fa-solid fa-heart" style="color:#EF4444"></i></span>';
        }
    }
};

/* ==========================================================================
 * Search Manager (Connected with Auto-Data)
 * ========================================================================== */
App.Search = {
    init() {
        this.btn = document.querySelector('button[aria-label="Search"]');
        this.dropdown = document.getElementById('searchDropdown');
        this.closeBtn = document.getElementById('closeSearchBtn');
        this.input = document.getElementById('searchInput');
        this.resultsBox = document.getElementById('searchResults');
        this.sugBox = document.getElementById('searchSuggestions');
        
        if (this.btn && this.dropdown) {
            this.btn.addEventListener('click', () => {
                this.dropdown.classList.remove('hidden-search');
                if(this.input) {
                    this.input.value = '';
                    this.input.focus();
                    this.handleInput(''); 
                }
            });
        }
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.dropdown.classList.add('hidden-search'));
        }

        if (this.input) {
            let timeout = null;
            this.input.addEventListener('input', (e) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => this.handleInput(e.target.value.toLowerCase().trim()), 200);
            });
        }
    },
    handleInput(query) {
        if (!this.resultsBox || !this.sugBox) return;
        
        if (query.length === 0) {
            this.resultsBox.innerHTML = '';
            this.resultsBox.classList.add('hidden-element');
            this.sugBox.classList.remove('hidden-element');
            return;
        }

        this.resultsBox.classList.remove('hidden-element');
        this.sugBox.classList.add('hidden-element');
        
        let html = '';
        let count = 0;
        
        // 1. Search Static UI Elements
        const uiElements = document.querySelectorAll('.class-card, .feature-card, .quick-action-card');
        uiElements.forEach(el => {
            const title = el.querySelector('.class-title, .feat-title, .qa-title')?.innerText || '';
            const sub = el.querySelector('.class-subtitle, .feat-subtitle, .qa-subtitle')?.innerText || '';
            const fullText = (title + " " + sub).toLowerCase();
            
            if (fullText.includes(query)) {
                const link = el.getAttribute('href') || '#';
                if(link === 'javascript:void(0)') return;
                
                let icon = 'fa-link';
                if(el.classList.contains('class-card')) icon = 'fa-graduation-cap';
                else if(el.classList.contains('feature-card')) icon = 'fa-star';
                
                html += this.generateResultCard(link, title, sub, icon);
                count++;
            }
        });

        // 2. Search Auto-Fetched Notes from database.js
        if (GlobalData.notes && GlobalData.notes.length > 0) {
            GlobalData.notes.forEach(note => {
                const fullText = (note.title + " " + note.class_name + " " + note.subject).toLowerCase();
                if (fullText.includes(query)) {
                    html += this.generateResultCard(note.url, note.title, `${note.class_name} • ${note.subject}`, 'fa-file-pdf');
                    count++;
                }
            });
        }

        if (count === 0) {
            this.resultsBox.innerHTML = `
                <div style="padding: 30px; text-align: center; color: var(--text-secondary);">
                    <i class="fa-solid fa-magnifying-glass-minus" style="font-size: 2.5rem; margin-bottom: 15px; color: var(--text-muted);"></i>
                    <h4 style="color: var(--text-primary); margin-bottom: 5px;">No Results Found</h4>
                    <p style="font-size: 0.85rem;">We couldn't find anything matching "${query}".</p>
                </div>
            `;
        } else {
            this.resultsBox.innerHTML = html;
        }
    },
    generateResultCard(link, title, sub, icon) {
        return `
            <a href="${link}" class="search-result-item track-recent" data-title="${title}" data-sub="${sub}" data-icon="${icon}" onclick="document.getElementById('searchDropdown').classList.add('hidden-search')">
                <div style="width:40px; height:40px; border-radius:10px; background:rgba(6,182,212,0.1); color:var(--accent-cyan); display:flex; align-items:center; justify-content:center; font-size:1.1rem; flex-shrink: 0;">
                    <i class="fa-solid ${icon}"></i> 
                </div>
                <div style="flex:1;">
                    <div style="font-weight: 700; color: var(--text-primary);">${title}</div>
                    <div style="font-size: 0.8rem; color: var(--text-secondary);">${sub}</div>
                </div>
                <i class="fa-solid fa-arrow-right" style="color: var(--text-muted); font-size: 0.9rem;"></i>
            </a>`;
    }
};

/* ==========================================================================
 * Modals Manager
 * ========================================================================== */
App.Modals = {
    init() {
        if (!document.getElementById('recentModal')) {
            const modalHTML = `
            <div id="recentModal" class="custom-modal-overlay hidden-modal" aria-modal="true" role="dialog">
                <div class="custom-modal-card">
                    <div class="modal-header">
                        <h3 class="modal-title"><i class="fa-solid fa-clock-rotate-left highlight-cyan"></i> Recently Opened</h3>
                        <button class="modal-close-btn" aria-label="Close" data-close="recentModal">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    <div class="modal-body" id="recentList" style="max-height: 400px; overflow-y: auto; padding-right: 5px;">
                    </div>
                </div>
            </div>`;
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        }

        document.addEventListener('click', (e) => {
            const closeBtn = e.target.closest('[data-close]');
            if (closeBtn) {
                const modalId = closeBtn.getAttribute('data-close');
                const modal = document.getElementById(modalId);
                if (modal) modal.classList.add('hidden-modal');
            }
            if (e.target.classList.contains('custom-modal-overlay')) {
                e.target.classList.add('hidden-modal');
            }
        });
    }
};

/* ==========================================================================
 * History Manager
 * ========================================================================== */
App.History = {
    init() {
        this.updateUI();
        
        document.addEventListener('click', (e) => {
            const card = e.target.closest('.class-card, .feature-card, .track-recent, .note-item, .syllabus-card');
            
            if (card) {
                let title = card.getAttribute('data-title') || card.querySelector('.class-title, .feat-title, .qa-title, .note-title, h3, h4')?.innerText;
                let link = card.getAttribute('href');
                let sub = card.getAttribute('data-sub') || 'Visited';
                let icon = card.getAttribute('data-icon') || 'fa-eye';
                
                if (card.classList.contains('class-card')) { icon = 'fa-graduation-cap'; sub = 'Class Entered'; }
                if (card.classList.contains('feature-card')) { icon = 'fa-star'; }
                if (card.classList.contains('note-item')) { icon = 'fa-file-pdf'; sub = 'Note Document'; }
                
                if(title && link && link !== '#' && link !== 'javascript:void(0)') {
                    this.saveItem({ title: title.replace('NEW', '').trim(), link, sub, icon, time: new Date().getTime() });
                }
            }
        });

        const recentBtn = document.getElementById('qaRecentLink');
        if(recentBtn) {
            recentBtn.addEventListener('click', () => {
                const list = document.getElementById('recentList');
                const items = JSON.parse(localStorage.getItem('pl_history')) || [];
                
                if(list) {
                    if (items.length === 0) {
                        list.innerHTML = `
                            <div style="padding: 30px; text-align: center; color: var(--text-secondary);">
                                <i class="fa-solid fa-clock-rotate-left" style="font-size: 2.5rem; margin-bottom: 15px; color: var(--text-muted); opacity: 0.5;"></i>
                                <h4 style="color: var(--text-primary); margin-bottom: 5px;">History Empty</h4>
                                <p style="font-size: 0.85rem;">Links you visit will appear here for quick access.</p>
                            </div>
                        `;
                    } else {
                        list.innerHTML = items.map(i => `
                            <a href="${i.link}" style="display:flex; align-items:center; gap:15px; padding:15px; background:var(--bg-card); border:1px solid var(--border-glass); border-radius:14px; margin-bottom:12px; text-decoration:none; transition:0.3s;">
                                <div style="width:45px; height:45px; border-radius:12px; background:rgba(6, 182, 212, 0.1); color:var(--accent-cyan); display:flex; align-items:center; justify-content:center; font-size:1.2rem; flex-shrink:0;">
                                                                        <i class="fa-solid ${i.icon}"></i>
                                </div>
                                <div style="flex:1;">
                                    <div style="font-weight:700; color:var(--text-primary); font-size:0.95rem;">${i.title}</div>
                                    <div style="font-size:0.8rem; color:var(--text-secondary); margin-top:3px;">${i.sub}</div>
                                </div>
                                <i class="fa-solid fa-angle-right" style="color:var(--text-muted);"></i>
                            </a>
                        `).join('');
                    }
                }
                const modal = document.getElementById('recentModal');
                if(modal) modal.classList.remove('hidden-modal');
            });
        }
    },
    saveItem(itemData) {
        let items = JSON.parse(localStorage.getItem('pl_history')) || [];
        items = items.filter(i => i.link !== itemData.link);
        items.unshift(itemData);
        if(items.length > 10) items.pop();
        localStorage.setItem('pl_history', JSON.stringify(items));
        this.updateUI();
    },
    updateUI() {
        const items = JSON.parse(localStorage.getItem('pl_history')) || [];
        const qaSub = document.getElementById('qaRecentSub');
        if(qaSub) {
            qaSub.innerText = items.length ? `Last: ${items[0].title}` : 'History empty';
        }
    }
};

/* ==========================================================================
 * PWA Requirements
 * ========================================================================== */
App.PWA = {
    init() {
        const installBtn = document.getElementById('navInstallBtn');
        if(window.matchMedia('(display-mode: standalone)').matches && installBtn) {
            installBtn.style.display = 'none';
        }
    }
};
