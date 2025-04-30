import express from 'express';
import cors from 'cors';

import autorRoutes from './routes/autorRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/autores', autorRoutes); 

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});

