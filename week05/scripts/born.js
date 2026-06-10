// Step 1: Declare three variables that hold references to the input, button, and list elements
const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list'); // Reference to the unordered list element

// Function to add a new chapter
function addChapter() {
  // Get the trimmed value from the input field
  const chapterText = input.value.trim();
  
  // Check if the input is empty
  if (chapterText === '') {
    input.focus();
    return;
  }

  // Step 2: Create a li element that will hold each entry's chapter title and delete button
  const li = document.createElement('li');
  
  // Step 3: Populate the li element's textContent with the input value
  li.textContent = chapterText;
  
  // Step 4: Create a delete button
  const deleteButton = document.createElement('button');
  
  // Step 5: Set the delete button's textContent to ❌
  deleteButton.textContent = '❌';
  
  // Step 6: Add aria-label for accessibility (screen readers)
  deleteButton.setAttribute('aria-label', `Remove ${chapterText}`);
  
  // Add a class for styling (optional)
  deleteButton.classList.add('delete');
  
  // Step 7: Append the delete button to the li element
  li.appendChild(deleteButton);
  
  // Step 8: Append the li element to the unordered list in your HTML
  list.appendChild(li);
  
  // Clear the input field and set focus back to it
  input.value = '';
  input.focus();
  
  // Step 9: Add event listener to delete button to remove the chapter
  deleteButton.addEventListener('click', function() {
    list.removeChild(li);
    input.focus();
  });
}

// Add event listener to the button for click events
button.addEventListener('click', addChapter);

// Allow pressing Enter key in the input field to add a chapter
input.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    addChapter();
  }
});