console.clear()
import  express  from "express";
import appExpress from "./routes/usuarios.js";
import dotenv from 'dotenv'
import connectDB from "./database/config.js";
import appAuthToken from "./routes/login.js";

dotenv.config()

const app = express()

app.use(express.static('./public'))

app.use(appExpress)
app.use(appAuthToken)


connectDB()

app.listen(process.env.PORT, () => console.log('Escuchando en el puerto', process.env.PORT))




