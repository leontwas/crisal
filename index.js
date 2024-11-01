const express = require('express'); 
const path = require('path');
const app = express();

// Redirigir a la URL externa de Netlify
app.get('/', (req, res) => {
  res.redirect('https://crisal-seguridad.netlify.app/');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor ejecutándose en http://localhost:${PORT}`));
