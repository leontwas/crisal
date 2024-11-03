const express = require('express');
const path = require('path');
const app = express();

// Sirve archivos estáticos desde el directorio 'public'
app.use(express.static(path.join(__dirname, 'public')));

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
