import express from "express";
const africastalkingRouter = express.Router();
import {phoneVerification} from "../controller/africastalking-controller.js";

//send sms to phone w/ verification code
africastalkingRouter.post("/phone-verify",phoneVerification);

export default africastalkingRouter;