document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const loginData = { username, password };

    try {
        const response = await fetch('http://192.168.x.x:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Error en la autenticación:', error.message);
            alert('Error: ' + error.message);
            return;
        }

        const result = await response.json();
        localStorage.setItem('authToken', result.token);
        window.location.href = 'administrador.html';
    } catch (error) {
        console.error('Error al intentar iniciar sesión:', error);
        alert('Error de conexión al servidor.');
    }
});

