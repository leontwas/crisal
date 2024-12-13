document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            alert("Login exitoso");
            console.log("Token recibido:", data.token);
            // Puedes guardar el token en localStorage para futuras solicitudes
            localStorage.setItem("authToken", data.token);
        } else {
            const error = await response.json();
            alert("Error: " + error.message);
        }
    } catch (err) {
        console.error("Error al intentar iniciar sesión:", err);
        alert("Error de conexión al servidor.");
    }
});