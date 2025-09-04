import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app.js';

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;


mongoose.connect(MONGODB_URI)
    .then(()=>console.log("Conectado a la BD"))
    .catch((error)=>console.error("Error conectando a la base de datos: " + error));


    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });