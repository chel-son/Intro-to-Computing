document.addEventListener('DOMContentLoaded', () => {
  const defaultUsers = [
    { username: "Chelson Laud", email: "chelsonlaud@gmail.com", password: "hello12345", userType: "admin" }
  ];

  const users = JSON.parse(localStorage.getItem('users')) || defaultUsers;

  function login() {
    const usernameOrEmail = document.querySelector('#login input[type="text"]').value.trim().toLowerCase();
    const password = document.querySelector('#login input[type="password"]').value.trim();
    const userType = document.querySelector('#login input[list="user"]').value.trim().toLowerCase();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => (u.username.toLowerCase() === usernameOrEmail || u.email.toLowerCase() === usernameOrEmail) && u.password === password);

    if (user) {
        if (user.userType.toLowerCase() !== userType) {
            if (user.userType.toLowerCase() === 'admin' && userType === 'regular') {
                alert("You are now eligible for Admin. Please change the User Type.");
            } else if (user.userType.toLowerCase() === 'regular' && userType === 'admin') {
                alert("You are not eligible for Admin. Please change the User Type to Regular.");
            }
        } else {
            alert("Login successful");
            localStorage.setItem('loggedInUser', user.username);
            window.location.href = "homepage.html";
        }
    } else {
        alert("Invalid login details");
    }
  }

  function register() {
    const firstName = document.querySelector('#register .input-field[placeholder="Firstname"]').value.trim();
    const lastName = document.querySelector('#register .input-field[placeholder="Lastname"]').value.trim();
    const email = document.querySelector('#register .input-field[placeholder="Email"]').value.trim();
    const password = document.querySelector('#register .input-field[placeholder="Password"]').value.trim();
    
    const newUsername = `${firstName} ${lastName}`;
    const newUser = { username: newUsername, email, password, userType: "regular" };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert("Registration successful. You can now login.");
  }

  function updateNavbar(username) {
    const profileLinks = document.querySelectorAll('nav .home-link, .dropdown-menu h3');
    profileLinks.forEach(link => link.textContent = username);
  }

  function guestLogin() {
    localStorage.setItem('loggedInUser', 'Guest');
    window.location.href = "homepage.html";
  }

  document.querySelector('#login .submit').addEventListener('click', login);
  document.querySelector('#register .submit').addEventListener('click', register);
  document.querySelector('#guestLoginBtn').addEventListener('click', guestLogin);

  function myMenuFunction() {
    var i = document.getElementById("navMenu");
    if(i.className === "nav-menu") {
        i.className += " responsive";
    } else {
        i.className = "nav-menu";
    }
  }

  var a = document.getElementById("loginBtn");
  var b = document.getElementById("registerBtn");
  var x = document.getElementById("login");
  var y = document.getElementById("register");

  function loginTransition() {
    x.style.left = "4px";
    y.style.right = "-520px";
    a.className += " white-btn";
    b.className = "btn";
    x.style.opacity = 1;
    y.style.opacity = 0;
  }

  function registerTransition() {
    x.style.left = "-510px";
    y.style.right = "5px";
    a.className = "btn";
    b.className += " white-btn";
    x.style.opacity = 0;
    y.style.opacity = 1;
  }

  a.addEventListener('click', loginTransition);
  b.addEventListener('click', registerTransition);

  document.getElementById("registerLink").addEventListener('click', (event) => { 
    event.preventDefault(); 
    registerTransition(); 
  }); 
  
  document.getElementById("loginLink").addEventListener('click', (event) => { 
    event.preventDefault(); 
    loginTransition(); 
  });

  function resetStoredData() {
    localStorage.removeItem('users');
    alert("Stored data has been reset.");
  }

  document.querySelector('#login .two a').addEventListener('click', resetStoredData);
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
