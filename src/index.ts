import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import booksRouter from "./routes/books";
import reviewersRouter from "./routes/reviewers"
import connectDB from "./connection";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import cors from "cors";
import {  notFoundCatcher } from "./errorHandler";

dotenv.config();

connectDB();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use("/books", booksRouter);
app.use("/reviewers", reviewersRouter);
app.use(notFoundCatcher);

app.listen(port, () => {
  console.log("server is running");
});
