import dotenv from 'dotenv';
dotenv.config();
import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Suplaihub API',
    description: 'Dokumentasi API Suplaihub B2B Platform',
    version: '1.0.0',
  },
  host: 'localhost:3000',
  schemes: ['http'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
      description: 'Masukkan token JWT dengan format: Bearer <TOKEN>',
    },
  },
  security: [{ bearerAuth: [] }],
};

const outputFile = './src/swagger-output.json';
const endpointsFiles = ['./src/app.ts'];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);