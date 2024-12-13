const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

// Simulación de base de datos
const users = [
    {
        username: "admin",
        password: bcrypt.hashSync("admin123", 10), // Contraseña hasheada
    },
    {
        username: "superadmin", // Usuario para administrador
        password: bcrypt.hashSync("miContrasenaSegura123", 10), // Contraseña hasheada para administrador
    },
];

// Middleware para parsear JSON
app.use(bodyParser.json());

// Sirve archivos estáticos desde el directorio 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para autenticación
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Buscar al usuario en la "base de datos"
    const user = users.find((u) => u.username === username);
    if (!user) {
        return res.status(401).json({ message: "Usuario no encontrado" });
    }

    // Validar contraseña
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Generar JWT
    const token = jwt.sign({ username: user.username }, "secreto-super-seguro", {
        expiresIn: "1h", // Token válido por 1 hora
    });

    res.json({ token });
});

// Redirigir a la URL de Netlify
app.get('/', (req, res) => {
    res.redirect('http://crisal-seguridad.netlify.app/');
});

// Ruta para servir el index.html desde la raíz
app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});