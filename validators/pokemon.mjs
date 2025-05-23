import { body } from "express-validator"

export const pokemonValidationRules = () => {
  return [
    body('name').notEmpty().withMessage("name is required!"),
    body('type').notEmpty().withMessage("type is required!"),
    body('weakness').notEmpty().withMessage("weakness is required!"),
    body('caughtAt').toDate().notEmpty().withMessage("caughtAt is required!"),
  ]
}
