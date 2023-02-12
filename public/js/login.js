const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
  
    if (!username || !password) {
      alert('Please enter a valid username and password.');
      return;
    }
  
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in. Make sure your username and password are correct.');
    }
  };
  
  const registerFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#registerUsername').value.trim();
    const password = document.querySelector('#registerPassword').value.trim();
    const rePassword = document.querySelector('#retypePassword').value.trim();
  
    if (!username || !password || !rePassword) {
      alert('Please enter a valid username and password.');
      return;
    }
  
    if (password !== rePassword) {
      alert('Passwords must match.');
      return;
    }
  
    const response = await fetch('/api/users/', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to register. Please try again.');
    }
  };
  
  let loginForm = document.querySelector('#loginForm');
  let registerForm = document.querySelector('#registerForm');
  
  function showRegister() {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
  }
  
  function showLogin() {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
  }
  
  document.querySelector('.loginToggleBtn').addEventListener('click', showLogin);
  document.querySelector('.regToggleBtn').addEventListener('click', showRegister);
  
  loginForm.addEventListener('submit', loginFormHandler);
  registerForm.addEventListener('submit', registerFormHandler);
  