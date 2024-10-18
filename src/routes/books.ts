import express, { Router, Request, Response } from 'express'
import { addBook, getAllBooks, getOne } from '../controllers/booksController';

const router : Router = express.Router();

router.get("/", async (req : Request, res : Response) => {
    res.send(await getAllBooks());
});

router.get("/:id", async (req : Request, res : Response) => {
    res.send(await getOne(req.params.id));
});

router.post("/", async (req : Request, res : Response) => {
  /* #swagger.parameters['reqBody'] = {
      in: "body",
      description: "request body",
      type: "object",
      required: true
} */
    res.status(201).send({id : await addBook(req.body)});
});

export default router;