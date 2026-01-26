import express from "express";
const dajariaRouter = express.Router();
import {stkpush, stkpushCallback, checkPaymentStatus} from "../controller/dajaria-controller.js";

// STK Push - Initiate payment request
dajariaRouter.post('/stkpush', stkpush);

// STK Push Callback - Receive payment confirmation from Safaricom
dajariaRouter.post('/callback', stkpushCallback);

// Check payment status by CheckoutRequestID
dajariaRouter.get('/status/:checkoutRequestID', checkPaymentStatus);

export default dajariaRouter;