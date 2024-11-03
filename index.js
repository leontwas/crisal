const express = require('express');
const app = express();

// Sirve archivos estáticos desde el directorio 'public'
app.use(express.static('public'));

// Redirigir a la URL de Netlify
app.get('/', (req, res) => {
  res.redirect('http://crisal-seguridad.netlify.app/');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor ejecutándose en http://localhost:${PORT}`));
