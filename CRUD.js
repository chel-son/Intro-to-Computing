document.addEventListener('DOMContentLoaded', function() {
    let next = document.querySelector('.next');
    let prev = document.querySelector('.prev');
    let deleteButton = document.querySelector('#delete-button');
    let editButton = document.querySelector('.icon-button.edit'); // Edit button

    next.addEventListener('click', function() {
        let items = document.querySelectorAll('.item');
        items[4].style.display = 'none'; // Hide the 4th slide before moving it
        document.querySelector('.slide').appendChild(items[0]);
        disableButtons();
        showHiddenSlides(); // Show the hidden slides when navigation occurs
    });

    prev.addEventListener('click', function() {
        let items = document.querySelectorAll('.item');
        items[4].style.display = 'none'; // Hide the 4th slide before moving it
        document.querySelector('.slide').prepend(items[items.length - 1]);
        disableButtons();
        showHiddenSlides(); // Show the hidden slides when navigation occurs
    });

    deleteButton.addEventListener('click', function() {
        let selectedSlide = document.querySelector('.slide .item.active');
        if (selectedSlide) {
            let slideName = selectedSlide.querySelector('.name').textContent;
            let slideDescription = selectedSlide.querySelector('.des').textContent;

            // Remove slide from DOM
            selectedSlide.remove();

            // Remove slide from localStorage
            let storedSlides = JSON.parse(localStorage.getItem("slides")) || [];
            storedSlides = storedSlides.filter(slide => !(slide.name === slideName && slide.description === slideDescription));
            localStorage.setItem("slides", JSON.stringify(storedSlides)); // Update localStorage

            // Log current localStorage state
            logLocalStorage();
            showHiddenSlides(); // Ensure visibility is updated
        } else {
            alert('No slide selected to delete.');
        }
    });

    editButton.addEventListener('click', function() {
        let selectedSlide = document.querySelector('.slide .item.active');
        if (selectedSlide) {
            let slideName = selectedSlide.querySelector('.name').textContent;
            let slideDescription = selectedSlide.querySelector('.des').textContent;
            let slideImage = selectedSlide.style.backgroundImage.slice(5, -2); // Remove url("")

            // Store the current slide data in localStorage for editing
            const slideData = { name: slideName, description: slideDescription, image: slideImage };
            localStorage.setItem("editSlide", JSON.stringify(slideData));
            window.location.href = "FORM.html";
        } else {
            alert('No slide selected to edit.');
        }
    });

    function disableButtons() {
        next.disabled = true;
        prev.disabled = true;
        setTimeout(() => {
            next.disabled = false;
            prev.disabled = false;
        }, 500);
    }

    // Function to show hidden slides
    function showHiddenSlides() {
        let items = document.querySelectorAll('.item');
        items.forEach((item, index) => {
            item.style.display = 'block'; // Show all slides initially
        });
        // Hide slides beyond the 4th
        for (let i = 4; i < items.length; i++) {
            items[i].style.display = 'none';
        }

        if (items.length > 4) {
            items[4].style.display = 'block'; // Show the hidden slide
        }
    }

    // Function to add a new slide dynamically
window.addNewSlide = function(name, description, image) {
    const slideContainer = document.querySelector('.slide'); // Where the slides are displayed
    const newSlide = document.createElement('div');
    newSlide.classList.add('item');
    newSlide.style.backgroundImage = `url(${image})`;
    newSlide.style.backgroundSize = 'cover'; // Ensure the background covers the whole slide
    newSlide.style.backgroundPosition = 'center'; // Center the background image
    newSlide.style.backgroundColor = '#000'; // Ensure solid background
    newSlide.style.opacity = 1; // Ensure full opacity

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content');

    const nameDiv = document.createElement('div');
    nameDiv.classList.add('name');
    nameDiv.textContent = name;

    const descDiv = document.createElement('div');
    descDiv.classList.add('des');
    descDiv.textContent = description;

    const button = document.createElement('button');
    button.textContent = 'See More';

    contentDiv.appendChild(nameDiv);
    contentDiv.appendChild(descDiv);
    contentDiv.appendChild(button);
    newSlide.appendChild(contentDiv);

    newSlide.addEventListener('click', function() {
        newSlide.classList.toggle('active'); // Toggle selection on click
    });

    newSlide.style.display = 'none'; // Initially hide new slides
    slideContainer.appendChild(newSlide); // Adds the new slide to the carousel

    // Log current localStorage state
    logLocalStorage();
};

    // Function to load slides from localStorage
    function loadSlides() {
        const storedSlides = JSON.parse(localStorage.getItem("slides")) || [];
        storedSlides.forEach((slideData, index) => {
            addNewSlide(slideData.name, slideData.description, slideData.image);
        });
        showHiddenSlides(); // Adjust visibility of all slides on load
    }

    // Log localStorage state
    function logLocalStorage() {
        console.log("Current localStorage state:", JSON.parse(localStorage.getItem("slides")));
    }

    // Load existing slides from localStorage
    loadSlides();

    // Load new slide data from localStorage and add it to the carousel
    const newSlideData = JSON.parse(localStorage.getItem("newSlide"));
    if (newSlideData) {
        let storedSlides = JSON.parse(localStorage.getItem("slides")) || [];
        storedSlides.push(newSlideData); // Add new slide to stored slides
        localStorage.setItem("slides", JSON.stringify(storedSlides)); // Update localStorage
        addNewSlide(newSlideData.name, newSlideData.description, newSlideData.image);
        localStorage.removeItem("newSlide"); // Clear data after use
        showHiddenSlides(); // Adjust visibility of all slides
    }
});
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
