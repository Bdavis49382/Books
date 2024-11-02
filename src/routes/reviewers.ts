import express, { Router, Request, Response } from "express";
import {
  addReviewer,
  getAllReviewers,
  getOne,
  updateReviewer,
  deleteReviewer,
} from "../controllers/reviewerController";
import { reviewerValidationRules, IDValidationRules, validate } from "../validator";

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    res.send(await getAllReviewers());
  } catch (err) {
    res.status(500).json({
      message:
        err instanceof Error
          ? err.message
          : "Some error occurred while getting your reviewers: " + String(err),
    });
  }
});

router.get(
  "/:id",
  IDValidationRules(),
  validate,
  async (req: Request, res: Response) => {
    try {
      const reviewer = await getOne(req.params.id);
      if (reviewer == null)
        res.status(404).json({ message: "no reviewer by that id found." });
      else res.send(reviewer);
    } catch (err) {
      res.status(500).json({
        message:
          err instanceof Error
            ? err.message
            : "Some error occurred while getting your reviewer: " + String(err),
      });
    }
  }
);

router.post(
  "/",
  reviewerValidationRules(),
  validate,
  async (req: Request, res: Response) => {
    /* #swagger.parameters['reqBody'] = {
      in: "body",
      description: "request body",
      type: "object",
      required: true
} */
    try {
      res.status(201).send({ id: await addReviewer(req.body) });
    } catch (err) {
      res.status(500).json({
        message:
          err instanceof Error
            ? err.message
            : "Some error occurred while adding your reviewer: " + String(err),
      });
    }
  }
);

router.put(
  "/:id",
  IDValidationRules(),
  reviewerValidationRules(),
  validate,
  async (req: Request, res: Response) => {
    /* #swagger.parameters['reqBody'] = {
      in: "body",
      description: "request body",
      type: "object",
      required: true
} */
    try {
      const reviewer = await getOne(req.params.id);
      if (reviewer == null)
        res.status(404).json({ message: "no reviewer by that id found." });
      else res.status(204).send(await updateReviewer(req.params.id, req.body));
    } catch (err) {
      res.status(500).json({
        message:
          err instanceof Error
            ? err.message
            : "Some error occurred while updating your reviewer: " + String(err),
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
      const reviewer = await getOne(req.params.id);
      if (reviewer == null)
        res.status(404).json({ message: "no reviewer by that id found." });
      else res.send(await deleteReviewer(req.params.id));
    } catch (err) {
      res.status(500).json({
        message:
          err instanceof Error
            ? err.message
            : "Some error occurred while deleting this reviewer:" + String(err),
      });
    }
  }
);

export default router;