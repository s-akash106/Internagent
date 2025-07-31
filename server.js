import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import jobRoutes from './routes/jobs.js';
import applicationRoutes from './routes/applications.js';
import searchRoutes from './routes/search.js';


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.use('/api/jobs', jobRoutes);

app.use('/api/applications', applicationRoutes);
app.use('/api/search', searchRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend on http://localhost:${PORT}`));