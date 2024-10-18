import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import booksRouter from './routes/books';
import connectDB from './connection';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import cors from 'cors';

dotenv.config();

connectDB();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.get("/", (req : Request, res : Response) => {
    res.send("Express");
});

app.use(express.json());
app.use("/books", booksRouter);

app.listen(port, () => {
    console.log('server is running');
});