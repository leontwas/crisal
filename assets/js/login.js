document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const loginData = { username, password };

    try {
        const response = await fetch('http://localhost:3000/api/login', { // Cambia localhost si tu servidor está en otro dominio
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        if (!response.ok) {
            let errorMessage = 'Error desconocido';
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
            } catch (e) {
                console.error('No se pudo parsear el error:', e);
            }
            console.error('Error en la autenticación:', errorMessage);
            alert('Error: ' + errorMessage);
            return;
        }

        // Procesa la respuesta exitosa
        const result = await response.json();
        localStorage.setItem('authToken', result.token);
        window.location.href = 'https://crisal-seguridad.netlify.app/administrador';
    } catch (error) {
        console.error('Error al intentar iniciar sesión:', error);
        alert('Error de conexión al servidor.');
    }
});
