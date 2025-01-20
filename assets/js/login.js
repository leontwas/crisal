document.getElementById('loginForm').addEventListener('submit', async (event) => { 
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const loginData = { username, password };

    try {
        const response = await fetch('/.netlify/functions/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert('Error: ' + (errorData.message || 'Error desconocido'));
            return;
        }

        const result = await response.json();

        // Evitar usar localStorage en producción; idealmente usar cookies con httpOnly
        localStorage.setItem('authToken', result.token);
        window.location.href = './administrador.html';
    } catch (error) {
        console.error('Error de conexión al servidor', error); // Log en consola para debugging
        alert('Error de conexión al servidor.');
    }
});

// Agregar funcionalidad al checkbox "Mostrar Contraseña"
document.getElementById('visible').addEventListener('change', (event) => {
    const passwordInput = document.getElementById('password');
    passwordInput.type = event.target.checked ? 'text' : 'password';
});
