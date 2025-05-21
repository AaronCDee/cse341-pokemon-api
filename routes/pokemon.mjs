import express from 'express';

import { index, show, create, update, destroy } from '../controllers/pokemon.mjs';
import { pokemonValidationRules }               from '../validators/pokemon.mjs';
import validate                                 from '../utils/validate.mjs';

const router = express.Router();

router.get('/', index);
router.get('/:id', show);
router.post('/', pokemonValidationRules(), validate, create);
router.put('/:id', update);
router.delete('/:id', destroy);

export default router;
