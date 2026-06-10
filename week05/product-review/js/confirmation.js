/**
 * Confirmation Page Script (review.html)
 * - Displays submitted review data from URL parameters
 * - Manages localStorage counter for total reviews submitted
 * - Increments counter each time this page loads after form submission
 */

// localStorage key for tracking review count
const REVIEW_COUNT_KEY = 'productReviewTotalCount';

/**
 * Get and increment review counter in localStorage
 * Returns the new count after increment
 */
function incrementReviewCounter() {
    let currentCount = localStorage.getItem(REVIEW_COUNT_KEY);
    currentCount = currentCount ? parseInt(currentCount, 10) : 0;
    const newCount = currentCount + 1;
    localStorage.setItem(REVIEW_COUNT_KEY, newCount);
    return newCount;
}

/**
 * Get current review count from localStorage (without incrementing)
 */
function getCurrentReviewCount() {
    let count = localStorage.getItem(REVIEW_COUNT_KEY);
    return count ? parseInt(count, 10) : 0;
}

/**
 * Parse URL parameters into an object
 */
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const result = {};
    for (const [key, value] of params.entries()) {
        // Handle multiple values (checkboxes) - collect them
        if (key.startsWith('feature_')) {
            if (!result.features) result.features = [];
            result.features.push(value);
        } else {
            result[key] = value;
        }
    }
    return result;
}

/**
 * Format rating number to star display
 */
function formatRatingStars(rating) {
    const num = parseInt(rating, 10);
    if (isNaN(num)) return rating;
    const filled = '★'.repeat(num);
    const empty = '☆'.repeat(5 - num);
    return `${filled}${empty} (${num}/5)`;
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/**
 * Display the submitted review data on the confirmation page
 */
function displayReviewSummary() {
    const params = getUrlParams();
    const summaryContainer = document.getElementById('reviewSummary');
    
    if (!summaryContainer) return;

    // Check if form was actually submitted (has productName param)
    if (!params.productName || params.productName === "") {
        // No submission data - redirect back or show message
        summaryContainer.innerHTML = `
            <div class="summary-card" style="text-align: center;">
                <p>No review data found. Please submit a review from the <a href="form.html" class="back-link" style="display: inline-block; margin-top: 0;">form page</a>.</p>
            </div>
        `;
        return;
    }

    // Increment counter for successful review submission
    const newCount = incrementReviewCounter();
    
    // Format features list
    let featuresHtml = '<em>None selected</em>';
    if (params.features && params.features.length > 0) {
        featuresHtml = params.features.map(f => '✓ ' + escapeHtml(f)).join('<br>');
    }

    // Build the summary HTML
    summaryContainer.innerHTML = `
        <!-- Counter display -->
        <div class="counter-box">
            <span style="font-size: 1rem;">Total reviews submitted</span>
            <span class="counter-number">${newCount}</span>
            <span style="font-size: 0.85rem;">✨ Thank you for being reviewer #${newCount} ✨</span>
        </div>

        <!-- Review details card -->
        <div class="summary-card">
            <h3>📋 Your Review Details</h3>
            
            <div class="summary-item">
                <span class="summary-label">Product:</span>
                <span class="summary-value">${escapeHtml(params.productName) || '—'}</span>
            </div>
            
            <div class="summary-item">
                <span class="summary-label">Overall Rating:</span>
                <span class="summary-value">${formatRatingStars(params.overallRating || '—')}</span>
            </div>
            
            <div class="summary-item">
                <span class="summary-label">Installation Date:</span>
                <span class="summary-value">${escapeHtml(params.installDate) || '—'}</span>
            </div>
            
            <div class="summary-item">
                <span class="summary-label">Useful Features:</span>
                <span class="summary-value">${featuresHtml}</span>
            </div>
            
            <div class="summary-item">
                <span class="summary-label">Written Review:</span>
                <span class="summary-value">${escapeHtml(params.writtenReview) || '<em>No written review provided</em>'}</span>
            </div>
            
            <div class="summary-item">
                <span class="summary-label">Reviewer Name:</span>
                <span class="summary-value">${escapeHtml(params.userName) || '<em>Anonymous</em>'}</span>
            </div>
        </div>
        
        <div style="text-align: center; margin-top: 1.5rem;">
            <a href="form.html" class="back-link">← Write another review</a>
        </div>
    `;
}

// Initialize confirmation page when DOM is ready
document.addEventListener('DOMContentLoaded', displayReviewSummary);