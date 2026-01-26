import express from "express";
const dajariaRouter = express.Router();
import {stkpush, stkpushCallback} from "../controller/dajaria-controller.js";

// STK Push - Initiate payment request
dajariaRouter.post('/stkpush', stkpush);

// STK Push Callback - Receive payment confirmation from Safaricom
dajariaRouter.post('/callback', stkpushCallback);

export default dajariaRouter;