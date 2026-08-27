import 'dotenv/config';
import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'Minha API',
        descrition: 'Primeira simples API',
        },
        host: `localhost: ${process.env.SERVER_PORT}`,
        schemes: ['http']
};

const outputFile = './swagger-output.json';
const routs = ['./main.js'];

swaggerAutogen()(outputFile, routs, doc)