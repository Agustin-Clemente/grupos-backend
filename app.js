import express from 'express';
 import cors from 'cors';
 import alumnosRouter from './routes/aumnos.js';
 import 'dotenv/config';

const app = express();


app.use(cors());
app.use(express.json());

app.use('/grupos', alumnosRouter);

export default app;

