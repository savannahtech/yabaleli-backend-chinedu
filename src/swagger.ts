import { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express TypeScript API",
      version: "1.0.0",
      description: "API documentation for the Express TypeScript project",
    },
    servers: [
      {
        url: "http://localhost:3000", // Replace with your server URL
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Path to your route files
};

export default swaggerOptions;
