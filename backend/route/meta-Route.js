import express from 'express';
import { getMetaTags, getReports, getContributeMetaTags } from '../controller/meta-controller.js';
import { dynamicRenderRedirect } from '../middleware/dynamicRender.js';

const router = express.Router();

// YouTube-style dynamic rendering: crawlers get meta HTML, users get redirect to frontend
router.use(dynamicRenderRedirect);

router.get('/news/:id', getMetaTags);
router.get('/contribute', getContributeMetaTags);
router.get('/reports', getReports);

export default router;
