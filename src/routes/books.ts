import express, { Router, Request, Response } from "express";
import {
  addBook,
  getAllBooks,
  getOne,
  updateBook,
  deleteBook,
} from "../controllers/booksController";
import { userValidationRules } from "../validator";
import { validationResult } from "express-validator";

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  res.send(await getAllBooks());
});

router.get("/:id", async (req: Request, res: Response) => {
  res.send(await getOne(req.params.id));
});

router.post("/", userValidationRules(), async (req: Request, res: Response) => {
  /* #swagger.parameters['reqBody'] = {
      in: "body",
      description: "request body",
      type: "object",
      required: true
} */
  const errors = validationResult(req);
  if (!errors.isEmpty()) res.status(422).json({ errors: errors.array() });
  else res.status(201).send({ id: await addBook(req.body) });
});

router.put("/:id", async (req: Request, res: Response) => {
  /* #swagger.parameters['reqBody'] = {
      in: "body",
      description: "request body",
      type: "object",
      required: true
} */
  res.status(204).send(await updateBook(req.params.id, req.body));
});

router.delete("/:id", async (req: Request, res: Response) => {
  res.send(await deleteBook(req.params.id));
});

export default router;
