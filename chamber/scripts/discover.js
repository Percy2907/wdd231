import { attractions } from '../data/attractions.mjs';

// Display visit message based on localStorage
function displayVisitMessage() {
    const visitMessageDiv = document.getElementById('visit-message');
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();
    
    if (!lastVisit) {
        // First visit
        visitMessageDiv.textContent = "🎉 Welcome! Let us know if you have any questions.";
    } else {
        // Calculate days between visits
        const daysBetween = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
        
        if (daysBetween < 1) {
            // Less than a day
            visitMessageDiv.textContent = "⚡ Back so soon! Awesome!";
        } else if (daysBetween === 1) {
            // Exactly 1 day
            visitMessageDiv.textContent = "👋 You last visited 1 day ago.";
        } else {
            // More than 1 day
            visitMessageDiv.textContent = `📅 You last visited ${daysBetween} days ago.`;
        }
    }
    
    localStorage.setItem('lastVisit', now);
}
function displayAttractions() {
    const grid = document.getElementById('attractions-grid');

    if (!grid) {
        console.error('Attractions grid element not found');
        return;
    }
    
    attractions.forEach((attraction, index) => {

        const card = document.createElement('article');
        card.className = 'attraction-card';
        
        card.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s both`;
        
        card.innerHTML = `
            <h2>${attraction.name}</h2>
            <figure>
                <img src="${attraction.image}" 
                     alt="${attraction.name} - Lima attraction" 
                     loading="lazy"
                     width="300"
                     height="200">
            </figure>
            <address>${attraction.address}</address>
            <p>${attraction.description}</p>
            <button class="learn-more" data-id="${attraction.id}">Learn More</button>
        `;
        
        grid.appendChild(card);
    });
    
    addButtonListeners();
}

function addButtonListeners() {
    const buttons = document.querySelectorAll('.learn-more');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const attractionId = e.target.getAttribute('data-id');
            handleLearnMore(attractionId);
        });
    });
}

function handleLearnMore(id) {
    const attraction = attractions.find(a => a.id == id);
    
    if (attraction) {
        alert(`Learn more about ${attraction.name}!\n\n${attraction.description}\n\nLocation: ${attraction.address}`);
    }
}

function updateFooter() {
    const yearSpan = document.getElementById('year');
    const lastModifiedSpan = document.getElementById('lastModified');
    
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }
}

function initializeMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('show');
            
            const isExpanded = nav.classList.contains('show');
            menuToggle.setAttribute('aria-expanded', isExpanded);
            
            menuToggle.textContent = isExpanded ? '✕' : '☰';
        });
        
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
                nav.classList.remove('show');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.textContent = '☰';
            }
        });
    }
}

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function addAnimationStyles() {
    if (!document.getElementById('discover-animations')) {
        const style = document.createElement('style');
        style.id = 'discover-animations';
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('Discover page loaded successfully');
    
    addAnimationStyles();
    displayVisitMessage();
    displayAttractions();
    updateFooter();
    initializeMenu();
    initializeSmoothScroll();
    
    console.log(`Loaded ${attractions.length} attractions`);
});