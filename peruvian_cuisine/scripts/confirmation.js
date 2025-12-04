import { initCommonElements } from './utils.js';

function displayFormData() {
    const submissionDetails = document.getElementById('submissionDetails');
    
    // Use of URLSearchParams (Required for Form Action Page)
    const params = new URLSearchParams(window.location.search);
    
    if (!submissionDetails) return;

    let detailsHTML = '';

    // Array of fields to display, using friendly labels
    const fields = [
        { name: 'timestamp', label: 'Submission Time' },
        { name: 'recipeName', label: 'Recipe Name' },
        { name: 'region', label: 'Region' },
        { name: 'type', label: 'Type' },
        { name: 'prepTime', label: 'Prep Time (min)' },
        { name: 'cookTime', label: 'Cook Time (min)' },
        { name: 'submitterName', label: 'Your Name' },
        { name: 'email', label: 'Your Email' },
        { name: 'ingredients', label: 'Key Ingredients' },
        { name: 'instructions', label: 'Instructions' }
    ];

    // Array Method: forEach to iterate and display parameters
    fields.forEach(field => {
        const value = params.get(field.name);
        if (value && field.name !== 'formId') {
            // Use of Template Literals for dynamic HTML structure
            detailsHTML += `
                <div class="detail-item">
                    <strong>${field.label}:</strong>
                    <span>${value}</span>
                </div>
            `;
        }
    });

    if (detailsHTML) {
        submissionDetails.innerHTML = detailsHTML;
    } else {
        submissionDetails.innerHTML = '<p>No submission details were found. Ensure the form method is GET and was submitted correctly.</p>';
    }
}


document.addEventListener('DOMContentLoaded', () => {
    initCommonElements(); 
    displayFormData();
});