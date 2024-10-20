import swaggerAutogen from 'swagger-autogen';
const doc = {
  info: {
    title: 'ASTU Football Cup API',
    description: 'ASTU Football Cup is designed for managing football clubs, match schedules, and real-time match updates during the university football cup.\n The platform is built to provide administrators with the ability to manage clubs, players, matches, and reports while allowing secure access to different user roles.'
  },
  host: 'astu-football-cup-api.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger-output.json';
const routes = ["../../index.js"];
 
swaggerAutogen(outputFile, routes, doc); 