function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        // DOM Manipulation and Event Handling for the hamburger menu
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            const isExpanded = navLinks.classList.contains('active');
            hamburger.setAttribute('aria-expanded', isExpanded);
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }
}

function updateLastModified() {
    const lastModifiedElement = document.getElementById('lastModified');
    if (lastModifiedElement) {
        // Maintains the last updated date and time
        lastModifiedElement.textContent = `${new Date().toLocaleString()}`;
    }
}

function initVideoLink() {
    const videoLink = document.getElementById('videoLink');
    //Video URL
    const videoURL = "https://youtu.be/HGuHa_9ArM4"; 
    
    if (videoLink) {
        videoLink.href = videoURL;
        videoLink.target = "_blank";
    }
}

function initLazyLoading() {
    // Native lazy loading is applied in the HTML using loading="lazy".
}

// EXPORT: Initializes common elements on every page
export function initCommonElements() {
    initHamburgerMenu();
    updateLastModified();
    initLazyLoading();
    initVideoLink();
}

// EXPORT: Renders the recipe card
export function renderRecipeCard(recipe, isFav) {
    const heartClass = isFav ? 'favorited' : '';
    const heartIcon = isFav ? '♥' : '♡'; 

    // Template Literals used to generate dynamic HTML content
    // Displays at least four distinct data properties/values (Name, Region, Type, Prep Time, Difficulty)
    return `
        <div class="recipe-card" data-id="${recipe.id}">
            <img src="${recipe.imageUrl}" alt="${recipe.name}" loading="lazy">
            <button class="favorite-btn ${heartClass}" data-id="${recipe.id}" aria-label="Toggle favorite status">${heartIcon}</button>
            <div class="recipe-info">
                <h3>${recipe.name}</h3>
                <p class="recipe-description">${recipe.description.substring(0, 80)}...</p>
                <div class="recipe-meta">
                    <span><strong>Region:</strong> ${recipe.region}</span>
                    <span><strong>Type:</strong> ${recipe.type}</span>
                    <span><strong>Prep:</strong> ${recipe.prepTime} min</span>
                    <span><strong>Diff:</strong> ${recipe.difficulty}</span>
                </div>
            </div>
        </div>
    `;
}

// EXPORT: Renders the modal content
export function renderModalContent(recipe) {
    // Array Method: map() used to generate the ingredients list dynamically
    const ingredientsListHTML = recipe.ingredients.map(ingredient => 
        `<li>${ingredient}</li>`
    ).join('');
    
    // Array Method: split() and map() used to format instructions (optional: filter() to remove empty steps)
    const instructionsSteps = recipe.instructions.split('.').filter(step => step.trim() !== '');
    const instructionsListHTML = instructionsSteps.map(step => 
        `<li>${step.trim()}.</li>`
    ).join('');

    return `
        <img src="${recipe.imageUrl}" alt="${recipe.name}">
        <h2>${recipe.name}</h2>
        <p>${recipe.description}</p>
        
        <div class="modal-meta">
            <div class="modal-meta-item">
                <strong>Region</strong>
                <span>${recipe.region}</span>
            </div>
            <div class="modal-meta-item">
                <strong>Type</strong>
                <span>${recipe.type}</span>
            </div>
            <div class="modal-meta-item">
                <strong>Difficulty</strong>
                <span>${recipe.difficulty}</span>
            </div>
            <div class="modal-meta-item">
                <strong>Prep Time</strong>
                <span>${recipe.prepTime} min</span>
            </div>
            <div class="modal-meta-item">
                <strong>Cook Time</strong>
                <span>${recipe.cookTime} min</span>
            </div>
            <div class="modal-meta-item">
                <strong>Servings</strong>
                <span>${recipe.servings}</span>
            </div>
        </div>
        
        <h3>Ingredients</h3>
        <ul>
            ${ingredientsListHTML}
        </ul>

        <h3>Instructions</h3>
        <ol>
            ${instructionsListHTML}
        </ol>
    `;
}