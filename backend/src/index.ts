import express, { type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({message: 'Berhasil'});
});

app.listen('port', () => {
    console.log(`Server berjalan di ${PORT}`);
});

export default app;
