import dotenv from 'dotenv';
dotenv.config(); 

import fs from 'fs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import app from './app.js';

const PORT = process.env.PORT || 3000;

const swaggerFilePath = path.resolve('src/swagger-output.json');
if (fs.existsSync(swaggerFilePath)) {
  const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, 'utf8'));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})