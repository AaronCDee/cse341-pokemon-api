import { body } from "express-validator"

export const pokemonValidationRules = () => {
  return [
    body('name').notEmpty().withMessage("name is required!"),
    body('type').notEmpty().withMessage("type is required!"),
    body('weakness').notEmpty().withMessage("weakness is required!"),
    body('caughtAt').toDate().notEmpty().withMessage("caughtAt must be a date and is required!"),
    body('level').toInt().notEmpty().withMessage("level must be an integer and is required!"),
    body('trainer').notEmpty().withMessage("trainer is required!"),
    body('abilities').toArray().notEmpty().withMessage("abilities must be an array and is required!")
  ]
}
