import express from 'express';
import { getMetaTags, getReports, getContributeMetaTags } from '../controller/meta-controller.js';

const router = express.Router();

router.get('/news/:id', getMetaTags);
router.get('/contribute', getContributeMetaTags);
router.get('/reports', getReports);

export default router;