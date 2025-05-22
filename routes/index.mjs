import express from 'express';

import homeRoutes    from './home.mjs';
import pokemonRoutes from './pokemon.mjs';
import trainerRoutes from './trainers.mjs';

const router = express.Router();

router.use('/pokemon', pokemonRoutes);
router.use('/trainers', trainerRoutes);
router.use('/', homeRoutes);

export default router;
