import express from 'express';
import { getMetaTags, getReports } from '../controller/meta-controller.js';

const router = express.Router();

router.get('/news/:id', getMetaTags);
router.get('/reports', getReports);

export default router;
