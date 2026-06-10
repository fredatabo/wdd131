/**
 * Product Review Form - Dynamic functionality
 * Enhances existing static form elements
 */

// Product data array (provided in assignment) - can be used to update if needed
const products = [
    { id: "prd_101", name: "EcoSmart Bluetooth Speaker" },
    { id: "prd_102", name: "FlexStand Ergonomic Laptop Stand" },
    { id: "prd_103", name: "AquaPure Water Filter Pitcher" },
    { id: "prd_104", name: "Lumina LED Desk Lamp (Wireless Charging)" },
    { id: "prd_105", name: "SmartFit Fitness Tracker 2.0" }
];

/**
 * Update the star emoji display to show proper stars based on rating
 */
function updateStarDisplay() {
    const radioButtons = document.querySelectorAll('input[name="overallRating"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            const value = parseInt(this.value, 10);
            // Update all star displays to match the selected rating
            radioButtons.forEach((r, idx) => {
                const ratingValue = idx + 1;
                const label = r.nextElementSibling;
                if (label && label.querySelector('.star-emoji')) {
                    const filledStars = '★'.repeat(ratingValue);
                    const emptyStars = '☆'.repeat(5 - ratingValue);
                    label.querySelector('.star-emoji').textContent = ratingValue <= value ? filledStars + emptyStars : '☆☆☆☆☆';
                }
            });
        });
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
 * Optional: Sync select options with the products array if needed
 * (Static HTML already has options, but this ensures consistency)
 */
function syncProductOptions() {
    const productSelect = document.getElementById('productSelect');
    if (!productSelect) return;
    
    // Check if we need to update (optional - keeps static options but ensures data matches)
    const currentOptions = Array.from(productSelect.options).slice(1).map(opt => opt.value);
    const productNames = products.map(p => p.name);
    
    // Only update if there's a mismatch
    if (JSON.stringify(currentOptions) !== JSON.stringify(productNames)) {
        // Clear existing options except the placeholder
        while (productSelect.options.length > 1) {
            productSelect.remove(1);
        }
        // Add updated options
        products.forEach(product => {
            const option = document.createElement('option');
            option.value = product.name;
            option.textContent = product.name;
            productSelect.appendChild(option);
        });
    }
}

/**
 * Initialize all form enhancements when DOM is ready
 */
function initForm() {
    setDateRestrictions();
    updateStarDisplay();
    syncProductOptions(); // Optional: ensures product list matches array
}

// Start everything when page loads
document.addEventListener('DOMContentLoaded', initForm);