/*Sidebar*/
const toggleButton = document.getElementById('toggle-btn')
const sidebar = document.getElementById('sidebar')

function toggleSidebar(){
sidebar.classList.toggle('close')
toggleButton.classList.toggle('rotate')

closeAllSubMenus()
}

function toggleSubMenu(button){

if(!button.nextElementSibling.classList.contains('show')){
  closeAllSubMenus()
}

button.nextElementSibling.classList.toggle('show')
button.classList.toggle('rotate')

if(sidebar.classList.contains('close')){
  sidebar.classList.toggle('close')
  toggleButton.classList.toggle('rotate')
}
}

function closeAllSubMenus(){
Array.from(sidebar.getElementsByClassName('show')).forEach(ul => {
  ul.classList.remove('show')
  ul.previousElementSibling.classList.remove('rotate')
})
}

document.querySelectorAll('.about__btn').forEach(btn => {
  btn.addEventListener('click', event => {
    event.preventDefault(); // Prevent default link behavior

    const readMoreBtn = event.target;
    const aboutContent = readMoreBtn.closest('.about__content');
    const readMoreText = aboutContent.querySelector('.read-more-text');

    if (readMoreBtn && readMoreText) {
      readMoreText.classList.toggle('read-more-text--show');
      readMoreBtn.textContent = readMoreBtn.textContent.includes('Read More')
        ? "Read Less..." : "Read More...";
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const subMenu = document.querySelector('.sub-menu div');

  function addSubMenuItem(name, url) {
      const newListItem = document.createElement('li');
      const newLink = document.createElement('a');
      newLink.href = url;
      newLink.textContent = name;
      newListItem.appendChild(newLink);
      subMenu.appendChild(newListItem);
  }

  function loadSidebarItems() {
      const keys = Object.keys(localStorage).filter(key => key.startsWith('threadAdd'));
      keys.sort((a, b) => a.localeCompare(b)); // Sort keys to ensure the correct order

      keys.forEach(key => {
          const item = JSON.parse(localStorage.getItem(key));
          if (item && item.name) {
              const url = `thread-add${key.replace('threadAdd', '')}.html`;
              addSubMenuItem(item.name, url);
          }
      });
  }

  loadSidebarItems();
});

//pre-loader

var loader = document.getElementById("pre-loader");
window.addEventListener("load", function() {
setTimeout(function() {
loader.style.display = "none";
}, 1500);
});

//comments
let currentIndex = 0;
const cardsToShow = 3;

function showSlide(index) {
    const slider = document.querySelector('.slider');
    const totalCards = document.querySelectorAll('.card').length;

    if (index >= totalCards - cardsToShow + 1) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalCards - cardsToShow;
    } else {
        currentIndex = index;
    }

    slider.style.transform = `translateX(-${currentIndex * (100 / cardsToShow)}%)`;
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

function addComment() {
    const backgroundInput = document.getElementById('backgroundInput');
    const userLocationInput = document.getElementById('userLocationInput');
    const commentInput = document.getElementById('commentInput');
    const userLocation = userLocationInput.value.trim();
    const commentText = commentInput.value.trim();

    if (backgroundInput.files && backgroundInput.files[0] && userLocation && commentText) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const newComment = {
                background: e.target.result,
                location: userLocation,
                text: commentText,
                timestamp: Date.now()
            };

            // Save comment to local storage
            let comments = JSON.parse(localStorage.getItem('comments')) || [];
            comments.push(newComment);
            localStorage.setItem('comments', JSON.stringify(comments));

            // Create and append new slide
            createSlide(newComment);

            backgroundInput.value = '';
            userLocationInput.value = '';
            commentInput.value = '';
            showSlide(currentIndex); // Refresh the slider to show the new slide
        };
        reader.readAsDataURL(backgroundInput.files[0]);
    }
}

function createSlide(comment) {
    const slider = document.querySelector('.slider');
    const newCard = document.createElement('div');
    newCard.classList.add('card');

    newCard.innerHTML = `
        <div class="background-container">
            <img src="${comment.background}" alt="Background" class="background-img">
            <img src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" alt="Avatar" class="card-img">
        </div>
        <h2>New Comment</h2>
        <p class="user-location"> ${comment.location}</p>
        <p class="comment-text">${comment.text}</p>
        <div class="action-buttons">
            <button class="edit-comment-btn" onclick="editComment(${comment.timestamp})">Edit</button>
            <button class="delete-comment-btn" onclick="deleteComment(${comment.timestamp})">Delete</button>
        </div>
    `;

    slider.appendChild(newCard);
}

function editComment(timestamp) {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    const comment = comments.find(c => c.timestamp === timestamp);

    if (comment) {
        const backgroundInput = document.getElementById('backgroundInput');
        const userLocationInput = document.getElementById('userLocationInput');
        const commentInput = document.getElementById('commentInput');
        backgroundInput.dataset.timestamp = timestamp; // Store the timestamp in the input data attribute
        userLocationInput.value = comment.location;
        commentInput.value = comment.text;
    }
}

function saveEditComment() {
    const backgroundInput = document.getElementById('backgroundInput');
    const userLocationInput = document.getElementById('userLocationInput');
    const commentInput = document.getElementById('commentInput');
    const commentText = commentInput.value.trim();
    const userLocation = userLocationInput.value.trim();
    const timestamp = backgroundInput.dataset.timestamp;

    if (userLocation && commentText && timestamp) {
        let comments = JSON.parse(localStorage.getItem('comments')) || [];
        const commentIndex = comments.findIndex(c => c.timestamp == timestamp);

        if (commentIndex !== -1) {
            if (backgroundInput.files && backgroundInput.files[0]) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    comments[commentIndex].background = e.target.result;
                    comments[commentIndex].location = userLocation;
                    comments[commentIndex].text = commentText;
                    localStorage.setItem('comments', JSON.stringify(comments)); // Save updated comments to local storage
                    loadComments(); // Refresh the slider
                };
                reader.readAsDataURL(backgroundInput.files[0]);
            } else {
                comments[commentIndex].location = userLocation;
                comments[commentIndex].text = commentText;
                localStorage.setItem('comments', JSON.stringify(comments)); // Save updated comments to local storage
                loadComments(); // Refresh the slider
            }
        }

        backgroundInput.value = '';
        userLocationInput.value = '';
        commentInput.value = '';
        delete backgroundInput.dataset.timestamp; // Clear the data attribute
    }
}

function deleteComment(timestamp) {
    // Remove comment from local storage
    let comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments = comments.filter(comment => comment.timestamp !== timestamp);
    localStorage.setItem('comments', JSON.stringify(comments));

    // Refresh the slider
    loadComments();
}

function loadComments() {
    const slider = document.querySelector('.slider');
    slider.innerHTML = ''; // Clear existing slides
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.forEach(createSlide);
}

document.querySelector('.next').addEventListener('click', nextSlide);
document.querySelector('.prev').addEventListener('click', prevSlide);

window.addEventListener('load', loadComments);

// Adjust the textarea size dynamically based on input
const commentInput = document.getElementById('commentInput');
commentInput.addEventListener('input', function () {
    this.style.height = 'auto'; // Reset the height
    this.style.height = (this.scrollHeight) + 'px'; // Adjust the height to fit content
});
