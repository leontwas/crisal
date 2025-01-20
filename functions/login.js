import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config(); // Cargar variables del archivo .env

const users = [
    { username: process.env.USER_CONSULTORA, password: process.env.HASHED_PASSWORD_CONSULTORA },
    { username: process.env.USER_SUPERADMIN, password: process.env.HASHED_PASSWORD_SUPERADMIN },
];

export async function handler(event) {
    try {
        const { username, password } = JSON.parse(event.body);

        // Verifica si el usuario existe
        const user = users.find((u) => u.username === username);
        if (!user) {
            return {
                statusCode: 401,
                body: JSON.stringify({ message: "Credenciales incorrectas" }),
            };
        }

        // Verifica la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password); // Usar compare async
        if (!isPasswordValid) {
            return {
                statusCode: 401,
                body: JSON.stringify({ message: "Credenciales incorrectas" }),
            };
        }

        // Genera el token JWT con un tiempo de expiración
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
            expiresIn: "1h", // El token expira en 1 hora
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ token }),
        };
    } catch (error) {
        console.error("Error al procesar la solicitud:", error); // Registra el error
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error interno del servidor" }),
        };
    }
}
