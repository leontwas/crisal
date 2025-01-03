// index.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express(); 

// Usuarios mockeados
const users = [
    {
        username: "yo",
        password: bcrypt.hashSync("yo", 10),
    },
    {
        username: "superAdmin",
        password: bcrypt.hashSync("superAdmin123", 10), 
    },
];

// Middleware
app.use(cors()); 
app.use(bodyParser.json()); 
app.use(express.static(path.join(__dirname, './'))); 

// Endpoint para login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Verificar si el usuario existe
    const user = users.find((u) => u.username === username);
    if (!user) {
        return res.status(401).json({ message: "Usuario no encontrado" });
    }

    // Validar contraseña
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Generar token
    const token = jwt.sign({ username: user.username }, "secreto-super-seguro", {
        expiresIn: "1h", 
    });

    // Respuesta con el token
    res.json({ token }); 
});

// Ruta principal
app.get('/', (req, res) => {
    res.redirect('http://crisal-seguridad.netlify.app/');
});

// Ruta para servir index.html
app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para servir administrador.html
app.get('/administrador', (req, res) => {
    res.sendFile(path.join(__dirname, 'administrador.html'));
});

// Configuración del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
