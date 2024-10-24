import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const userValidationRules = () => {
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

// export const validate = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): void | Response => {
//   const errors = validationResult(req);
//   if (errors.isEmpty()) {
//     return next();
//   }
//   const extractedErrors: Array<object> = errors.array().map((err) => {
//     return { [err.type]: err.msg };
//   });

//   return res.status(422).json({
//     errors: extractedErrors,
//   });
// };
