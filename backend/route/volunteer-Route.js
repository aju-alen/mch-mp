import express from 'express';
const volunteerRouter = express.Router();
import { volunteerSubmitForm } from '../controller/volunteer-controller.js';

volunteerRouter.post('/submit', volunteerSubmitForm);

export default volunteerRouter;