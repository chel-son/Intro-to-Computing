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

/*
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Edit Slide</title>
</head>
<body>
  <form id="experienceForm">
    <input type="text" id="name" placeholder="Name">
    <input type="text" id="description" placeholder="Description">
    <input type="text" id="foodName" placeholder="Food Name">
    <input type="text" id="foodDescription" placeholder="Food Description">
    <input type="text" id="cultureName" placeholder="Culture Name">
    <input type="text" id="cultureDescription" placeholder="Culture Description">
    <input type="text" id="attractionName" placeholder="Attraction Name">
    <input type="text" id="attractionDescription" placeholder="Attraction Description">
    <input type="file" id="image">
    <input type="file" id="foodImage">
    <input type="file" id="cultureImage">
    <input type="file" id="attractionImage">
    <button id="submitExperience">Submit</button>
  </form>

  <script>
    // Check if editing a slide
    const editSlideData = JSON.parse(localStorage.getItem("editSlide"));
    if (editSlideData) {
      document.getElementById("name").value = editSlideData.name;
      document.getElementById("description").value = editSlideData.description;
      document.getElementById("foodName").value = editSlideData.foodName || '';
      document.getElementById("foodDescription").value = editSlideData.foodDescription || '';
      document.getElementById("cultureName").value = editSlideData.cultureName || '';
      document.getElementById("cultureDescription").value = editSlideData.cultureDescription || '';
      document.getElementById("attractionName").value = editSlideData.attractionName || '';
      document.getElementById("attractionDescription").value = editSlideData.attractionDescription || '';
    }

    document.getElementById("submitExperience").addEventListener("click", async function(event) {
      event.preventDefault(); // Prevent default form submission

      const name = document.getElementById("name").value;
      const description = document.getElementById("description").value;
      const foodName = document.getElementById("foodName").value;
      const foodDescription = document.getElementById("foodDescription").value;
      const cultureName = document.getElementById("cultureName").value;
      const cultureDescription = document.getElementById("cultureDescription").value;
      const attractionName = document.getElementById("attractionName").value;
      const attractionDescription = document.getElementById("attractionDescription").value;
      const imageInput = document.getElementById("image");
      const foodImageInput = document.getElementById("foodImage");
      const cultureImageInput = document.getElementById("cultureImage");
      const attractionImageInput = document.getElementById("attractionImage");

      // Validate form inputs
      if (!validateForm()) return;

      let storedSlides = JSON.parse(localStorage.getItem("slides")) || [];

      // Find the slide to edit using its unique ID
      const index = storedSlides.findIndex(slide => slide.id === editSlideData.id);
      if (index === -1) {
        alert("Slide not found for editing.");
        return;
      }

      const reader = new FileReader();
      reader.onload = async function(event) {
        const image = await compressImage(event.target.result);
        const imageId = await saveImageToIndexedDB(image);
        const foodReader = new FileReader();
        foodReader.onload = async function(foodEvent) {
          const foodImage = await compressImage(foodEvent.target.result);
          const foodImageId = await saveImageToIndexedDB(foodImage);

          const cultureReader = new FileReader();
          cultureReader.onload = async function(cultureEvent) {
            const cultureImage = await compressImage(cultureEvent.target.result);
            const cultureImageId = await saveImageToIndexedDB(cultureImage);

            const attractionReader = new FileReader();
            attractionReader.onload = async function(attractionEvent) {
              const attractionImage = await compressImage(attractionEvent.target.result);
              const attractionImageId = await saveImageToIndexedDB(attractionImage);

              // Update slide data
              const updatedData = {
                id: editSlideData.id, // Maintain the same unique ID
                name, description, imageId,
                foodName, foodDescription, foodImageId,
                cultureName, cultureDescription, cultureImageId,
                attractionName, attractionDescription, attractionImageId
              };

              storedSlides[index] = { ...updatedData, index: storedSlides[index].index };
              localStorage.setItem("slides", JSON.stringify(storedSlides));
              localStorage.setItem(`threadAdd${storedSlides[index].index}`, JSON.stringify(updatedData));
              localStorage.removeItem("editSlide"); // Clear edit mode

              // Log updated localStorage state
              console.log("Stored slides after editing:", JSON.parse(localStorage.getItem("slides")));

              // Clear form data from localStorage
              localStorage.removeItem('name');
              localStorage.removeItem('description');
              localStorage.removeItem('foodName');
              localStorage.removeItem('foodDescription');
              localStorage.removeItem('cultureName');
              localStorage removeItem('cultureDescription');
              localStorage removeItem('attractionName');
              localStorage removeItem('attractionDescription');

              // Reset form
              document.getElementById('experienceForm').reset();

              // Redirect to the corresponding thread page
              window.location.href = `CRUD.html`;
            };

            if (attractionImageInput.files.length > 0) {
              attractionReader.readAsDataURL(attractionImageInput.files[0]);
            }
          };

          if (cultureImageInput.files.length > 0) {
            cultureReader.readAsDataURL(cultureImageInput.files[0]);
          }
        };

        if (foodImageInput.files.length > 0) {
          foodReader.readAsDataURL(foodImageInput.files[0]);
        }
      };

      if (imageInput.files.length > 0) {
        reader.readAsDataURL(imageInput.files[0]);
      }
    });

    // Function to save the form data to local storage
    function saveFormData() {
      const name = document.getElementById('name').value;
      const description = document.getElementById('description').value;
      const foodName = document.getElementById('foodName').value;
      const foodDescription = document.getElementById('foodDescription').value;
      const cultureName = document.getElementById('cultureName').value;
      const cultureDescription = document.getElementById('cultureDescription').value;
      const attractionName = document.getElementById('attractionName').value;
      const attractionDescription = document.getElementById('attractionDescription').value;

      localStorage.setItem('name', name);
      localStorage.setItem('description', description);
      localStorage.setItem('foodName', foodName);
      localStorage.setItem('foodDescription', foodDescription);
      localStorage.setItem('cultureName', cultureName);
      localStorage.setItem('cultureDescription', cultureDescription);
      localStorage.setItem('attractionName', attractionName);
      localStorage.setItem('attractionDescription', attractionDescription);
    }

    // Function to load the form data from local storage
    function loadFormData() {
      const name = localStorage.getItem('name');
      const description = localStorage.getItem('description');
      const foodName = localStorage.getItem('foodName');
      const foodDescription = localStorage.getItem('foodDescription');
      const cultureName = localStorage.getItem('cultureName');
      const cultureDescription = localStorage.getItem('cultureDescription');
      const attractionName = localStorage.getItem('attractionName');
      const attractionDescription = localStorage.getItem('attractionDescription');

      if (name) document.getElementById('name').value = name;
      if (description) document.getElementById('description').value = description;
      if (foodName) document.getElementById('foodName').value = foodName;
      if (foodDescription) document.getElementById('foodDescription').value = foodDescription;
      if (cultureName) document.getElementById('cultureName').value = cultureName;
      if (cultureDescription) document.getElementById('cultureDescription').value = cultureDescription;
      if (attractionName) document.getElementById('attractionName').value = attractionName;
      if (attractionDescription) document.getElementById('attractionDescription').value = attractionDescription;
    }

    // Save form data on input change
    document.getElementById('experienceForm').addEventListener('input', saveFormData);

    // Load form data on page load
    window.addEventListener('load', loadFormData);

        document.getElementById('viewExperience').addEventListener('click', () => {
      // Update Text Content
      updateTextContent('.header .section__subheader', 'name');
      updateTextContent('.header .section__header', 'description');

      updateTextContent('.about__content-1 .section__header', 'foodName');
      updateDescription('.about__content-1 p', 'foodDescription');

      updateTextContent('.about__content-2 .section__header', 'cultureName');
      updateDescription('.about__content-2 p', 'cultureDescription');

      updateTextContent('.about__content-3 .section__header', 'attractionName');
      updateDescription('.about__content-3 p', 'attractionDescription');
      
      // Update Images
      updateBackgroundImage(document.getElementById('image').files[0], '.header::before');
      updateImage(document.getElementById('foodImage').files[0], '.about__image-1 img');
      updateImage(document.getElementById('cultureImage').files[0], '.about__image-2 img');
      updateImage(document.getElementById('attractionImage').files[0], '.about__image-3 img');
    });

    function updateTextContent(selector, inputId) {
      const inputValue = document.getElementById(inputId).value;
      if (inputValue.trim() !== '') {
        document.querySelector(selector).innerText = inputValue;
      }
    }

    function updateDescription(selector, inputId) {
      const inputValue = document.getElementById(inputId).value;
      if (inputValue.trim() !== '') {
        document.querySelector(selector).innerHTML = splitDescription(inputValue);
      }
    }

    function splitDescription(description) {
      const words = description.split(' ');
      const firstPart = words.slice(0, 70).join(' ');
      const secondPart = words.slice(70).join(' ');
      return `${firstPart}<span class="read-more-text">${secondPart}</span>`;
    }

    function updateBackgroundImage(file, selector) {
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const styleTag = document.createElement('style');
          styleTag.innerHTML = `${selector} { background-image: radial-gradient(rgba(255, 255, 255, 0), var(--primary-color)), url("${e.target.result}"); }`;
          document.head.appendChild(styleTag);
        };
        reader.readAsDataURL(file);
      }
    }

    function updateImage(file, selector) {
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          document.querySelector(selector).src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }

    document.getElementById('resetExperience').addEventListener('click', () => {
      // Reset all input fields
      document.getElementById('experienceForm').reset();
      
      // Reset displayed values
      document.querySelector('.header .section__subheader').innerText = 'Province';
      document.querySelector('.header .section__header').innerText = 'Catchline';

      document.querySelector('.about__content-1 .section__header').innerText = 'Sample Food';
      document.querySelector('.about__content-1 p').innerHTML = 'Lorem ipsum <span class="read-more-text">Extra</span>';

      document.querySelector('.about__content-2 .section__header').innerText = 'Sample Festival';
      document.querySelector('.about__content-2 p').innerHTML = 'Lorem ipsum <span class="read-more-text">Extra</span>';

      document.querySelector('.about__content-3 .section__header').innerText = 'Sample Attraction';
      document.querySelector('.about__content-3 p').innerHTML = 'Lorem ipsum <span class="read-more-text">Extra</span>';

      // Reset images
      resetBackgroundImage('.header::before');
      resetImage('.about__image-1 img');
      resetImage('.about__image-2 img');
      resetImage('.about__image-3 img');
    });

    function resetBackgroundImage(selector) {
      const styleTag = document.createElement('style');
      styleTag.innerHTML = `${selector} { background-image: radial-gradient(rgba(255, 255, 255, 0), var(--primary-color)), url("mainimage.jpg"); }`;
      document.head.appendChild(styleTag);
    }

    function resetImage(selector) {
      document.querySelector(selector).src = 'sampleimage1.jpg';
    }

    // Open or create the database
    function openDatabase() {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open('imagesDatabase', 1);
        
        request.onupgradeneeded = function(event) {
          const db = event.target.result;
          db.createObjectStore('images', { keyPath: 'id', autoIncrement: true });
        };
        
        request.onsuccess = function(event) {
          resolve(event.target.result);
        };
        
        request.onerror = function(event) {
          reject(event.target.error);
        };
      });
    }

    // Save image to IndexedDB
    function saveImageToIndexedDB(imageData) {
      return openDatabase().then(db => {
        return new Promise((resolve, reject) => {
          const transaction = db.transaction(['images'], 'readwrite');
          const objectStore = transaction.objectStore('images');
          const request = objectStore.add({ image: imageData });
          
          request.onsuccess = function() {
            resolve(request.result);
          };
          
          request.onerror = function(event) {
            reject(event.target.error);
          };
        });
      });
    }

    // Retrieve image from IndexedDB
    function getImageFromIndexedDB(id) {
      return openDatabase().then(db => {
        return new Promise((resolve, reject) => {
          const transaction = db.transaction(['images'], 'readonly');
          const objectStore = transaction.objectStore('images');
          const request = objectStore.get(id);
          
          request.onsuccess = function(event) {
            resolve(event.target.result.image);
          };
          
          request.onerror = function(event) {
            reject(event.target.error);
          };
        });
      });
    }
  </script>
</body>
</html>

</body>
</html>

*/

