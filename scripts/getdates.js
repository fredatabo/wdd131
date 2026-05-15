// getdates.js - Dynamic date functionality for WDD 131 landing page
// This script populates current year and last modified date

// Wait for DOM to be fully loaded (defer ensures this runs after HTML parsing)
// Using defer attribute, script will execute after document parsing but before DOMContentLoaded.

// 1. Set the current copyright year dynamically
const currentYearSpan = document.getElementById('currentyear');
if (currentYearSpan) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    currentYearSpan.textContent = currentYear;
}

// 2. Set the document last modified date dynamically
const lastModifiedParagraph = document.getElementById('lastModified');
if (lastModifiedParagraph) {
    // document.lastModified returns a string with last modified date/time in local format
    const lastModifiedString = document.lastModified;
    lastModifiedParagraph.textContent = `Last modification: ${lastModifiedString}`;
}

// Optional console log for debugging purposes (not required but useful)
console.log(`Dynamic script loaded: Copyright year = ${new Date().getFullYear()}`);
console.log(`Document last modified: ${document.lastModified}`);