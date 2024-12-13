document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const loginData = { username, password };

    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        const result = await response.json();

        if (response.ok) {
            // Almacenar el token en el almacenamiento local
            localStorage.setItem('authToken', result.token);
            // Redirigir a la página administrador.html
            window.location.href = 'administrador.html';
        } else {
            console.error('Error al intentar iniciar sesión:', result.message);
            alert('Error: ' + result.message);
        }
    } catch (error) {
        console.error('Error al intentar iniciar sesión:', error);
        alert('Error de conexión');
    }
});
