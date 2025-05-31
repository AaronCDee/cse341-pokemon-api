import express from 'express';

import { index, show, create, update, destroy } from '../controllers/trainers.mjs';
import { trainerValidationRules }               from '../validators/trainers.mjs';
import validate                                 from '../middleware/validate.mjs';
import { isAuthenticated }                      from '../middleware/authenticate.mjs';

const router = express.Router();

router.get('/', index);
router.get('/:id', show);
router.post('/', isAuthenticated, trainerValidationRules(), validate, create);
router.put('/:id', isAuthenticated, trainerValidationRules(), validate, update);
router.delete('/:id', isAuthenticated, destroy);

export default router;
