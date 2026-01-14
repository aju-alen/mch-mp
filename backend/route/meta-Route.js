import express from 'express';
import { getMetaTags } from '../controller/meta-controller.js';

const router = express.Router();

router.get('/news/:id', getMetaTags);

export default router;
