import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import booksRouter from './routes/books';
import connectDB from './connection';

dotenv.config();

connectDB();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req : Request, res : Response) => {
    res.send("Express");
});

app.use(express.json());
app.use("/books", booksRouter);

app.listen(port, () => {
    console.log('server is running');
});