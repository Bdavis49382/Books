import express, { Router, Request, Response } from "express";
import {
  addBook,
  getAllBooks,
  getOne,
  updateBook,
  deleteBook,
} from "../controllers/booksController";
import { bookValidationRules, IDValidationRules, validate } from "../validator";

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    res.send(await getAllBooks());
  } catch (err) {
    res.status(500).json({
      message:
        err instanceof Error
          ? err.message
          : "Some error occurred while getting your books: " + String(err),
    });
  }
});

router.get(
  "/:id",
  IDValidationRules(),
  validate,
  async (req: Request, res: Response) => {
    try {
      const book = await getOne(req.params.id);
      if (book == null)
        res.status(404).json({ message: "no book by that id found." });
      else res.send(book);
    } catch (err) {
      res.status(500).json({
        message:
          err instanceof Error
            ? err.message
            : "Some error occurred while getting your book: " + String(err),
      });
    }
  }
);

router.post(
  "/",
  bookValidationRules(),
  validate,
  async (req: Request, res: Response) => {
    /* #swagger.parameters['reqBody'] = {
      in: "body",
      description: "request body",
      type: "object",
      required: true
} */
    try {
      res.status(201).send({ id: await addBook(req.body) });
    } catch (err) {
      res.status(500).json({
        message:
          err instanceof Error
            ? err.message
            : "Some error occurred while adding your book: " + String(err),
      });
    }
  }
);

router.put(
  "/:id",
  IDValidationRules(),
  bookValidationRules(),
  validate,
  async (req: Request, res: Response) => {
    /* #swagger.parameters['reqBody'] = {
      in: "body",
      description: "request body",
      type: "object",
      required: true
} */
    try {
      const book = await getOne(req.params.id);
      if (book == null)
        res.status(404).json({ message: "no book by that id found." });
      else res.status(204).send(await updateBook(req.params.id, req.body));
    } catch (err) {
      res.status(500).json({
        message:
          err instanceof Error
            ? err.message
            : "Some error occurred while updating your book: " + String(err),
      });
    }
  }
);

router.delete(
  "/:id",
  IDValidationRules(),
  validate,
  async (req: Request, res: Response) => {
    try {
      const book = await getOne(req.params.id);
      if (book == null)
        res.status(404).json({ message: "no book by that id found." });
      else res.send(await deleteBook(req.params.id));
    } catch (err) {
      res.status(500).json({
        message:
          err instanceof Error
            ? err.message
            : "Some error occurred while deleting this book:" + String(err),
      });
    }
  }
);

export default router;
