import bcrypt from "bcryptjs";

const password = "Matilda.2017"; // Reemplázalo con tu contraseña real
const hashedPassword = bcrypt.hashSync(password, 10);
console.log(hashedPassword);