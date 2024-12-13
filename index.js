import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Obtener el directorio actual en un módulo ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Simulación de base de datos
const users = [
    {
        username: "yo",
        password: bcrypt.hashSync("yo", 10), // Contraseña hasheada
    },
    {
        username: "superadmin", // Usuario para administrador
        password: bcrypt.hashSync("miContrasenaSegura123", 10), // Contraseña hasheada para administrador
    },
];

// Middleware para parsear JSON
app.use(bodyParser.json());

// Sirve archivos estáticos desde el directorio '/'
app.use(express.static(path.join(__dirname, '/')));

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
