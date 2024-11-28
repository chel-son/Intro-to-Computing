document.addEventListener('DOMContentLoaded', () => {
  // Define the list of users and retrieve stored users
  const defaultUsers = [
    { username: "Cheson Laud", email: "chesonlaud@gmail.com", password: "hello12345", userType: "admin" }
  ];

  const users = JSON.parse(localStorage.getItem('users')) || defaultUsers;

  // Function to handle user login
  function login() {
    const usernameOrEmail = document.querySelector('#login input[type="text"]').value.trim().toLowerCase();
    const password = document.querySelector('#login input[type="password"]').value.trim();
    const userType = document.querySelector('#login input[list="user"]').value.trim().toLowerCase();

    console.log('Entered Username/Email:', usernameOrEmail);
    console.log('Entered Password:', password);
    console.log('Entered User Type:', userType);

    const user = users.find(u => (u.username.toLowerCase() === usernameOrEmail || u.email === usernameOrEmail) && u.password === password && u.userType.toLowerCase() === userType);

    if (user) {
      alert("Login successful");
      localStorage.setItem('loggedInUser', user.username); // Store username in localStorage
      window.location.href = "Homepage.html"; // Redirect to debug.html on successful login
    } else {
      alert("Invalid login details");
    }
  }

  // Function to handle user registration
  function register() {
    const firstName = document.querySelector('#register .input-field[placeholder="Firstname"]').value.trim();
    const lastName = document.querySelector('#register .input-field[placeholder="Lastname"]').value.trim();
    const email = document.querySelector('#register .input-field[placeholder="Email"]').value.trim();
    const password = document.querySelector('#register .input-field[placeholder="Password"]').value.trim();
    
    const newUsername = `${firstName} ${lastName}`;
    const newUser = { username: newUsername, email, password, userType: "regular" };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users)); // Save the updated users list to localStorage
    alert("Registration successful. You can now login.");
  }

  // Function to update navbar with username
  function updateNavbar(username) {
    const profileLinks = document.querySelectorAll('nav .home-link, .dropdown-menu h3');
    profileLinks.forEach(link => link.textContent = username);
  }

  // Function to handle guest login
  function guestLogin() {
    localStorage.setItem('loggedInUser', 'Guest');
    window.location.href = "Homepage.html"; // Redirect to debug.html for guest user
  }

  // Bind the functions to the respective buttons
  document.querySelector('#login .submit').addEventListener('click', login);
  document.querySelector('#register .submit').addEventListener('click', register);
  document.querySelector('#guestLoginBtn').addEventListener('click', guestLogin); // Add event listener for guest login

  // Other functions
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
  
    // Ensure transition functions are attached to buttons
    a.addEventListener('click', loginTransition);
    b.addEventListener('click', registerTransition);
  
    // Function to reset stored user data
    function resetStoredData() {
      localStorage.removeItem('users');
      alert("Stored data has been reset.");
    }
  
    // Bind reset function to "Reset" link
    document.querySelector('#login .two a').addEventListener('click', resetStoredData);
  });
  