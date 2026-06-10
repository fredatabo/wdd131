/**
 * Product Review Form - Dynamic functionality
 * Populates product select, rating stars, and feature checkboxes
 */

// Product data array (provided in assignment)
const products = [
    { id: "prd_101", name: "EcoSmart Bluetooth Speaker" },
    { id: "prd_102", name: "FlexStand Ergonomic Laptop Stand" },
    { id: "prd_103", name: "AquaPure Water Filter Pitcher" },
    { id: "prd_104", name: "Lumina LED Desk Lamp (Wireless Charging)" },
    { id: "prd_105", name: "SmartFit Fitness Tracker 2.0" }
];

// Useful features list for checkboxes
const usefulFeaturesList = [
    { id: "feature_easy", name: "Easy to install", value: "Easy installation" },
    { id: "feature_performance", name: "Great performance", value: "Great performance" },
    { id: "feature_battery", name: "Long battery life", value: "Long battery life" },
    { id: "feature_design", name: "Sleek design", value: "Sleek design" },
    { id: "feature_value", name: "Good value for money", value: "Good value" }
];

/**
 * Populate product select dropdown
 * - First option is disabled instructional placeholder
 * - Each option value = product name (per spec)
 */
function populateProductSelect() {
    const productSelect = document.getElementById('productSelect');
    if (!productSelect) return;

    // Create placeholder option (disabled, selected by default)
    const placeholderOption = document.createElement('option');
    placeholderOption.value = "";
    placeholderOption.textContent = "Select a Product ...";
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    productSelect.appendChild(placeholderOption);

    // Populate products from array
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.name;  // Value attribute = product name
        option.textContent = product.name;
        productSelect.appendChild(option);
    });
}

/**
 * Create rating stars (radio buttons 1-5)
 * All radio buttons share the same name attribute for proper grouping
 */
function createRatingStars() {
    const ratingContainer = document.getElementById('ratingStarsContainer');
    if (!ratingContainer) return;

    for (let i = 1; i <= 5; i++) {
        const starWrapper = document.createElement('div');
        starWrapper.className = 'star-option';

        const radioId = `rating_${i}`;
        const radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.name = 'overallRating';  // Same name for all = proper radio group
        radioInput.value = i;
        radioInput.id = radioId;
        radioInput.required = true;

        const starLabel = document.createElement('label');
        starLabel.htmlFor = radioId;
        const filledStars = '★'.repeat(i);
        const emptyStars = '☆'.repeat(5 - i);
        starLabel.innerHTML = `<span class="star-emoji">${filledStars}${emptyStars}</span> <span>${i}</span>`;

        starWrapper.appendChild(radioInput);
        starWrapper.appendChild(starLabel);
        ratingContainer.appendChild(starWrapper);
    }
}

/**
 * Create useful features checkboxes dynamically
 */
function createFeatureCheckboxes() {
    const featuresContainer = document.getElementById('featuresGroup');
    if (!featuresContainer) return;

    usefulFeaturesList.forEach(feature => {
        const div = document.createElement('div');
        div.className = 'checkbox-item';

        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.id = feature.id;
        cb.name = `feature_${feature.id}`;
        cb.value = feature.value;

        const label = document.createElement('label');
        label.htmlFor = feature.id;
        label.textContent = feature.name;

        div.appendChild(cb);
        div.appendChild(label);
        featuresContainer.appendChild(div);
    });
}

/**
 * Set max date for installation date picker to today
 */
function setDateRestrictions() {
    const dateInput = document.getElementById('installDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.max = today;
    }
}

/**
 * Initialize all form components when DOM is ready
 */
function initForm() {
    populateProductSelect();
    createRatingStars();
    createFeatureCheckboxes();
    setDateRestrictions();
}

// Start everything when page loads
document.addEventListener('DOMContentLoaded', initForm);