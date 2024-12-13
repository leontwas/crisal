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