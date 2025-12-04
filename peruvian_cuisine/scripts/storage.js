const FAVORITES_KEY = 'peruvian_cuisine_favorites';

// EXPORT: Retrieves favorites from Local Storage
export function getFavorites() {
    try {
        const storedFavorites = localStorage.getItem(FAVORITES_KEY);
        // Local Storage Implementation
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (e) {
        console.error("Error loading favorites from Local Storage:", e);
        return [];
    }
}

function saveFavorites(favorites) {
    try {
        // Local Storage Implementation
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (e) {
        console.error("Error saving favorites to Local Storage:", e);
    }
}

// EXPORT: Toggles the favorite status of a recipe
export function toggleFavorite(recipeId) {
    let favorites = getFavorites();
    const index = favorites.indexOf(recipeId);

    if (index > -1) {
        // Array Method: splice() to remove
        favorites.splice(index, 1);
        saveFavorites(favorites);
        return false;
    } else {
        // Array Method: push() to add
        favorites.push(recipeId);
        saveFavorites(favorites);
        return true;
    }
}

// EXPORT: Checks if a recipe is a favorite
export function isFavorite(recipeId) {
    const favorites = getFavorites();
    // Array Method: includes()
    return favorites.includes(recipeId);
}