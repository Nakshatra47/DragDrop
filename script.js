// Select all draggable items
const items = document.querySelectorAll('.item');

// Select the dropzone
const dropzone = document.querySelector('.dropzone');

// Variable to store the dragged item
let draggedItem = null;

// Add event listeners to draggable items
items.forEach(item => {
  item.addEventListener('dragstart', dragStart);
  item.addEventListener('dragend', dragEnd);
});

// Add event listeners to the dropzone
dropzone.addEventListener('dragover', dragOver);
dropzone.addEventListener('dragenter', dragEnter);
dropzone.addEventListener('dragleave', dragLeave);
dropzone.addEventListener('drop', dragDrop);

// Function called when a draggable item starts being dragged
function dragStart(e) {
  draggedItem = this;
  e.dataTransfer.setData('text/plain', this.innerHTML);
  setTimeout(() => (this.style.display = 'none'), 0);
}

// Function called when the dragging of an item ends
function dragEnd() {
  draggedItem.style.display = 'inline-block';
  draggedItem = null;
}

// Function called when an item is dragged over the dropzone
function dragOver(e) {
  e.preventDefault();
}

// Function called when an item enters the dropzone
function dragEnter(e) {
  e.preventDefault();
  this.style.borderStyle = 'solid';
}

// Function called when an item leaves the dropzone
function dragLeave() {
  this.style.borderStyle = 'dashed';
}

// Function called when an item is dropped onto the dropzone
function dragDrop(e) {
  e.preventDefault();

  // Get the content of the dropped item
  const droppedItemContent = e.dataTransfer.getData('text/plain');

  // Create a new item in the dropzone with the dropped item's content
  const newDropzoneItem = document.createElement('div');
  newDropzoneItem.classList.add('item');
  newDropzoneItem.innerHTML = droppedItemContent;
  this.appendChild(newDropzoneItem);

  // Reset the dropzone's appearance
  this.style.borderStyle = 'dashed';
  this.classList.remove('empty');

  // Show a message indicating the item was dropped successfully
  showMessage('Item dropped successfully!');

  // Remove the dropped item from the first container
  removeItemFromFirstContainer(droppedItemContent);
}

// Function to remove the dropped item from the first container
function removeItemFromFirstContainer(itemContent) {
  items.forEach(item => {
    if (item.innerHTML === itemContent) {
      item.parentNode.removeChild(item);
    }
  });
}

// Function to show a message in the message box
function showMessage(message) {
  const messageBox = document.querySelector('.message-box');
  messageBox.textContent = message;
  messageBox.style.opacity = 1;

  setTimeout(() => {
    messageBox.style.opacity = 0;
  }, 2000);
}

// Function to reset the containers and items to their initial state
function reset() {
  const firstContainer = document.querySelector('.container:first-child');
  const secondContainer = document.querySelector('.container:last-child .dropzone');

  // Clear the dropzone
  secondContainer.innerHTML = '';
  secondContainer.classList.add('empty');

  // Reset the display of the draggable items
  items.forEach(item => {
    item.style.display = 'inline-block';
    firstContainer.appendChild(item);
  });
}
