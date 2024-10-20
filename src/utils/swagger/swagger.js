import swaggerAutogen from 'swagger-autogen';
const doc = {
  info: {
    title: 'ASTU Football Cup API',
    description: 'Description'
  },
  host: 'https://astu-football-cup-api.onrender.com'
};

const outputFile = './swagger-output.json';
const routes = ["../../index.js"];

swaggerAutogen(outputFile, routes, doc);