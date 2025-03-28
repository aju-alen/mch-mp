import express from 'express';
const volunteerRouter = express.Router();
import { volunteerSubmitForm,volunteerGetPdf } from '../controller/volunteer-controller.js';

volunteerRouter.post('/submit', volunteerSubmitForm);
volunteerRouter.post('/pdf', volunteerGetPdf);

export default volunteerRouter;