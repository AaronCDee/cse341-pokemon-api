import express from 'express';

import { index, show, create, update, destroy } from '../controllers/trainers.mjs';
import { trainerValidationRules }               from '../validators/trainers.mjs';
import validate                                 from '../middleware/validate.mjs';

const router = express.Router();

router.get('/', index);
router.get('/:id', show);
router.post('/', trainerValidationRules(), validate, create);
router.put('/:id',trainerValidationRules(), validate, update);
router.delete('/:id', destroy);

export default router;
