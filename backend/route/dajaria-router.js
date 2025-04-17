import express from "express";
const dajariaRouter = express.Router();
import {stkpush} from "../controller/dajaria-controller.js";

//send sms to phone w/ verification code
dajariaRouter.post('/stkpush', stkpush);

export default dajariaRouter;