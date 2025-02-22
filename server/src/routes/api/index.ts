import { Router } from 'express';
import { rawgRouter } from './RAWG.js';


const router = Router();

router.use('/RAWG', rawgRouter);

export default router;
