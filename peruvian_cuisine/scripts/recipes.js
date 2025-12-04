import { initCommonElements, renderRecipeCard, renderModalContent } from './utils.js';
import { getFavorites, toggleFavorite, isFavorite } from './storage.js';

let allRecipes = []; 
let currentRecipes = [];
let showFavoritesOnly = false;

// DOM Element Selections
const recipesGrid = document.getElementById('recipesGrid');
const searchInput = document.getElementById('search');
const regionSelect = document.getElementById('region');
const cuisineTypeSelect = document.getElementById('cuisineType');
const favoritesToggleBtn = document.getElementById('favoritesToggle');
const recipeCountElement = document.getElementById('recipeCount');


// Asynchronous function to fetch data
async function getRecipes() {
    try {
        // Fetch API usage
        const response = await fetch('data/recipes.json'); 
        
        if (!response.ok) {
            // try...catch for robust asynchronous error handling
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json(); 
    } catch (error) {
        console.error("Error fetching recipes:", error);
        throw error;
    }
}

function renderRecipes() {
    let filteredRecipes = [...allRecipes];
    const searchTerm = searchInput.value.toLowerCase();
    const region = regionSelect.value;
    const type = cuisineTypeSelect.value;

    // Array Method: FILTER to apply all current filters
    filteredRecipes = filteredRecipes.filter(recipe => {
        const matchesSearch = !searchTerm || 
            recipe.name.toLowerCase().includes(searchTerm) || 
            recipe.description.toLowerCase().includes(searchTerm) ||
            (recipe.ingredients && recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm)));
        
        const matchesRegion = region === 'all' || recipe.region === region;
        const matchesType = type === 'all' || recipe.type === type;
        const isFavoriteMatch = !showFavoritesOnly || isFavorite(recipe.id);

        return matchesSearch && matchesRegion && matchesType && isFavoriteMatch;
    });

    currentRecipes = filteredRecipes;
    
    // Dynamic Content Generation using Array Method: map()
    if (recipesGrid) {
        recipesGrid.innerHTML = currentRecipes.map(recipe => {
            const isFav = isFavorite(recipe.id);
            return renderRecipeCard(recipe, isFav); 
        }).join('');
    }

    // DOM Manipulation: Updates the recipe count display
    if (recipeCountElement) {
        recipeCountElement.textContent = `Showing ${currentRecipes.length} of ${allRecipes.length} recipes`;
    }

    attachCardEvents(recipesGrid);
}

function attachCardEvents(container) {
    // Re-attach event listeners for dynamic content
    container.querySelectorAll('.recipe-card').forEach(card => {
        card.addEventListener('click', (event) => {
            if (event.target.classList.contains('favorite-btn')) return; 
            const recipeId = card.dataset.id;
            const recipe = allRecipes.find(r => r.id === recipeId);
            if (recipe) {
                openRecipeModal(recipe);
            }
        });
    });

    container.querySelectorAll('.favorite-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            const recipeId = button.dataset.id;
            toggleFavorite(recipeId);
            // Re-render to update the display if 'Show Favorites Only' is active
            renderRecipes(); 
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
    
    modalClose.onclick = () => { modal.classList.remove('active'); };
    modal.onclick = (event) => {
        if (event.target === modal) { modal.classList.remove('active'); }
    };
}


async function initRecipesPage() {
    try {
        allRecipes = await getRecipes(); 
        
        renderRecipes();

        // Event Handling for filter changes
        searchInput.addEventListener('input', renderRecipes);
        regionSelect.addEventListener('change', renderRecipes);
        cuisineTypeSelect.addEventListener('change', renderRecipes);
        
        // Event Handling for the favorites toggle button
        favoritesToggleBtn.addEventListener('click', () => {
            showFavoritesOnly = !showFavoritesOnly;
            favoritesToggleBtn.classList.toggle('active-filter', showFavoritesOnly);
            favoritesToggleBtn.textContent = showFavoritesOnly ? 'Showing Favorites (Click to Show All)' : 'Show My Favorites';
            renderRecipes();
        });

    } catch (error) {
        if (recipesGrid) recipesGrid.innerHTML = '<p class="text-center">Error loading recipes. Please try again later.</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initCommonElements(); 
    initRecipesPage();
});