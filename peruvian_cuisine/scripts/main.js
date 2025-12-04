import { initCommonElements, renderRecipeCard, renderModalContent } from './utils.js';
import { getFavorites, toggleFavorite, isFavorite } from './storage.js';

const FEATURED_COUNT = 3;

// Asynchronous function to fetch data from local JSON (Required for video demo)
async function getRecipes() {
    try {
        // Fetch API usage
        const response = await fetch('data/recipes.json'); 
        
        if (!response.ok) {
            // try...catch for robust asynchronous error handling
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Handles the response (JSON parsing)
        return await response.json(); 
    } catch (error) {
        console.error("Error fetching recipes:", error);
        // Error handling for display
        throw error;
    }
}

async function loadFeaturedRecipes() {
    const container = document.getElementById('featuredRecipes');
    if (!container) return;

    try {
        let recipes = await getRecipes();
        
        // Array Method: Randomly sort recipes for featured section
        recipes.sort(() => Math.random() - 0.5);
        
        const randomFeatured = recipes.slice(0, FEATURED_COUNT);
        
        // Dynamic Content Generation
        container.innerHTML = randomFeatured.map(recipe => {
            const isFav = isFavorite(recipe.id);
            return renderRecipeCard(recipe, isFav); 
        }).join('');

        attachCardEvents(container, recipes); 

    } catch (error) {
        container.innerHTML = '<p class="text-center">Sorry, we could not load the featured recipes at this time. Please try again later.</p>';
    }
}

function attachCardEvents(container, recipes) {
    // DOM Manipulation and Event Handling for modal
    container.querySelectorAll('.recipe-card').forEach(card => {
        card.addEventListener('click', (event) => {
            if (event.target.classList.contains('favorite-btn')) return; 

            const recipeId = card.dataset.id;
            // Array Method: find()
            const recipe = recipes.find(r => r.id === recipeId);
            if (recipe) {
                openRecipeModal(recipe);
            }
        });
    });

    // Event Handling for favorites button
    container.querySelectorAll('.favorite-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            const recipeId = button.dataset.id;
            const isFavorited = toggleFavorite(recipeId);
            
            button.classList.toggle('favorited', isFavorited);
            // DOM Manipulation: Change icon text
            button.textContent = isFavorited ? '♥' : '♡';
        });
    });
}

// Modal Dialog Implementation
function openRecipeModal(recipe) {
    const modal = document.getElementById('recipeModal');
    const modalBody = modal.querySelector('.modal-body');
    const modalClose = document.getElementById('modalClose');

    modalBody.innerHTML = renderModalContent(recipe);
    modal.classList.add('active');
    
    // Event Handling
    modalClose.onclick = () => {
        modal.classList.remove('active');
    };

    modal.onclick = (event) => {
        if (event.target === modal) {
            modal.classList.remove('active');
        }
    };
}


document.addEventListener('DOMContentLoaded', () => {
    initCommonElements(); 
    loadFeaturedRecipes();
});