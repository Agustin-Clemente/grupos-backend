import mongoose from 'mongoose';

const alumnosSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    grupo: { type: Number, required: true },
    dni: { type: String, required: true },
    estado: { type: String, required: true }
});

export default mongoose.model('Alumnos', alumnosSchema);