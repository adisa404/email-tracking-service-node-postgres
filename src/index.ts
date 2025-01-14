import express, { Request, Response } from 'express';
import routes from './routes/tracking.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/tracking', routes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
