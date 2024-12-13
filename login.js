// login.js

const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        // Almacenar el token en el localStorage o sessionStorage
        localStorage.setItem('token', data.token);

        // Redirigir a la página administrador.html
        window.location.href = 'administrador.html';
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    })
    .catch((error) => {
      console.error('Error al intentar iniciar sesión:', error);
    });
});
