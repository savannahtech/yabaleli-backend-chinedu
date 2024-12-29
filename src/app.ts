import express, { Express } from 'express';
import 'reflect-metadata';
import cors from 'cors';
import routes from './routes';
import { connectDB } from './config/database';
import Logger from './shared/logger';
import { requestErrorHandler } from './shared/utils/errors';
import swaggerOptions from './swagger';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const app: Express = express();

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json(), cors());
app.use(express.urlencoded({ extended: true }));
connectDB();
routes(app);
app.use(requestErrorHandler);

Logger();

export default app;
