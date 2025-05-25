import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/api/login', (req, res) => {
  const { name, password } = req.body; /// Desestructura el objeto req.body para obtener los valores de name y password
  const defaultUser = {
    name: 'admin', /// Nombre de usuario por defecto
    password: 'admin', /// Contraseña por defecto
  }
  const users = [defaultUser]
  const exist = users.find((user) => user.name === name)
  if (!exist) {
    res.status(401).json({ message: 'Usuario no encontrado', result: false }); /// Si el usuario no existe, devuelve un mensaje de error
  }
  if (password === defaultUser.password) { /// Valida si el nombre de usuario y la contraseña son correctos
    res.status(200).json({ message: 'Login correcto', result: true }); /// Si son correctos, devuelve un mensaje de éxito
  } else {
    res.status(401).json({ message: 'Usuario o contraseña invalido', result: false }); /// Si no son correctos, devuelve un mensaje de error
  }
})


app.listen(8000, "localhost", (err) => { /// Despues de ejecutar el servidor, valida si hay errores
  if (err) { /// Si hay errores, los imprime en la consola
    console.error(err);
    return; /// Termina la ejecución del programa
  }
  console.log("Server is running on http://localhost:8000"); /// Si no hay errores, imprime el mensaje de que el servidor está corriendo
})