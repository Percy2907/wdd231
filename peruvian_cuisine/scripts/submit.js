import { initCommonElements } from './utils.js';

// Initialize form submission page
document.addEventListener('DOMContentLoaded', () => {
    initCommonElements();
    
    const form = document.getElementById('recipeForm');
    const timestampField = document.getElementById('timestamp');
    
    if (form && timestampField) {
        // Event Handling: Add timestamp when form is submitted
        form.addEventListener('submit', (e) => {
            const now = new Date();
            timestampField.value = now.toISOString();
        });
    }
    
    // Add input validation feedback (DOM Manipulation)
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    // Event Handling and DOM Manipulation for visual validation feedback
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (!input.validity.valid) {
                input.style.borderColor = '#d90429'; // Red for invalid
            } else {
                input.style.borderColor = '#28a745'; // Green for valid
            }
        });
        
        input.addEventListener('focus', () => {
            input.style.borderColor = '#d90429'; // Reset border on focus
        });
    });
});