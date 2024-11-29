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
