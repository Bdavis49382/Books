import { body, param, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const bookValidationRules = () => {
  return [
    body("rating")
      .isInt({ min: 1, max: 10 })
      .withMessage("Rating must be between 1 and 10"),
    body("review")
      .isLength({ min: 20 })
      .withMessage(
        "Your review isn't long enough! Try adding some more detail."
      ),
  ];
};

export const reviewerValidationRules = () => {
  return [
    body("firstName")
      .isLength({min: 2}),
    body("lastName")
      .isLength({min: 2})
  ]
}

export const IDValidationRules = () => {
  return [
    param("id")
      .matches(/^[a-zA-Z0-9]{24}$/)
      .withMessage("Your id was not a valid MongoDB ID"),
  ]
}

export const validate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const extractedErrors: Array<object> = errors.array().map((err) => {
      return { [err.type]: err.msg };
    });

    res.status(422).json({
      errors: extractedErrors,
    });
  }
};
