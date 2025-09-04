import express from 'express';
const router = express.Router();
import { MongoClient, ServerApiVersion } from 'mongodb';
import 'dotenv/config';
import Alumnos from '../models/alumnos.js';

// Variables de entorno
const MONGODB_URI = process.env.MONGODB_URI;
const client = new MongoClient(MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

router.get('/', async (req, res) => {
    try {
        const alumnos = await Alumnos.find({
            Estado: { $in: ['OK', 'No asistire'] }
        }).sort({ grupo: 1, nombre: 1 });

        const otros = await Alumnos.find({
            Estado: 'Quiero cambiar'
        });

        const resultadoFinal = [...alumnos, ...otros];

        res.json(resultadoFinal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const alumnoActualizado = await Alumnos.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!alumnoActualizado) {
            return res.status(404).json({ message: 'Alumno no encontrado' });
        }
        res.json(alumnoActualizado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/* router.post('/', async (req, res) => {
    try {
        const nuevoAlumno = new Alumnos(req.body);
        await nuevoAlumno.save();
        res.status(201).json(nuevoAlumno);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}); */

router.post('/', async (req, res) => {
    try {
        const nuevosAlumnos = req.body; 

        const result = await Alumnos.insertMany(nuevosAlumnos);
        
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;