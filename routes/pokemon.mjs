import express from 'express';

import { index, show, create, update, destroy } from '../controllers/pokemon.mjs';
import { pokemonValidationRules }               from '../validators/pokemon.mjs';
import validate                                 from '../middleware/validate.mjs';
import { isAuthenticated }                      from '../middleware/authenticate.mjs';

const router = express.Router();

router.get('/', index);
router.get('/:id', show);
router.post('/', isAuthenticated, pokemonValidationRules(), validate, create);
router.put('/:id', isAuthenticated, pokemonValidationRules(), validate, update);
router.delete('/:id', isAuthenticated, destroy);

export default router;
