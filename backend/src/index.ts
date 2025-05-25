import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, "localhost", (err) => { /// Despues de ejecutar el servidor, valida si hay errores
  if (err) { /// Si hay errores, los imprime en la consola
    console.error(err);
    return; /// Termina la ejecución del programa
  }
  console.log("Server is running on http://localhost:3000"); /// Si no hay errores, imprime el mensaje de que el servidor está corriendo
})