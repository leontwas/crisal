/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",                     // Archivos HTML en la raíz del proyecto
    "./**/*.html",                  // Archivos HTML en subcarpetas
    "./assets/js/**/*.js",          // Archivos JavaScript en la carpeta js
    "./components/**/*.{js,ts,jsx,tsx}", // Otros archivos con clases de Tailwind (React/Vue/TS)
  ],
  prefix: 'tw-', // Prefijo opcional para evitar conflictos de clases
  theme: {
    extend: {
      // Puedes agregar extensiones personalizadas aquí
    },
  },
  plugins: [],
}
