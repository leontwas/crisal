document.addEventListener("DOMContentLoaded", () => {
    const submitBtn = document.querySelector(".submit-btn");
    const usernameInput = document.querySelector(".input-box input[type='text']");
    const passwordInput = document.querySelector(".input-box input[type='password']");

    const API_URL = "https://tu-servidor.com/api/login"; // Asegúrate de que esta URL sea la correcta

    submitBtn.addEventListener("click", async (e) => {
        e.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        if (!username || !password) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        try {
            submitBtn.disabled = true; // Desactiva el botón mientras la solicitud está en proceso

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            submitBtn.disabled = false; // Reactiva el botón cuando la respuesta esté lista

            if (response.ok) {
                const data = await response.json();
                // Usar cookies httpOnly para almacenar el token sería más seguro
                localStorage.setItem("authToken", data.token);
                alert("Login exitoso");
                window.location.href = "/admin-dashboard.html"; 
            } else {
                const error = await response.json();
                alert(`Error: ${error.message}`);
            }
        } catch (error) {
            console.error("Error en la autenticación:", error);
            alert("Ocurrió un error. Inténtalo de nuevo.");
        }
    });
});
