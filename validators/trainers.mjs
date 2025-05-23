import { body } from "express-validator"

export const trainerValidationRules = () => {
  return [
    body('firstName').notEmpty().withMessage("firstName is required!"),
    body('lastName').optional(),
    body('age').toInt().notEmpty().withMessage("age is required!"),
    body('gender').notEmpty().withMessage("gender is required!"),
    body('region').notEmpty().withMessage("region is required!"),
  ]
}
