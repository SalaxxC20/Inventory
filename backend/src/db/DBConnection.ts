import { Pool } from "pg"
import dotenv from "dotenv"

dotenv.config() /// Carga las variables de entorno desde el archivo .env

const pool = new Pool({ /// Crea una nueva instancia de Pool
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
})

pool.connect() /// Conecta a la base de datos

export default pool; /// Exporta la instancia de Pool para que pueda ser utilizada en otros archivos