document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    const loginData = { username, password };

    try {
        const response = await fetch('http://192.168.1.100:3000/api/login', { // Cambia por tu IP local
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        if (response.ok) {
            const result = await response.json();
            localStorage.setItem('authToken', result.token);
            alert('Inicio de sesión exitoso');
            window.location.href = 'administrador.html';
        } else {
            const error = await response.json();
            alert(`Error: ${error.message}`);
        }
    } catch (error) {
        console.error('Error al intentar iniciar sesión:', error);
        alert('No se pudo conectar al servidor. Por favor, inténtalo más tarde.');
    }
});
